// combined thunks here

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {friendsThunks, setActiveFriend} from "src/redux/friendsSlice"
import {setButtonState, setIsElementsBlocked} from "src/redux/appSlice"
import {RootStateType} from "src/redux/store"
import {auth} from "src/firebase"
import {firebaseAPI} from "src/api/firebaseAPI"
import {userThunks} from "src/redux/userSlice"
import {imageUploadThunks} from "src/redux/imageUploadSlice"
import {setRegisterStatus} from "src/redux/authSlice"

const initialState = {}

export const combinedSlice = createSlice({
    name: 'combined',
    initialState: initialState,
    reducers: {},
})

export const combinedReducer = combinedSlice.reducer

const sortFriendsAndActiveFriend = createAsyncThunk(
    'combined/sortFriendsAndActiveFriend',
    async (
        param, thunkAPI
    ) => {
        const state = thunkAPI.getState() as RootStateType
        const {users} = state.user
        const {activeFriend, friendships} = state.friends
        if (users) {
            thunkAPI.dispatch(friendsThunks.sortFriendsOnlineOfflineRequests({friendships}))
            if (activeFriend.userData) { // special situation for selected friend, to change online status
                const foundedUser = users.find(e => e.id === activeFriend.userData?.id)
                if (foundedUser) {
                    const objCopy = {...activeFriend} // to save previous values
                    if (objCopy.userData) {
                        thunkAPI.dispatch(setActiveFriend({
                            userData: {...objCopy.userData, state: foundedUser.state},
                            isFriend: objCopy.isFriend,
                            friendshipId: objCopy.friendshipId
                        }))
                    } else {
                        console.error('no objCopy.userData')
                    }
                }
            }
        }
    }
)

// status of all site elements
const blockElements = createAsyncThunk(
    'combined/blockElements',
    async (
        param, thunkAPI
    ) => {
        const state = thunkAPI.getState() as RootStateType
        const {isConnectedToFirebase} = state.app
        const {loginStatus, registerStatus} = state.auth

        if (!isConnectedToFirebase) {
            thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: true, reason: 'Connecting to database...'}))
        } else {
            switch (loginStatus) {
                case 'loggedIn': {
                    switch (registerStatus) {
                        case "unknown": {
                            thunkAPI.dispatch(setIsElementsBlocked({
                                isElementsBlocked: true,
                                reason: 'Checking username...'
                            }))
                            break
                        }
                        case 'not registered': {
                            thunkAPI.dispatch(setIsElementsBlocked({
                                isElementsBlocked: true,
                                reason: 'create user name'
                            }))
                            break
                        }
                        case 'registered': {
                            thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: false, reason: 'none'}))
                            break
                        }
                    }
                    break
                }
                case 'Logging in...': {
                    thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: true, reason: 'Logging in...'}))
                    break
                }
                case 'Logging out...': {
                    thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: true, reason: 'Logging out...'}))
                    break
                }
                default: {
                    thunkAPI.dispatch(setIsElementsBlocked({isElementsBlocked: true, reason: 'Please login'}))
                    break
                }
            }
        }
    })

// central app buttons block conditions
const blockButtons = createAsyncThunk(
    'combined/blockButtons',
    async (
        param, thunkAPI
    ) => {
        const state = thunkAPI.getState() as RootStateType
        const {changeFriendshipStatus, activeFriendStatus} = state.app
        const {newMessageSendStatus} = state.messages
        const {loginStatus} = state.auth
        if (changeFriendshipStatus === 'loading' || newMessageSendStatus === 'loading'
            || activeFriendStatus === 'loading' || loginStatus !== "loggedIn") {
            thunkAPI.dispatch(setButtonState({component: 'FriendCard', isDisabled: true}))
            thunkAPI.dispatch(setButtonState({component: 'MessageHeader', isDisabled: true}))
            thunkAPI.dispatch(setButtonState({component: 'AddNewFriend', isDisabled: true}))
        } else {
            thunkAPI.dispatch(setButtonState({component: 'FriendCard', isDisabled: false}))
            thunkAPI.dispatch(setButtonState({component: 'MessageHeader', isDisabled: false}))
            thunkAPI.dispatch(setButtonState({component: 'AddNewFriend', isDisabled: false}))

        }
    }
)

// if user logged in then set userName from activeUser and turn on users online realtime monitoring
// + his username is registered
const firebaseMonitoringAndUserData = createAsyncThunk(
    'combined/blockButtons',
    async (
        param, thunkAPI
    ) => {
        const state = thunkAPI.getState() as RootStateType
        const {activeAuthUser} = state.user
        const {isConnectedToFirebase} = state.app

        if (activeAuthUser && isConnectedToFirebase) {
            let collectionUser = null
            if (auth.currentUser) {
                collectionUser = await firebaseAPI.getUserById(auth.currentUser.uid) //todo: refactor and same like this
                if (collectionUser) {
                    thunkAPI.dispatch(userThunks.setActiveFirebaseUserThunk({activeUser: activeAuthUser}))
                    thunkAPI.dispatch(userThunks.presenceObserver()) // technical realtime users monitoring for firebase
                    thunkAPI.dispatch(imageUploadThunks.getSetUserAva())
                    thunkAPI.dispatch(setRegisterStatus({registerStatus: "registered"}))
                } else {
                    thunkAPI.dispatch(setRegisterStatus({registerStatus: 'not registered'}))
                }
            }
        }
    })

export const combinedThunks = {
    sortFriendsAndActiveFriend,
    blockElements,
    blockButtons,
    firebaseMonitoringAndUserData
}