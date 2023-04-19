import React from 'react'
import s from './BottomButton.module.scss'
import classNames from 'classnames'

export const BottomButton = (props: PropsType) => {
    return (
        <button className={classNames(s.component, props.className)} onClick={props.onClick}>
            {props.buttonText}
        </button>
    )


}

type PropsType = {
    className?: string
    buttonText: string
    onClick: () => void
}
