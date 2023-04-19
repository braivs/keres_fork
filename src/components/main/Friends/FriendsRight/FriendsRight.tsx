import React from 'react'
import s from './FriendsRight.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {MessageHeader} from 'src/components/main/Friends/FriendsRight/MessageHeader/MessageHeader'
import {MessageViewbox} from 'src/components/main/Friends/FriendsRight/MessageViewbox/MessageViewbox'
import {NewMessage} from 'src/components/main/Friends/FriendsRight/NewMessage/NewMessage'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const FriendsRight = () => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <MessageHeader className={sC.baseBgColor}/>
        <MessageViewbox/>
        <NewMessage className={sC.baseBgColor}/>
    </div>
}

