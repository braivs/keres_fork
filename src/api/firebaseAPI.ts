import {auth, db} from 'src/firebase'
import {ImgUploadModeType, MessageModeType, MessageType, StringNullType, UserType} from 'src/common/types'
import {v1} from 'uuid'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User
} from 'firebase/auth'
import {
    collection,
    deleteField,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore'
import {getDatabase, onDisconnect, onValue, ref, serverTimestamp as serverTimestampRT, set} from "firebase/database"
import {getDownloadURL, getStorage, listAll, ref as sRef, uploadString} from "firebase/storage"
import {AppDispatchType} from 'src/redux/store'
import {setUsers, setUsersStatus} from "src/redux/userSlice"
import React from "react"

export const firebaseAPI = {
    getUserById: async (userId: string | null) => {
        if (userId !== null) {
            const docRef = doc(db, 'users', userId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                return docSnap.data() as UserType
            } else {
                return null
            }
        } else return null
    },
    createUser: async (userId: string, userEmail: string, name: string) => {
        await setDoc(doc(db, 'users', userId), {
            id: userId,
            email: userEmail,
            name: name.toLowerCase(),
            isOnline: true
        })
    },
    getUserByName: async (userName: string) => {
        let result: Array<UserType> = []
        const q = query(collection(db, 'users'), where('name', '==', userName))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            result.push(doc.data() as UserType)
        })
        return result
    },
    // this is using to get: Authentication User -> Firestore User
    getUserByEmail: async (userEmail: string) => {
        let users: Array<UserType> = []
        if (userEmail !== '') {
            const q = query(collection(db, 'users'), where('email', '==', userEmail))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as UserType)
            })
            if (users.length > 1) {
                console.error('duplicates user mails base problem!')
            }
        } else {
            console.error('userEmail !== \'\'')
        }
        return users[0]
    },
    isNameUnique: async (name: string) => { // check is userName name unique unique in users collection
        const q = query(collection(db, 'users'), where('name', '==', name.toLowerCase()))
        const querySnapshot = await getDocs(q)
        let users: Array<UserType> = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as UserType)
        })
        return users.length === 0
    },
    getRequestOrUnreadStatus: async (userId: string, friendshipID: string, collection: 'friendship' | 'unread'): Promise<boolean | null> => {
        let status = null
        const docRef = doc(db, collection, friendshipID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            status = docSnap.data()[userId]
        }
        return status
    },
    changeMessagesUnreadStatus: async (friendshipId: string, userId: string, newStatus: boolean) => {
        await setDoc(doc(db, 'unread', friendshipId), {
            [userId]: newStatus
        }, {merge: true})
    },
    sendMessage: async (messageBody: MessageBodyType, chatId: string, mode: MessageModeType, imgUrl: string | null) => {
        const newMessageId = v1()
        const data: MessageType = {
            id: newMessageId,
            text: messageBody.text,
            to: messageBody.to,
            from: messageBody.from,
            createdAt: serverTimestamp(),
            mode,
            filename: imgUrl
        }
        await setDoc(doc(db, 'messages', chatId, 'chat', newMessageId), data)
    },
    googleLoginPopup: async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    },
    updateActiveUserStatus: async (status: 'online' | 'offline') => {
        if (auth.currentUser) {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                state: status,
            })
        } else {
            console.error('updateActiveUserStatus: no auth.currentUser')
        }
    },
    logout: async () => {
        await signOut(auth)
    },
    login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    register: async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    },
    presenceObserver: async () => {
        // Fetch the current user's ID from Firebase Authentication.
        const uid = getAuth().currentUser?.uid

        if (uid) {
            const database = getDatabase()

            // Create a reference to this user's specific status node.
            // This is where we will store data about being online/offline.
            const userStatusDatabaseRef = ref(database, 'status/' + uid)
            // ...
            const userStatusFirestoreRef = doc(db, 'status', uid)

            // We'll create two constants which we will write to
            // the Realtime database when this device is offline
            // or online.
            const isOfflineForDatabase = {
                state: 'offline',
                last_changed: serverTimestampRT(),
            }

            const isOnlineForDatabase = {
                state: 'online',
                last_changed: serverTimestampRT(),
            }

            // Firestore uses a different server timestamp value, so we'll
            // create two more constants for Firestore state.
            const isOfflineForFirestore = {
                state: 'offline',
                last_changed: serverTimestamp(),
            }

            const isOnlineForFirestore = {
                state: 'online',
                last_changed: serverTimestamp(),
            }

            // Create a reference to the special '.info/connected' path in
            // Realtime Database. This path returns `true` when connected
            // and `false`
            onValue(ref(database, '.info/connected'), async (snapshot) => {
                if (snapshot.val() === false) {
                    // Instead of simply returning, we'll also set Firestore's state
                    // to 'offline'. This ensures that our Firestore cache is aware
                    // of the switch to 'offline.'
                    await setDoc(userStatusFirestoreRef, isOfflineForFirestore)
                    return
                }

                // If we are currently connected, then use the 'onDisconnect()'
                // method to add a set which will only trigger once this
                // client has disconnected by closing the app,
                // losing internet, or any other means.
                onDisconnect(userStatusDatabaseRef)
                    .set(isOfflineForDatabase)
                    .then(async function () {
                        await setDoc(userStatusFirestoreRef, isOfflineForFirestore)
                    })
                    .then(async function () {
                            // The promise returned from .onDisconnect().set() will
                            // resolve as soon as the server acknowledges the onDisconnect()
                            // request, NOT once we've actually disconnected:
                            // https://firebase.google.com/docs/reference/js/database.ondisconnect
                            // https://firebase.google.com/docs/database/web/offline-capabilities

                            // We can now safely set ourselves as 'online' knowing that the
                            // server will mark us as offline once we lose connection.
                            await set(ref(database, 'status/' + uid), isOnlineForDatabase)

                            // We'll also add Firestore set here for when we come online.
                            await setDoc(userStatusFirestoreRef, isOnlineForFirestore)
                        }
                    )
            })

        } else {
            console.error('presenceObserver: no uid')
        }
    },
    sendVerificationEmail: async (activeUser: User): Promise<SendVerificationEmailReturnType> => {
        const actionCodeSettings = {
            // After email is verified, the user will be give the ability to go back
            // to the sign-in page.
            url: 'https://dev-keresverse.netlify.app/#/friends', /*todo: need to change this to https://dev-keresverse.netlify.app/#/friends before Netlify deploy and http://localhost:3000/#/friends for local work*/
            handleCodeInApp: false
        }
        try {
            await sendEmailVerification(activeUser, actionCodeSettings)
            return {
                result: true,
                text: 'Email send. Please click on link in you mail.'
            }
        } catch (e: any) {
            return {
                result: false,
                text: e.code
            }
        }
    },
    uploadFile2Firestore: async (cropImg: string, mode: ImgUploadModeType,
                                 chatId: string | null = null, fileNameWithoutExtension: StringNullType = null,
                                 v4uuid: StringNullType = null):
        Promise<UploadFile2FirestoreReturnType> => {
        const storage = getStorage()

        // == exceptions ==:
        if (!auth.currentUser) {
            console.error('firebaseAPI.uploadFile2Firestore !auth.currentUser')
            return {
                result: false,
                message: 'no currentUser'
            }
        }
        if (mode === 'chat') {
            if (!chatId) {
                return {
                    result: false,
                    message: 'no chatId'
                }
            }
            if (!fileNameWithoutExtension) {
                return {
                    result: false,
                    message: 'no fileNameWithoutExtension'
                }
            }
            if (!v4uuid) {
                return {
                    result: false,
                    message: 'no v4uuid'
                }
            }
        }
        // == ==

        const address = (mode === 'avatar')
            ? `avatars/${auth.currentUser.uid}/${auth.currentUser.uid}.jpg`
            : `chatPics/${chatId}/${fileNameWithoutExtension}${v4uuid}.jpg`
        const storageRef = sRef(storage, address)
        try {
            await uploadString(storageRef, cropImg, 'data_url')
            return {
                result: true,
                message: (mode === 'avatar') ? 'Avatar uploaded.' : 'Image uploaded.'
            }
        } catch (e: any) {
            console.error('Avatar upload error.')
            return {
                result: false,
                message: 'Avatar upload error.'
            }
        }
    },
    getDownloadImgUrl: async (mode: ImgUploadModeType, chatId: null | string = '',
                              fileNameWithoutExtension: StringNullType = null, v4uuid: StringNullType = null) => {
        const storage = getStorage()
        if (!auth.currentUser) {
            console.error('firebaseAPI.downloadAva !auth.currentUser')
            return
        }

        let url
        if (mode === 'chat') {
            if (fileNameWithoutExtension && v4uuid) {
                url = `chatPics/${chatId}/${fileNameWithoutExtension}${v4uuid}.jpg`
            } else {
                console.error('no fileNameWithoutExtension or v4uuid')
                return null
            }
        }
        if (mode === 'avatar') {
            url = `avatars/${auth.currentUser.uid}/${auth.currentUser.uid}.jpg`
        }
        if (mode === 'anotherUserAva') {
            if (fileNameWithoutExtension) {
                url = `avatars/${fileNameWithoutExtension}/${fileNameWithoutExtension}.jpg`
            } else {
                console.error('no fileNameWithoutExtension')
                return null
            }
        }

        // Get the download URL
        const starsRef = sRef(storage, `${url}`)

        // checking if avatar exists
        let avaFiles: Array<string> = []
        const listRef = mode === 'anotherUserAva'
            ? sRef(storage, `avatars/${fileNameWithoutExtension}`)
            : sRef(storage, `avatars/${auth.currentUser.uid}`)
        await listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    avaFiles.push(itemRef.name)
                })
            }).catch((error) => {
                console.error('listAll error: ' + error)
            })

        if (avaFiles.length > 0) { // check if the ava exists
            return getDownloadURL(starsRef)
                .then((url) => {
                    return url
                })
                .catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            console.error('firebaseAPI.getDownloadImgUrl: File doesn\'t exist')
                            return ''
                        case 'storage/unauthorized':
                            console.error('firebaseAPI.getDownloadImgUrl: User doesn\'t have permission to access the object')
                            return ''
                        case 'storage/canceled':
                            console.error('firebaseAPI.getDownloadImgUrl: User canceled the upload')
                            return ''
                        case 'storage/unknown':
                            console.error('firebaseAPI.getDownloadImgUrl: Unknown error occurred, inspect the server response')
                            return ''
                    }
                })
        } else return ''
    },
    updateAuthUserStatus: async (newUserStatus: string) => {
        if (auth.currentUser) {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                userStatus: newUserStatus,
            })
        } else {
            console.error('updateActiveUserStatus: no auth.currentUser')
        }
    },
    deleteAuthUserStatus: async () => {
        if (auth.currentUser) {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                userStatus: deleteField(),
            })
        } else {
            console.error('updateActiveUserStatus: no auth.currentUser')
        }
    },
    startAllUsersObserver: async (activeUserId: string, dispatch: AppDispatchType) => {
        const q = query(collection(db, 'users'), where('id', '!=', activeUserId))
        let users: Array<UserType> = []
        onSnapshot(q, (querySnapshot) => {
            users = []
            querySnapshot.forEach((doc) => {
                users.push({
                    id: doc.data().id,
                    email: doc.data().email,
                    name: doc.data().name,
                    state: doc.data().state,
                    last_changed: doc.data().last_changed,
                    userStatus: doc.data().userStatus
                } as UserType)
            })
            dispatch(setUsers({users}))
            dispatch(setUsersStatus({usersStatus: 'succeeded'}))
        })
    },
    requestUnreadStatusObserver: async (
        collection: 'friendship' | 'unread', friendshipId: string, userId: string,
        activeUserToFriendFriendshipCallback: React.Dispatch<React.SetStateAction<boolean>>,
        unreadStatusCallback: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        let status: null | boolean = null
        const q = doc(db, collection, friendshipId)
        onSnapshot(q, (doc) => {
            if (doc.exists()) {
                status = doc.data()[userId]
                if (collection === 'friendship' && status !== null) {
                    activeUserToFriendFriendshipCallback(status)
                }
                if (collection === 'unread' && status !== null) unreadStatusCallback(status)
            }
        })
    }
}

type MessageBodyType = {
    text: string
    to: string
    from: string
}

type SendVerificationEmailReturnType = {
    result: boolean
    text: string
}

type UploadFile2FirestoreReturnType = {
    result: boolean
    message: string
}

