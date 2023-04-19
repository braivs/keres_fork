import React, {FC} from 'react'
import s from './PlayerCard.module.scss'
import classNames from 'classnames'
import {PlayerType} from 'src/common/types'

export const PlayerCard: FC<PropsType> = (props) => {
    return <div className={classNames(s.component, props.className, props.result === 'win' ? s.winBackground : s.loseBackground)}>
        <div className={s.leftPart}>
            <img className={s.ava} src={props.ava} alt=""/>
            <div className={s.mapContainer}>
                <div className={s.mapName}>{props.map.name}</div>
                <div className={s.score}>
                    <span className={s.left}>{props.map.score.left}</span> - <span className={s.right}>{props.map.score.right}</span>
                </div>
            </div>
        </div>
        <div className={s.rightPart}>
            <div className={s.KDA}>
                <div className={s.kdaHeader}>K / D / A</div>
                <div className={s.kdaStats}>{props.K} / {props.D} / {props.A}</div>
            </div>
            <img className={s.ratingImg} src={props.ratingImg} alt=""/>
        </div>
        <div className={classNames(s.border, props.result === 'win' ? s.borderWin : s.borderLoose)}/>
    </div>
}

type PropsType = PlayerType & {
    className?: string
}

