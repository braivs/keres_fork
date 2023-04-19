import React from 'react'
import s from './FriendsLeft.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {FriendsList} from './FriendsList/FriendsList'
import {OnlineMenu} from 'src/components/main/Friends/FriendsLeft/OnlineMenu/OnlineMenu'
import {AddNewFriend} from 'src/components/main/Friends/FriendsLeft/AddNewFriend/AddNewFriend'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const FriendsLeft = () => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <OnlineMenu className={sC.baseBgColor}/>
        <FriendsList className={sC.baseBgColor}/>
        <AddNewFriend className={sC.baseBgColor}/>
    </div>
}