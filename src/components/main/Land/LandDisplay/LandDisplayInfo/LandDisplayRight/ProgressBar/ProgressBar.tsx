import React, {CSSProperties} from 'react'
import s from './ProgressBar.module.scss'

export function ProgressBar(props: PropsType) {

    const fillerStyles: CSSProperties = {
        width: `${props.completed}%`,
    }

    return (
        <div className={s.container}>
            <div className={s.filler} style={fillerStyles} >
                <span className={s.label}>{props.completed}%</span>
            </div>
        </div>
    )
}

type PropsType = {
    completed: number
}