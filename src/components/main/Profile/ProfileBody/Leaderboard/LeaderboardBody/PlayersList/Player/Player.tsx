import React, {FC} from 'react'
import s from './Player.module.scss'
import classNames from 'classnames'

export const Player: FC<PropsType> = (props) => {
    return (
        <div className={s.player}>
            <div className={classNames(s.playerNumber, props.className)}>{props.number}</div>
            <div className={s.playerName}>{props.name}</div>
        </div>
    )
}

type PropsType = {
    number: number
    name: string
    className?: string
}