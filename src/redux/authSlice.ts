import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from 'src/firebase'
import {setConfirmEmailShow} from 'src/redux/overlaySlice'
import {setActiveAuthUser} from "src/redux/userSlice"
import {LoginStatusType, RegisterStatusType} from "src/common/types"

const initialState: AuthInitialStateType = {
    loginStatus: 'noLoggedIn',
    registerStatus: 'unknown',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoginStatus(state, action: PayloadAction<LoginStatusType>) {
            state.loginStatus = action.payload
        },
        setRegisterStatus(state, action: PayloadAction<{registerStatus: RegisterStatusType}>) {
            state.registerStatus = action.payload.registerStatus
        },
    }
})

const turnOnLoginObserver = createAsyncThunk(
    'auth/turnOnLoginMonitoring',
    async (param, thunkAPI) => {
        onAuthStateChanged(auth, user => {
            thunkAPI.dispatch(setLoginStatus("checking"))
            if (user) {
                thunkAPI.dispatch(setActiveAuthUser(user))
                if (!user.emailVerified) {
                    thunkAPI.dispatch(setLoginStatus("preLogin"))
                    thunkAPI.dispatch(setConfirmEmailShow({show: true}))
                } else {
                    thunkAPI.dispatch(setLoginStatus("loggedIn"))
                }
            } else {
                thunkAPI.dispatch(setActiveAuthUser(null))
                thunkAPI.dispatch(setLoginStatus('noLoggedIn'))
            }
        })
    }
)

export const authReducer = authSlice.reducer
export const {setLoginStatus, setRegisterStatus} = authSlice.actions
export const authThunks = {turnOnLoginObserver}

export type AuthInitialStateType = {
    loginStatus: LoginStatusType
    registerStatus: RegisterStatusType
}