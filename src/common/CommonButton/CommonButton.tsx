import React from 'react'
import cn from 'classnames'
import sC from 'src/common/styles/Common.module.scss'
import s from './CommonButton.module.scss'
import {Tooltip} from "@mui/material"

export const CommonButton: React.FC<PropsType> = (props) => {
    return (
        <div className={cn(s.commonButton, props.classNameContainer)}
             onClick={!props.isDisabled ? props.onClick : () => {
             }}>
            <Tooltip title={props.tooltipText && !props.isDisabled ? props.tooltipText : ''} placement="top">
                <button className={cn(s.addButton, sC.baseBgColor, props.className, props.isDisabled && s.isDisabled)}
                        type={props.type}>
                    {props.children}
                </button>
            </Tooltip>
        </div>
    )
}

type PropsType = {
    className?: string
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
    isDisabled?: boolean
    classNameContainer?: string
    tooltipText?: string
}