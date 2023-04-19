import React from 'react'
import online from 'src/assets/image/tabfriends/online.svg'
import offline from 'src/assets/image/tabfriends/offline.svg'
import {StateType} from "src/common/types"

export const OnlineOfflineIcon = (props: PropsType) => {
    return (
        <img src={props.state === 'online' ? online : offline} alt={props.state === 'online' ? 'online' : 'offline'}
             className={props.className}/>
    )

}

type PropsType = {
    state: StateType
    className?: string
}