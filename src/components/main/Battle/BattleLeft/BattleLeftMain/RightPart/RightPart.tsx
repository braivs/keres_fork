import React from 'react'
import s from './RightPart.module.scss'
import classNames from 'classnames'
import zerah from 'src/assets/image/agents/Zerah.png'

export const RightPart = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <img src={zerah} alt="zerah"/>
    </div>
}

type PropsType = {
    className?: string
}

