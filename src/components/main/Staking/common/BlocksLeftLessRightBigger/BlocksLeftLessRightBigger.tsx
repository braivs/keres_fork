import React from 'react'
import s from './BlocksLeftLessRightBigger.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'

export const BlocksLeftLessRightBigger = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <div className={sC.chartBgColor}>{props.leftText}</div>
        <div className={sC.chartBgColor}>{props.rightNumber}</div>
    </div>
}

type PropsType = {
    className?: string
    leftText: string
    rightNumber: number
}

