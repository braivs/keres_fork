import React from 'react'
import s from './Stats.module.scss'

export const Stats = (props: PropsType) => {
    return (
        <div className={s.stats}>
            <div className={props.className}>{props.value1}</div>
            <div className={props.className}>{props.value2}</div>
            <div className={props.className}>{props.value3}</div>
            <div className={props.className}>{props.value4}</div>
        </div>
    )
}

type PropsType = {
    className?: string
    value1: string
    value2: string
    value3: string
    value4: string
}
