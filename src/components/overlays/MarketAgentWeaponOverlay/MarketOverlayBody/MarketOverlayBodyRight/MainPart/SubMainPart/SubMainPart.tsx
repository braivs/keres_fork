import React from 'react'
import s from './SubMainPart.module.scss'
import classNames from 'classnames'

export const SubMainPart = (props: PropsType) => {
    return (
        <div className={s.component}>
            <div className={classNames(props.className, s.header)}>
                {props.header}
            </div>
            <div className={classNames(props.className, s.body)}/>

        </div>
    )


}

type PropsType = {
    className?: string
    header: string
}
