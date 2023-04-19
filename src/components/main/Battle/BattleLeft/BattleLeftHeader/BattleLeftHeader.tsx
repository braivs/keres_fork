import React from 'react'
import s from './BattleLeftHeader.module.scss'
import classNames from 'classnames'

export const BattleLeftHeader = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>

        Battle Arena
    </div>
}

type PropsType = {
    className?: string
}

