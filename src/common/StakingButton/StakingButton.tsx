import React from 'react'
import s from './StakingButton.module.scss'
import classNames from 'classnames'

export const StakingButton = (props: PropsType) => {
    return <button className={classNames(s.component, props.className)} onClick={props.onClick}>{props.buttonText}</button>
}

type PropsType = {
    className?: string
    buttonText: string
    onClick: () => void
}


