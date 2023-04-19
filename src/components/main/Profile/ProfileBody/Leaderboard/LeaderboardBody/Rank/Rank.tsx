import React, {FC} from 'react'
import s from './Rank.module.scss'

export const Rank: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        <div>Rank</div>
        <div>{props.rankPosition}</div>
    </div>
}

type PropsType = {
    className?:  string
    rankPosition: number
}