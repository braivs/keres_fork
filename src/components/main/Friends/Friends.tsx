import React, {useEffect, useState} from 'react'
import {Info} from 'src/common/Info'
import s from './Friends.module.scss'
import {FriendsLeft} from './FriendsLeft/FriendsLeft'
import {FriendsRight} from 'src/components/main/Friends/FriendsRight/FriendsRight'
import {useAppSelector} from "src/hooks/hooks"

export const Friends = () => {
    const [isChatMode, setIsChatMode] = useState(false)
    const {is1200pxMode} = useAppSelector(state => state.app)

    const {activeFriend} = useAppSelector((state) => state.friends)

    useEffect(() => {
        activeFriend.userData?.id ? setIsChatMode(true) : setIsChatMode(false)
    }, [activeFriend])

    return <div className={s.component}>
        <div className={s.container}>
            {
                !is1200pxMode && <>
                <FriendsLeft/>
                <FriendsRight/>
              </>
            }
            {is1200pxMode && <>
                {isChatMode ? <FriendsRight/> : <FriendsLeft/>}</>
            }
        </div>
        <Info/>
    </div>
}

