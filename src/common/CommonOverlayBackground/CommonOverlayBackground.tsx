import React from 'react'
import s from './CommonOverlayBackground.module.scss'
import classNames from 'classnames'

export const CommonOverlayBackground: React.FC<PropsType> = (props) => {
    return <div className={classNames(s.overlayBackground, props.className, !props.isSecondUse ? s.isMain : '')} onClick={props.onClick}>
        {props.children}
    </div>
}

type PropsType = {
    onClick?: React.MouseEventHandler
    className?: string
    isSecondUse?: boolean
}
