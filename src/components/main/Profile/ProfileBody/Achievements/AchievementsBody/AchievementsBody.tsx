import React, {FC} from 'react'
import s from './AchievementsBody.module.scss'

export const AchievementsBody: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        <div className={s.container}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </div>
}

type PropsType = {
    className?: string
}