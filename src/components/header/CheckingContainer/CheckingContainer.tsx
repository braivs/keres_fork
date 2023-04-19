import React from 'react'
import s from "./CheckingContainer.module.scss"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import cn from 'classnames'

export const CheckingContainer = (props: PropsType) => {
    return (
        <div className={cn(s.checkingContainer, props.className)}>
            <div className={s.text}>{props.text}</div>
            <div className={s.cont}>
                <BriLinearProgress show={true}/>
            </div>
        </div>
    )
}

type PropsType = {
    text: string
    className?: string
}