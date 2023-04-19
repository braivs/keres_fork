import React from 'react'
import s from './Header.module.scss'
import classNames from 'classnames'

export const Header = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        {props.text}
    </div>
}

type PropsType = {
    className?: string
    text: string
}

