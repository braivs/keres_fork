import React, {useEffect, useRef} from 'react'
import s from './MessageViewbox.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {Message} from 'src/components/main/Friends/FriendsRight/MessageViewbox/Message/Message'
import {messagesThunks} from "src/redux/messagesSlice"
import {combinedId} from "src/common/helpers"
import {CircularProgress} from "@mui/material"

export const MessageViewbox = () => {
    const bottomPage = useRef<null | HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const {activeAuthUser} = useAppSelector(state => state.user)
    const chatMessages = useAppSelector(state => state.messages.chatMessages)
    const {loginStatus} = useAppSelector(state => state.auth)
    const {activeFriend} = useAppSelector((state) => state.friends)
    const {messagesLoadingStatus} = useAppSelector(state => state.app)

    useEffect(() => {
        if (activeFriend.userData?.id && activeAuthUser?.uid !== null) {
            const chatId = (activeAuthUser?.uid && activeFriend.userData.id) ? combinedId(activeAuthUser?.uid, activeFriend.userData?.id) : null
            if (chatId !== null) {
                dispatch(messagesThunks.chatMessagesObserver({chatId}))
            }
        }
    }, [activeFriend, activeAuthUser, dispatch])

    useEffect(() => {
        bottomPageRefScroll()
    })

    const bottomPageRefScroll = (behavior: 'auto' | 'smooth' = 'auto') => {
        bottomPage.current && bottomPage.current.scrollIntoView({behavior: behavior, block: 'start'})
    }

    return <div className={s.component}>
        <div className={classNames(s.container, sC.baseBgColor)}>
            {
                activeAuthUser !== null
                    ? loginStatus === 'loggedIn'
                        ? messagesLoadingStatus === 'loading'
                            ? <div className={s.progressContainer}><CircularProgress/></div>
                            : chatMessages !== null
                                ? <>{chatMessages.map(e => <Message
                                    key={e.id}
                                    id={e.id}
                                    text={e.text}
                                    from={e.from}
                                    createdAt={e.createdAt}
                                    mode={e.mode}
                                    filename={e.filename}
                                />)}</>
                                : <>No data</>
                        : <>Please confirm email</>
                    : <div>Please login</div>

            }
        </div>
        {messagesLoadingStatus !== 'loading' && <div className={sC.baseBgColor} ref={bottomPage}/> }
    </div>
}


