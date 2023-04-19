import React from 'react'
import s from './Notification.module.scss'
import sC from '../../../../common/styles/Common.module.scss'
import classNames from 'classnames'

export const Notification = () => {
    return <div className={classNames(s.component, sC.baseBgColor)}>
        notification
    </div>



}