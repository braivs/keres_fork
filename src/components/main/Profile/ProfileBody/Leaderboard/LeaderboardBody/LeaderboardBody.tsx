import React, {FC} from 'react'
import s from './LeaderboardBody.module.scss'
import {PlayersList} from './PlayersList/PlayersList'
import {Rank} from './Rank/Rank'

export const LeaderboardBody: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        <PlayersList/>
        <Rank rankPosition={5435}/>
    </div>

}
type PropsType = {
    className?: string
}