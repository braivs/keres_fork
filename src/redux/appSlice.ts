import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getDatabase, onValue, ref} from "firebase/database"
import {RootStateType} from "src/redux/store"

const initialState: AppStateType = {
    appStatus: 'idle',
    emailVerificationStatus: 'idle',
    activeFriendStatus: 'idle',
    logoutStatus: 'idle',
    avaUploadStatus: 'idle',
    avaDownloadStatus: 'idle',
    messageHeaderFriendStatus: 'idle',
    messagesLoadingStatus: 'idle',
    changeFriendshipStatus: 'idle',
    isConnectedToFirebase: false,
    is1200pxMode: false,
    is600pxMode: false,
    observerList: [],
    blockingOfElements: {
        isElementsBlocked: true,
        reason: 'none'
    },
    buttonsState: {
        friendCardButtonsDisabled: false,
        messageHeaderButtonsDisabled: false,
        addFriendButtonDisabled: false
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ appStatus: RequestStatusType }>) {
            state.appStatus = action.payload.appStatus
        },
        setEmailVerificationStatus(state, action: PayloadAction<RequestStatusType>) {
            state.emailVerificationStatus = action.payload
        },
        setActiveFriendStatus(state, action: PayloadAction<RequestStatusType>) {
            state.activeFriendStatus = action.payload
        },
        setIsMobileMode(state, action: PayloadAction<boolean>) {
            state.is1200pxMode = action.payload
        },
        setIs600pxMode(state, action: PayloadAction<boolean>) {
            state.is600pxMode = action.payload
        },
        setAvaUploadStatus(state, action: PayloadAction<RequestStatusType>) {
            state.avaUploadStatus = action.payload
        },
        setAvaDownloadStatus(state, action: PayloadAction<RequestStatusType>) {
            state.avaDownloadStatus = action.payload
        },
        setMessageHeaderFriendStatus(state, action: PayloadAction<RequestStatusType>) {
            state.messageHeaderFriendStatus = action.payload
        },
        setIsConnectedToFirebase(state, action: PayloadAction<boolean>) {
            state.isConnectedToFirebase = action.payload
        },
        setMessagesLoadingStatus(state, action: PayloadAction<RequestStatusType>) {
            state.messagesLoadingStatus = action.payload
        },
        setIsElementsBlocked(state, action: PayloadAction<{isElementsBlocked: boolean, reason: ReasonType}>) {
            state.blockingOfElements.isElementsBlocked = action.payload.isElementsBlocked
            state.blockingOfElements.reason = action.payload.reason
        },
        setChangeFriendshipStatus(state, action: PayloadAction<RequestStatusType>) {
            state.changeFriendshipStatus = action.payload
        },
        setButtonState(state, action: PayloadAction<{component: ComponentType, isDisabled: boolean}>) {
            switch (action.payload.component) {
                case 'FriendCard': {
                    state.buttonsState.friendCardButtonsDisabled = action.payload.isDisabled
                    return
                }
                case 'MessageHeader': {
                    state.buttonsState.messageHeaderButtonsDisabled = action.payload.isDisabled
                    return
                }
                case 'AddNewFriend': {
                    state.buttonsState.addFriendButtonDisabled = action.payload.isDisabled
                    return
                }
                default: {
                    return
                }
            }
        }
    }
})

// check if firebase is available and then setIsConnectedToFirebase
const isFirebaseAvailable = createAsyncThunk(
    'app/onlineObserver',
    async (param, thunkAPI) => {
        const db = getDatabase()
        const connectedRef = ref(db, ".info/connected")
        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                thunkAPI.dispatch(setIsConnectedToFirebase(true))
            } else {
                thunkAPI.dispatch(setIsConnectedToFirebase(false))
            }
        })
    }
)
//todo: maybe need to combine this with presenceObserver

const showObserverList = createAsyncThunk(
    'user/showObserverList',
    (param, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        console.log('Observer list')
        console.log(state.app.observerList)
    }
)

export const appReducer = appSlice.reducer
export const {
    setAppStatus,
    setEmailVerificationStatus,
    setActiveFriendStatus,
    setIsMobileMode, setIs600pxMode,
    setAvaUploadStatus,
    setAvaDownloadStatus, setMessageHeaderFriendStatus, setIsConnectedToFirebase,
    /*pushToObserverList,*/
    setMessagesLoadingStatus,
    setIsElementsBlocked,
    setChangeFriendshipStatus,
    setButtonState
} = appSlice.actions

export const appThunks = {
    isFirebaseAvailable,
    showObserverList
}
type ReasonType =
    | 'none'
    | 'Please login'
    | 'create user name'
    | 'Connecting to database...'
    | 'Checking username...'
    | 'Logging in...'
    | 'Logging out...'
type BlockingOfElementsType = {
    isElementsBlocked: boolean
    reason: ReasonType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppStateType = {
    appStatus: RequestStatusType
    emailVerificationStatus: RequestStatusType
    activeFriendStatus: RequestStatusType
    logoutStatus: RequestStatusType
    is1200pxMode: boolean
    is600pxMode: boolean
    avaUploadStatus: RequestStatusType
    avaDownloadStatus: RequestStatusType
    messageHeaderFriendStatus: RequestStatusType
    isConnectedToFirebase: boolean
    observerList: Array<Function>
    messagesLoadingStatus: RequestStatusType
    blockingOfElements: BlockingOfElementsType
    changeFriendshipStatus: RequestStatusType
    buttonsState: {
        friendCardButtonsDisabled: boolean
        messageHeaderButtonsDisabled: boolean
        addFriendButtonDisabled: boolean
    }
}

type ComponentType = 'FriendCard' | 'MessageHeader' | 'AddNewFriend'

//todo: move here another progress bars statuses
//todo: maybe combine upload statuses with flag also