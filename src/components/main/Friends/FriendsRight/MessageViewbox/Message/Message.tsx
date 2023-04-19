import React, {useState} from 'react'
import s from './Message.module.scss'
import classNames from 'classnames'
import {MessageType} from 'src/common/types'
import sC from 'src/common/styles/Common.module.scss'
import {useAppSelector} from 'src/hooks/hooks'
import {CircularProgress} from "@mui/material"
import cn from "classnames"
import {Timestamp} from "@firebase/firestore-types"

export const Message = (props: PropsType) => {
    const activeAuthUser = useAppSelector(state => state.user.activeAuthUser)

    const [isImgLoading, setIsImgLoading] = useState(true)
    const imgOnLoad = () => {
        setIsImgLoading(false)
    }

    const getTime = () => {
        if (props.createdAt === null) {
            return 'getting timestamp'
        } else {
            try {
                return (props.createdAt as Timestamp).toDate().toDateString() + " " + (props.createdAt as Timestamp).toDate().toLocaleTimeString()
            } catch (e: any) {
                return 'timestamp error'
            }
        }
    }

    return (
        <div
            className={classNames(s.component, props.className, sC.baseBgColor, props.from === activeAuthUser?.uid ? s.outMessage : s.inMessage)}>
            {props.mode === 'text' || !props.mode
                ? <>
                    <div className={s.messageText}>{props.text}</div>
                    <div className={s.createdAt}>{getTime()}</div>
                </>
                : <>
                    <>
                        {isImgLoading && <div className={s.progressContainer}>
                          <CircularProgress/>
                        </div>}
                        {props.filename &&
                          <img className={cn(s.img, isImgLoading ? sC.hiddenImg : '')} src={props.filename}
                               alt={'chatImg'}
                               onLoad={imgOnLoad}/>}

                    </>
                    <div className={s.createdAt}>{getTime()}</div>
                </>}
        </div>
    )
}

type PropsType = Omit<MessageType, 'friendId' | 'userId' | 'to'> & {
    className?: string
}