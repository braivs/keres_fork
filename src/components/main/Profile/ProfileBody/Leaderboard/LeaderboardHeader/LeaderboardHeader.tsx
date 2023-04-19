import React, {FC} from 'react'
import s from './LeaderboardHeader.module.scss'

export const LeaderboardHeader: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        Leaderboard
    </div>
}

type PropsType = {
    className?: string
}