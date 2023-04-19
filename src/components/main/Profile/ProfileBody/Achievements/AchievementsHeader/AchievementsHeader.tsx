import React, {FC} from 'react'
import s from './AchievementsHeader.module.scss'

export const AchievementsHeader: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        Achievements
    </div>
}

type PropsType = {
    className?: string
}