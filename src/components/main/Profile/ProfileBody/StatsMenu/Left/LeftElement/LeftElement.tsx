import React, {FC, ReactNode} from 'react'
import s from './LeftElement.module.scss'

export const LeftElement: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        {props.children}
    </div>

}

type PropsType = {
    className?: string
    children: ReactNode;
}


