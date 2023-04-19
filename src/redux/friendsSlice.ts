import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {friendshipsType, UserType} from 'src/common/types'
import {firebaseAPI} from 'src/api/firebaseAPI'
import {collection, doc, onSnapshot, query, setDoc} from 'firebase/firestore'
import {db} from 'src/firebase'
import {RootStateType} from "src/redux/store"
import {
    RequestStatusType,
    setActiveFriendStatus,
    setAppStatus,
    setChangeFriendshipStatus,
    setMessageHeaderFriendStatus
} from "src/redux/appSlice"
import {combinedId, filterIdsArrayExceptActiveUserId} from "src/common/helpers"
import React, {MutableRefObject} from "react"

const initialState: FriendsStateType = {
    onlineMenuCurrentValue: 'online',
    counters: {
        online: 0,
        requests: 0,
        offline: 0
    },
    friendsLists: {
        friendsOnline: null,
        friendsRequests: null,
        friendsOffline: null
    },
    friendships: {
        friendshipsFriends: [],
        friendshipsRequests: []
    },
    activeFriend: {
        userData: null,
        isFriend: false,
        friendshipId: null
    }
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialState,
    reducers: {
        setOnlineMenuCurrentValue(state, action: PayloadAction<{ onlineMenuCurrentValue: OnlineMenuCurrentValueType }>) {
            state.onlineMenuCurrentValue = action.payload.onlineMenuCurrentValue
        },
        setCountOnline(state, action: PayloadAction<{ value: number }>) {
            state.counters.online = action.payload.value
        },
        setCountRequests(state, action: PayloadAction<{ value: number }>) {
            state.counters.requests = action.payload.value
        },
        setCountOffline(state, action: PayloadAction<{ value: number }>) {
            state.counters.offline = action.payload.value
        },
        setFriendsOnline(state, action: PayloadAction<{ friendsOnline: null | Array<UserType> }>) {
            state.friendsLists.friendsOnline = action.payload.friendsOnline
        },
        setFriendsOffline(state, action: PayloadAction<{ friendsOffline: null | Array<UserType> }>) {
            state.friendsLists.friendsOffline = action.payload.friendsOffline
        },
        setFriendsRequests(state, action: PayloadAction<{ friendsRequests: null | Array<UserType> }>) {
            state.friendsLists.friendsRequests = action.payload.friendsRequests
        },
        setFriendships(state, action: PayloadAction<{ data: FriendshipsType }>) {
            state.friendships.friendshipsFriends = action.payload.data.friendshipsFriends
            state.friendships.friendshipsRequests = action.payload.data.friendshipsRequests
        },
        setActiveFriend(state, action: PayloadAction<UserFriendType>) {
            state.activeFriend.userData = action.payload.userData
            state.activeFriend.isFriend = action.payload.isFriend
            state.activeFriend.friendshipId = action.payload.friendshipId
        },
        setActiveFriendIsFriend(state, action: PayloadAction<boolean>) {
            state.activeFriend.isFriend = action.payload
        }
    }
})

const friendshipObserver = createAsyncThunk(
    'friends/friendshipObserver',
    async (param: { activeUserId: string }, thunkAPI) => {
        const q = query(collection(db, 'friendship'))
        onSnapshot(q, (querySnapshot) => {
            const friendships: Array<friendshipsType> = []
            querySnapshot.forEach((doc) => {
                if (param.activeUserId && doc.id.includes(param.activeUserId)) { // find only own friendships
                    friendships.push({id: doc.id, docData: doc.data()} as friendshipsType)
                }
            })
            // getting friendships friends
            const friendshipsFriends = friendships.filter((e) => { // here getting object with both true inside docData
                const docDataValues: Array<Object> = Object.values(e.docData)
                const isAllTrue = docDataValues.every((value) => value === true)
                if (isAllTrue && docDataValues.length === 2) {
                    return e
                } else return ''
            })
            const friendshipsFriendsFiltered = filterIdsArrayExceptActiveUserId(friendshipsFriends, param.activeUserId)

            // getting friendships requests
            const friendshipsRequests = friendships.filter((e) => {
                if (param.activeUserId !== null) {
                    const activeUserValue = e.docData[param.activeUserId]
                    const keyAnother = Object.keys(e.docData).filter(e => e !== param.activeUserId)[0]
                    const anotherValue = e.docData[keyAnother]
                    if ((!activeUserValue) && anotherValue) {
                        return e
                    } else return ''
                } else {
                    console.error('friendships filter requests MODE: no activeUserId ')
                    return ''
                }
            })
            const friendshipsRequestsFiltered = filterIdsArrayExceptActiveUserId(friendshipsRequests, param.activeUserId)

            thunkAPI.dispatch(setFriendships({
                data: {
                    friendshipsFriends: friendshipsFriendsFiltered,
                    friendshipsRequests: friendshipsRequestsFiltered
                }
            }))
        })
    }
)

// Fetch requests status for request icon in FriendsCard + same for unread messages icon
const fetchRequestUnreadStatus = createAsyncThunk<boolean | null, { collection: 'friendship' | 'unread', userId: string, friendshipId: string }>(
    'friends/fetchRequestUnreadStatus',
    async (param) => {
        return await firebaseAPI.getRequestOrUnreadStatus(param.userId, param.friendshipId, param.collection)
    }
)

const changeFriendship = createAsyncThunk(
    'friends/changeFriendship',
    async (param: { friendshipId: string }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const activeUserId = state.user.activeAuthUser?.uid
        // thunkAPI.dispatch(setChangeFriendshipStatus("loading"))
        if (activeUserId) { // if user is logged in
            thunkAPI.dispatch(setChangeFriendshipStatus("loading"))
            let friendshipStatus = await firebaseAPI.getRequestOrUnreadStatus(activeUserId, param.friendshipId, "friendship")
            const data = {[activeUserId]: friendshipStatus ? !friendshipStatus : true} // if exists change to opposite, else to true
            const friendshipRef = doc(db, 'friendship', param.friendshipId)
            await setDoc(friendshipRef, data, {merge: true})
            // check friendshipStatus again after update
            const status = await firebaseAPI.getRequestOrUnreadStatus(activeUserId, param.friendshipId, "friendship")
            thunkAPI.dispatch(setChangeFriendshipStatus("succeeded"))
            return status
        } else {
            console.error('changeFriendship: no activeUserId')
            return null
        }
        // thunkAPI.dispatch(setChangeFriendshipStatus("succeeded"))
    }
)

// that is big logic that was in FriendCard -> onChangeFriendship
const changeFriendshipCard = createAsyncThunk(
    'friends/changeFriendshipCard',
    async (param: {
        activeUserId: string, activeFriend: UserFriendType, friendshipID: string,
        isMounted: MutableRefObject<boolean>,
        setLocalStatusCallback: React.Dispatch<React.SetStateAction<RequestStatusType>>,
        setActiveUserToFriendFriendshipCallback: React.Dispatch<React.SetStateAction<boolean>>
    }, thunkAPI) => {
        if (param.isMounted.current) param.setLocalStatusCallback('loading')

        // this is special situation: when friend selected and same click on friend list
        let superSituation
        let superFriendshipId
        if (param.activeUserId && param.activeFriend.userData) {
            superFriendshipId = param.activeFriend.userData.id
                ? combinedId(param.activeFriend.userData.id, param.activeUserId)
                : null
        } else {
            superFriendshipId = null
        }
        superSituation = !!(superFriendshipId && param.friendshipID && superFriendshipId === param.friendshipID)

        let friendshipStatus = null
        if (param.friendshipID) { // if friend selected
            superSituation && thunkAPI.dispatch(setMessageHeaderFriendStatus("loading"))
            // thunkAPI.dispatch(setChangeFriendshipStatus("loading"))
            friendshipStatus = await thunkAPI.dispatch(friendsThunks.changeFriendship({friendshipId: param.friendshipID})).unwrap()
            // thunkAPI.dispatch(setChangeFriendshipStatus("succeeded"))
            if (superSituation && friendshipStatus !== null) {
                const objCopy = {...param.activeFriend} // to save previous values
                if (objCopy.userData) {
                    thunkAPI.dispatch(setActiveFriend({
                        userData: {...objCopy.userData},
                        isFriend: friendshipStatus,
                        friendshipId: objCopy.friendshipId
                    }))
                } else {
                    console.error('no objCopy.userData')
                }
            }
            superSituation && thunkAPI.dispatch(setMessageHeaderFriendStatus("succeeded"))
        }
        if (!param.isMounted.current) {
            return
        }
        param.setLocalStatusCallback('succeeded')
        friendshipStatus !== null && param.setActiveUserToFriendFriendshipCallback(friendshipStatus)
    }
)

const selectFriendChat = createAsyncThunk(
    'friends/selectFriendChat',
    async (param: { friendId: string, friendshipId: string | null, isFriend: boolean }, thunkAPI) => {
        if (param.friendshipId) {
            thunkAPI.dispatch(setActiveFriendStatus('loading'))
            const userData = await firebaseAPI.getUserById(param.friendId)
            if (userData) {
                thunkAPI.dispatch(setActiveFriend({
                    userData,
                    friendshipId: param.friendshipId,
                    isFriend: param.isFriend
                }))
            } else {
                console.error('no user found with friendId')
            }

            // writing unread status
            await firebaseAPI.changeMessagesUnreadStatus(param.friendshipId, param.friendId, false)
            thunkAPI.dispatch(setActiveFriendStatus('succeeded'))
        } else {
            console.error('friendsThunks.selectFriendChat: no friendshipId')
        }
    }
)

const sortFriendsOnlineOfflineRequests = createAsyncThunk(
    'friends/selectFriendChat',
    async (param: { friendships: FriendshipsType }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const users = state.user.users

        // searcher to find in users by friendship
        const finder = (friendships: Array<string>, usersPar: Array<UserType>) => {
            const friendshipsRequests = friendships
            let results: Array<UserType> = []
            for (let i = 0; i < friendshipsRequests.length; i++) {
                const request = usersPar.find(e => e.id === friendships[i])
                results.push(request as UserType)
            }
            return results
        }
        const arrayLengthCheck = (array: Array<UserType>) => array.length > 0 ? array : null

        thunkAPI.dispatch(setAppStatus({appStatus: "loading"}))
        try {
            if (users) {
                if (param.friendships.friendshipsFriends) { //getting friends from users by friendships
                    const friends = finder(param.friendships.friendshipsFriends, users)
                        const onlineFriends: Array<UserType> = friends.filter(e => {
                                return e && e.state === 'online'
                            }
                        )
                        const offlineFriends: Array<UserType> = friends.filter(e => {
                                return e && e.state === 'offline'
                            }
                        )
                        thunkAPI.dispatch(setFriendsOnline({friendsOnline: arrayLengthCheck(onlineFriends)}))
                        thunkAPI.dispatch(setFriendsOffline({friendsOffline: arrayLengthCheck(offlineFriends)}))
                        thunkAPI.dispatch(setCountOnline({value: onlineFriends.length}))
                        thunkAPI.dispatch(setCountOffline({value: offlineFriends.length}))
                    }
                if (param.friendships.friendshipsRequests) { // finding request in users
                    const requests = finder(param.friendships.friendshipsRequests, users)
                    thunkAPI.dispatch(setFriendsRequests({friendsRequests: arrayLengthCheck(requests)}))
                    thunkAPI.dispatch(setCountRequests({value: requests.length}))
                }
            }
        } catch (e: any) {
            console.error('error friendsThunks.sortFriendsOnlineOfflineRequests: ' + e.message)
        } finally {
            thunkAPI.dispatch(setAppStatus({appStatus: "succeeded"}))
        }
    }
)

const requestUnreadStatusObserver = createAsyncThunk(
    'friends/requestUnreadStatusObserver',
    async (param: {
        collection: 'friendship' | 'unread', friendshipId: string, userId: string,
        activeUserToFriendFriendshipCallback: React.Dispatch<React.SetStateAction<boolean>>,
        unreadStatusCallback: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
        await firebaseAPI.requestUnreadStatusObserver(param.collection, param.friendshipId, param.userId,
            param.activeUserToFriendFriendshipCallback, param.unreadStatusCallback)
    }
)

export const friendsReducer = friendsSlice.reducer
export const {
    setOnlineMenuCurrentValue,
    setCountOnline,
    setCountRequests,
    setCountOffline,
    setFriendsOnline,
    setFriendsOffline,
    setFriendsRequests,
    setFriendships,
    setActiveFriend,
    setActiveFriendIsFriend
} = friendsSlice.actions

export const friendsThunks = {
    friendshipObserver,
    fetchRequestUnreadStatus,
    changeFriendship,
    selectFriendChat,
    sortFriendsOnlineOfflineRequests,
    requestUnreadStatusObserver,
    changeFriendshipCard
}

// types
export type OnlineMenuCurrentValueType = 'online' | 'requests' | 'offline'
type FriendsListsType = {
    friendsOnline: null | Array<UserType>
    friendsOffline: null | Array<UserType>
    friendsRequests: null | Array<UserType>
}
export type UserFriendType = {
    userData: UserType | null
    friendshipId: string | null
    isFriend: boolean
}
export type FriendsStateType = {
    onlineMenuCurrentValue: OnlineMenuCurrentValueType
    counters: {
        online: number
        requests: number
        offline: number
    }
    friendsLists: FriendsListsType
    friendships: FriendshipsType,
    activeFriend: UserFriendType,
}
export type FriendshipsType = {
    friendshipsFriends: Array<string> | null
    friendshipsRequests: Array<string> | null
}




