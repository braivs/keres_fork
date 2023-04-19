import {overlayReducer} from './overlaySlice'
import {friendsReducer} from 'src/redux/friendsSlice'
import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from 'src/redux/authSlice'
import {userReducer} from 'src/redux/userSlice'
import {appReducer} from 'src/redux/appSlice'
import {messagesReducer} from "src/redux/messagesSlice"
import {imageUploadReducer} from "src/redux/imageUploadSlice"
import {combinedReducer} from "src/redux/combinedSlice"

export const store = configureStore({
    reducer: {
        overlay: overlayReducer,
        friends: friendsReducer,
        auth: authReducer,
        user: userReducer,
        app: appReducer,
        messages: messagesReducer,
        imageUpload: imageUploadReducer,
        combined: combinedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // to make possible save Firebase User (onAuthStateChanged) at app start
    })
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store // for dev


