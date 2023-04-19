import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {setAvaDownloadStatus, setAvaUploadStatus} from "src/redux/appSlice"
import {firebaseAPI} from "src/api/firebaseAPI"
import {RootStateType} from "src/redux/store"
import {messagesThunks, setMessagesMode} from "src/redux/messagesSlice"
import {setImgUploadShow} from "src/redux/overlaySlice"
import {getFileNameWithoutExtension} from "src/common/helpers"
import {v4} from "uuid"
import {ImgUploadModeType, StringNullType} from "src/common/types"

const initialState: ImageUploadStateType = {
    avatar: {
        avaImg: null,
        avaLoadingMessage: null,
        avaLoadingResult: null,
    },
    imgFileName: null,
    cropImg: null,
    inputImg: null,
}

export const imageUploadSlice = createSlice({
    name: 'imageUpload',
    initialState,
    reducers: {
        setUserAva(state, action: PayloadAction<string | null>) {
            state.avatar.avaImg = action.payload
        },
        setAvaLoadingResultMessage(state, action: PayloadAction<{ avaLoadingResult: boolean | null, avaLoadingMessage: string | null }>) {
            state.avatar.avaLoadingResult = action.payload.avaLoadingResult
            state.avatar.avaLoadingMessage = action.payload.avaLoadingMessage
        },
        setImgFileName(state, action: PayloadAction<StringNullType>) {
            state.imgFileName = action.payload
        },
        setCropImg(state, action: PayloadAction<string | null>) {
            state.cropImg = action.payload
        },
        setInputImg(state, action: PayloadAction<string | null>) {
            state.inputImg = action.payload
        },
    }
})

const getSetUserAva = createAsyncThunk(
    'imageUpload/getUserAva',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAvaDownloadStatus("loading"))
        let url
        try {
            url = await firebaseAPI.getDownloadImgUrl('avatar')
        }
        catch (e: any) {
            console.error('getSetUserAva error: ' + e.message)
        }
        if (url) thunkAPI.dispatch(setUserAva(url))
        else thunkAPI.dispatch(setUserAva(null))
        thunkAPI.dispatch(setAvaDownloadStatus("succeeded"))
    }
)

const getAnotherUserAva = createAsyncThunk(
    'imageUpload/getAnotherUserAva',
    async (param: {userId: string}) => {
        const url = await firebaseAPI.getDownloadImgUrl('anotherUserAva', null, param.userId)
        if (!url) console.error('getAnotherUserAva url is blank')
        return url
    }
)

const uploadImg2Firestore = createAsyncThunk(
    'imageUpload/uploadAva2Firestore',
    async (param: {
        mode: ImgUploadModeType, chatId: StringNullType
    }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const {cropImg, imgFileName} = state.imageUpload
        const activeAuthUser = state.user.activeAuthUser
        const friendshipId = state.friends.activeFriend.friendshipId
        if (cropImg && imgFileName && activeAuthUser) {
            thunkAPI.dispatch(setAvaUploadStatus("loading"))
            try {
                const fileNameWithoutExtension = getFileNameWithoutExtension(imgFileName)
                const v4uuid = v4() // for same filename no overlap
                const returnValue = await firebaseAPI.uploadFile2Firestore(cropImg, param.mode, param.chatId, fileNameWithoutExtension, v4uuid)
                if (returnValue.result) { // if we got img url
                    if (param.mode === 'chat') { // image mode uploading for chat
                        try {
                            // getting img url at FireStore
                            const imgUrl = await firebaseAPI.getDownloadImgUrl("chat", param.chatId, fileNameWithoutExtension, v4uuid)
                            if (imgUrl) {
                                thunkAPI.dispatch(messagesThunks.sendMessage({
                                    chatId: param.chatId,
                                    friendshipId,
                                    isImg: true,
                                    imgUrl: imgUrl
                                }))
                            } else {
                                console.error('no imgUrl')
                            }
                        } catch (e) {
                            console.error('firebaseAPI.getDownloadImgUrl chat')
                        }
                    }

                    if (param.mode === 'avatar') {
                        thunkAPI.dispatch(setAvaLoadingResultMessage({
                            avaLoadingResult: returnValue.result,
                            avaLoadingMessage: returnValue.message
                        }))
                        thunkAPI.dispatch(setUserAva(cropImg))
                    }
                }

            } catch (e) {
                console.error('img upload error')
            }

            thunkAPI.dispatch(setAvaUploadStatus("succeeded"))
        } else {
            console.error('cropImg | imgFileName | activeAuthUser is null')
        }
    }
)

const cancelImgUpload = createAsyncThunk(
    'imageUpload/cancelImgUpload',
    (param, thunkAPI) => {
        thunkAPI.dispatch(setAvaLoadingResultMessage({ // clearing status values
            avaLoadingResult: null,
            avaLoadingMessage: null
        }))
        thunkAPI.dispatch(setCropImg(null))
        thunkAPI.dispatch(setImgUploadShow({show: false, mode: 'avatar'}))
        thunkAPI.dispatch(setImgFileName(null))
        thunkAPI.dispatch(setMessagesMode("text"))
        thunkAPI.dispatch(setInputImg(null))
    }
)

export const {
    setUserAva,
    setAvaLoadingResultMessage,
    setImgFileName, setCropImg, setInputImg
} = imageUploadSlice.actions

export const imageUploadReducer = imageUploadSlice.reducer

export const imageUploadThunks = {
    getSetUserAva,
    uploadImg2Firestore,
    cancelImgUpload,
    getAnotherUserAva
}

type AvatarType = {
    avaImg: null | string
    avaLoadingResult: null | boolean
    avaLoadingMessage: null | string
}

type ImageUploadStateType = {
    avatar: AvatarType
    imgFileName: StringNullType
    cropImg: StringNullType
    inputImg: StringNullType
}


