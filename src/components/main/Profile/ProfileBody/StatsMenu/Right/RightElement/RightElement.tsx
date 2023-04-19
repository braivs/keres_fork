import React, {FC} from 'react'
import s from './RightElement.module.scss'

export const RightElement: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        <div className={s.firstText}>{props.firstText}</div>
        <div className={s.secondText}>{props.secondText}</div>
    </div>

}

type PropsType = {
    className?: string
    firstText: string
    secondText: string
}


