import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {MessageType} from "src/common/types"
import {collection, onSnapshot, orderBy, query} from "firebase/firestore"
import {db} from "src/firebase"
import {RootStateType} from "src/redux/store"
import {firebaseAPI} from "src/api/firebaseAPI"
import {RequestStatusType, setMessagesLoadingStatus} from "src/redux/appSlice"

const initialState: MessagesInitialStateType = {
    chatMessages: null,
    textAreaValue: '',
    newMessageSendStatus: 'idle',
    messagesMode: "text"
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setChatMessages(state, action: PayloadAction<{ messages: null | Array<MessageType> }>) {
            state.chatMessages = action.payload.messages
        },
        setTextAreaValue(state, action: PayloadAction<{ text: string }>) {
            state.textAreaValue = action.payload.text
        },
        setNewMessageSendStatus(state, action: PayloadAction<{ messagesStatus: RequestStatusType }>) {
            state.newMessageSendStatus = action.payload.messagesStatus
        },
        setMessagesMode(state, action: PayloadAction<MessagesModeType>) {
            state.messagesMode = action.payload
        }
    }
})

const sendMessage = createAsyncThunk(
    'user/sendMessage',
    async (param: { chatId: string | null, friendshipId: string | null, isImg: boolean, imgUrl: null | string }, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType
        const friendId = state.friends.activeFriend.userData?.id
        const activeUser = state.user.activeAuthUser
        const textAreaValue = state.messages.textAreaValue

        if (textAreaValue.trim() !== '' || param.isImg) { // if message text not empty or img mode
            if (param.chatId !== null && friendId && activeUser !== null && activeUser !== undefined) {
                thunkAPI.dispatch(setNewMessageSendStatus({messagesStatus: 'loading'}))
                if (!param.isImg) { // text mode
                    await firebaseAPI.sendMessage({
                        to: friendId,
                        from: activeUser?.uid,
                        text: textAreaValue
                    }, param.chatId, "text", null)
                    thunkAPI.dispatch(setTextAreaValue({text: ''}))
                } else { // img mode
                    await firebaseAPI.sendMessage({
                        to: friendId,
                        from: activeUser?.uid,
                        text: ''
                    }, param.chatId, "image", param.imgUrl)
                    thunkAPI.dispatch(setMessagesMode("text"))
                }
                if (param.friendshipId && activeUser?.uid) {
                    try {
                        await firebaseAPI.changeMessagesUnreadStatus(param.friendshipId, activeUser.uid, true) // writing unread status
                    } catch (e: any) {
                        console.error('messagesSlice: sendMessage error, after firebaseAPI.changeMessagesUnreadStatus: ' + e.message)

                    } finally {
                        thunkAPI.dispatch(setNewMessageSendStatus({messagesStatus: 'succeeded'}))
                    }
                }
            }
        }

    }
)

const chatMessagesObserver = createAsyncThunk(
    'messages/chatMessagesObserver',
    async (param: { chatId: string }, thunkAPI) => {
        const chatRef = collection(db, 'messages', param.chatId, 'chat')
        try {
            const q = query(chatRef, orderBy('createdAt'))
            thunkAPI.dispatch(setMessagesLoadingStatus("loading"))
            onSnapshot(q, (querySnapshot) => { /*todo: move to API*/
                let messages: Array<MessageType> = []

                querySnapshot.forEach((doc) => {
                    messages.push(doc.data() as MessageType)
                })
                thunkAPI.dispatch(setChatMessages({messages}))
                thunkAPI.dispatch(setMessagesLoadingStatus("succeeded"))
            })
        } catch (e: any) {
            console.error('handleGetMessagesRequestCloud')
        }
    }
)

export const {setChatMessages, setTextAreaValue, setNewMessageSendStatus, setMessagesMode} = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer
export const messagesThunks = {chatMessagesObserver, sendMessage}

type MessagesModeType = 'text' | 'image'
export type MessagesInitialStateType = {
    chatMessages: null | Array<MessageType>
    textAreaValue: string
    newMessageSendStatus: RequestStatusType
    messagesMode: MessagesModeType
}
