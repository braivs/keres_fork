import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from 'firebase/auth'
import {setLoginStatus, setRegisterStatus} from 'src/redux/authSlice'
import {UserType} from 'src/common/types'
import {auth} from 'src/firebase'
import {
    RequestStatusType,
    setAppStatus,
    setEmailVerificationStatus,
    setIsElementsBlocked
} from 'src/redux/appSlice'
import {firebaseAPI} from 'src/api/firebaseAPI'
import {
    setConfirmEmailShow,
    setCreateUserNameShow,
    setLoginShow,
    setOverlayWalletAndSettingsShow,
    setRegisterShow,
} from 'src/redux/overlaySlice'
import {
    setActiveFriend,
    setCountOffline,
    setCountOnline,
    setCountRequests,
    setFriendships
} from 'src/redux/friendsSlice'
import {setChatMessages} from "src/redux/messagesSlice"
import {AppDispatchType, RootStateType} from "src/redux/store"
import {onlyLettersAndNumbers} from "src/common/helpers"

const initialState: UserInitialStateType = {
    activeAuthUser: undefined, // this is active user from Authentication
    activeFirebaseUser: null, // this is active user from Firebase
    errorCode: null,
    errorMessage: null,
    friends: null,
    users: null,
    usersStatus: 'idle',
    addFriendOverlayUsers: null,
    verifyEmailStatus: {
        isSend: false,
        answerText: ''
    },
    createUserMessages: {
        success: '',
        error: ''
    }

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<SetErrorType>) {
            state.errorMessage = action.payload.errorMessage
            state.errorCode = action.payload.errorCode
        },
        removeError(state) {
            state.errorMessage = null
            state.errorCode = null
        },
        setUsers(state, action: PayloadAction<{ users: Array<UserType> | null }>) {
            state.users = action.payload.users
        },
        setUsersStatus(state, action: PayloadAction<{ usersStatus: RequestStatusType }>) {
            state.usersStatus = action.payload.usersStatus
        },
        setAddFriendOverlayUsers(state, action: PayloadAction<{ users: Array<UserType> | null }>) {
            state.addFriendOverlayUsers = action.payload.users
        },
        setVerifyEmailStatus(state, action: PayloadAction<{ isSend: boolean, answerText: string }>) {
            state.verifyEmailStatus.isSend = action.payload.isSend
            state.verifyEmailStatus.answerText = action.payload.answerText
        },
        setActiveAuthUser(state, action: PayloadAction<User | null>) {
            state.activeAuthUser = action.payload
        },
        setActiveFirebaseUser(state, action: PayloadAction<UserType | null>) {
            state.activeFirebaseUser = action.payload
        },
        setCreateUserMessageSuccess(state, action: PayloadAction<{ successText: string }>) {
            state.createUserMessages.success = action.payload.successText
        },
        setCreateUserMessageError(state, action: PayloadAction<{ errorText: string }>) {
            state.createUserMessages.error = action.payload.errorText
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersObserver.pending, () => {
                userSlice.actions.setUsersStatus({usersStatus: 'loading'})
                userSlice.actions.setUsers({users: null})
            })
    },
})

const loginUser = createAsyncThunk(
    'user/loginUser',
    async (param: { email: string, password: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({appStatus: 'loading'}))
            thunkAPI.dispatch(setLoginStatus('Logging in...'))
            await firebaseAPI.login(param.email, param.password)
            let collectionUser = null
            if (auth.currentUser) {
                if (!auth.currentUser.emailVerified) thunkAPI.dispatch(setLoginShow(false))
                else {
                    collectionUser = await firebaseAPI.getUserById(auth.currentUser.uid)
                    if (collectionUser === null) { // if login collectionUser have no username
                        thunkAPI.dispatch(setLoginShow(false))
                        thunkAPI.dispatch(setRegisterStatus({registerStatus: "not registered"}))
                    }  else {
                        thunkAPI.dispatch(setRegisterStatus({registerStatus: 'registered'}))
                    }
                    thunkAPI.dispatch(setError({errorMessage: null, errorCode: null}))
                    thunkAPI.dispatch(setLoginShow(false))
                }
            }
            // state.auth.loginStatus === 'loggedIn' && await firebaseAPI.updateActiveUserStatus('online')
        } catch (error: any) {
            const errorCode = error.code
            const errorMessage = error.message
            thunkAPI.dispatch(setError({errorMessage, errorCode}))
            thunkAPI.dispatch(setLoginStatus('noLoggedIn'))
        } finally {
            thunkAPI.dispatch(setAppStatus({appStatus: 'succeeded'}))
        }
    }
)

const googleLogin = createAsyncThunk(
    'user/googleLogin',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setLoginShow(false))
        await firebaseAPI.googleLoginPopup()
    }
)

const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (param, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const activeUser = state.user.activeAuthUser
        try {
            thunkAPI.dispatch(setAppStatus({appStatus: 'loading'}))
            thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: true, reason: 'Logging out...'}))
            thunkAPI.dispatch(setLoginStatus('Logging out...'))
            let collectionUser = null
            if (auth.currentUser) {
                collectionUser = await firebaseAPI.getUserById(auth.currentUser.uid) // todo: refactor duplicate
            }
            if (activeUser && collectionUser) await firebaseAPI.updateActiveUserStatus('offline')
            await firebaseAPI.logout()
            thunkAPI.dispatch(setLoginStatus("noLoggedIn"))
            thunkAPI.dispatch(setChatMessages({messages: null}))
            thunkAPI.dispatch(setActiveFriend({
                userData: null,
                isFriend: false,
                friendshipId: null
            }))
            thunkAPI.dispatch(setCountOnline({value: 0}))
            thunkAPI.dispatch(setCountRequests({value: 0}))
            thunkAPI.dispatch(setCountOffline({value: 0}))
            thunkAPI.dispatch(setOverlayWalletAndSettingsShow({show: false}))
            thunkAPI.dispatch(setFriendships({
                data: {
                    friendshipsFriends: null,
                    friendshipsRequests: null
                }
            }))
            thunkAPI.dispatch(setActiveFirebaseUser(null))
            thunkAPI.dispatch(setRegisterStatus({registerStatus: "unknown"}))
        } catch (e) {
            console.error('some error inside userThunks.logoutUser')
        } finally {
            thunkAPI.dispatch(setAppStatus({appStatus: 'succeeded'}))
        }
    }
)

// register stage 1:
// register email + password in firebase, without username
const registerUser = createAsyncThunk(
    'user/registerEmail',
    async (param: { email: string, password: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({appStatus: 'loading'}))
            await firebaseAPI.register(param.email, param.password)
            thunkAPI.dispatch(removeError())
            thunkAPI.dispatch(setRegisterShow(false))
            thunkAPI.dispatch(setConfirmEmailShow({show: true}))
        } catch (e: any) {
            const errorCode = e.code
            const errorMessage = e.message
            thunkAPI.dispatch(setError({errorMessage, errorCode}))
        } finally {
            thunkAPI.dispatch(setAppStatus({appStatus: 'succeeded'}))
        }
    }
)


// This is getting of all users, except activeUserId
const getAllUsersObserver = createAsyncThunk(
    'user/setAllUsers',
    async (param: { activeUserId: string }, thunkAPI) => {
        await firebaseAPI.startAllUsersObserver(param.activeUserId, thunkAPI.dispatch as AppDispatchType)
    })


const searchByName = createAsyncThunk(
    'user/searchByName',
    async (param: { userName: string }, thunkAPI) => {
        const user: Array<UserType> = await firebaseAPI.getUserByName(param.userName)
        thunkAPI.dispatch(setAddFriendOverlayUsers({users: user}))
    }
)

// this is realtime observing user is online/offline
// https://firebase.google.com/docs/firestore/solutions/presence?authuser=1
const presenceObserver = createAsyncThunk(
    'user/onlineObserver',
    async () => {
        await firebaseAPI.presenceObserver()
    }
)

// register stage 2:
const sendVerificationEmail = createAsyncThunk(
    'user/sendVerificationEmail',
    async (param: { user: User }, thunkAPI) => {
        thunkAPI.dispatch(setEmailVerificationStatus("loading"))
        try {
            const answer = await firebaseAPI.sendVerificationEmail(param.user)
            thunkAPI.dispatch(setVerifyEmailStatus({isSend: answer.result, answerText: answer.text}))
        } catch {
            console.error('sendVerificationEmail ')
        } finally {
            thunkAPI.dispatch(setEmailVerificationStatus("succeeded"))
        }
    }
)

// Find Authentication user in Cloud Firestore and set them to state
const setActiveFirebaseUserThunk = createAsyncThunk(
    'user/setActiveFirebaseUserThunk',
    async (param: { activeUser: User }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const {isConnectedToFirebase} = state.app
        if (param.activeUser.email) {
            thunkAPI.dispatch(setAppStatus({appStatus: 'loading'}))
            firebaseAPI.getUserByEmail(param.activeUser.email)
                .then(userName => {
                    if ((userName === null || userName === undefined) && param.activeUser.emailVerified && isConnectedToFirebase) {
                        thunkAPI.dispatch(setRegisterStatus({registerStatus: "not registered"}))
                    } else {
                        thunkAPI.dispatch(setActiveFirebaseUser(userName))
                    }
                })
                .catch((e: any) => {
                    console.error('Header firebaseAPI.setUserNameByEmail error')
                    console.log(e.message)
                })
                .finally(() => {
                    thunkAPI.dispatch(setAppStatus({appStatus: 'succeeded'}))
                })
        } else {
            console.error('no user.email')
        }
    }
)

// register stage 3
const creatingUserInFirestoreDB = createAsyncThunk(
    'user/creatingUserInFirestoreDB',
    async (param: { activeAuthUser: User, userName: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({appStatus: 'loading'}))
        const isLatinName = onlyLettersAndNumbers(param.userName)
        if (!isLatinName) {
            thunkAPI.dispatch(setCreateUserMessageError({errorText: 'Only latin letters and numbers allowed'}))
        } else {
            const isNameUnique = await firebaseAPI.isNameUnique(param.userName)
            if (isNameUnique) {
                if (param.activeAuthUser.uid && param.activeAuthUser.email) {
                    try {
                        await firebaseAPI.createUser(param.activeAuthUser.uid, param.activeAuthUser.email, param.userName)
                        await firebaseAPI.updateActiveUserStatus('online')
                        thunkAPI.dispatch(setCreateUserMessageError({errorText: ''}))
                        thunkAPI.dispatch(setCreateUserMessageSuccess({successText: `Registered username: ${param.userName}`}))
                        thunkAPI.dispatch(userThunks.setActiveFirebaseUserThunk({activeUser: param.activeAuthUser}))
                        thunkAPI.dispatch(setCreateUserNameShow({createUserNameShow: false}))
                        thunkAPI.dispatch(setRegisterStatus({registerStatus: "registered"}))
                    } catch {
                        console.error('createUser error')
                    }
                } else console.error('not user.uid or user.email')
            } else {
                thunkAPI.dispatch(setCreateUserMessageSuccess({successText: ``}))
                thunkAPI.dispatch(setCreateUserMessageError({errorText: 'User name NOT unique'}))
            }
        }
        thunkAPI.dispatch(setAppStatus({appStatus: 'succeeded'}))
    }
)

export const {
    setError,
    removeError,
    setActiveAuthUser,
    setUsers,
    setUsersStatus,
    setAddFriendOverlayUsers,
    setVerifyEmailStatus,
    setActiveFirebaseUser,
    setCreateUserMessageSuccess,
    setCreateUserMessageError
} = userSlice.actions
export const userReducer = userSlice.reducer
export const userThunks = {
    logoutUser,
    loginUser,
    getAllUsersObserver,
    presenceObserver,
    searchByName,
    sendVerificationEmail,
    registerStage1: registerUser,
    setActiveFirebaseUserThunk,
    creatingUserInFirestoreDB,
    googleLogin
}

type ErrorCodeType = string | null
type ErrorMessageType = string | null
type VerifyEmailStatusType = {
    isSend: boolean
    answerText: string
}

type createUserMessagesType = {
    success: string
    error: string
}

export type UserInitialStateType = {
    activeAuthUser: null | User | undefined
    activeFirebaseUser: UserType | null
    errorCode: ErrorCodeType
    errorMessage: ErrorMessageType
    friends: Array<UserType> | null
    users: Array<UserType> | null
    usersStatus: RequestStatusType
    // this is users for AddFriendOverlay. Because it can show single user after search or all users:
    addFriendOverlayUsers: Array<UserType> | null
    verifyEmailStatus: VerifyEmailStatusType
    createUserMessages: createUserMessagesType
}

export type SetErrorType = {
    errorCode: ErrorCodeType
    errorMessage: ErrorMessageType
}

