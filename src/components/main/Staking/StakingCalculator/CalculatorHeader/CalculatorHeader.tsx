import React from 'react'
import s from './CalculatorHeader.module.scss'
import classNames from 'classnames'

export const CalculatorHeader = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        Staking calculator
    </div>
}

type PropsType = {
    className?: string
}
