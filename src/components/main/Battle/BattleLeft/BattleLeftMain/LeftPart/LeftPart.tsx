import React from 'react'
import s from './LeftPart.module.scss'
import classNames from 'classnames'
import sC from 'src/common/styles/Common.module.scss'

export const LeftPart = () => {
    return <div className={classNames(s.component)}>
        <div className={sC.baseBgColor}/>
        <div className={sC.baseBgColor}/>
        <div className={sC.baseBgColor}/>
    </div>
}