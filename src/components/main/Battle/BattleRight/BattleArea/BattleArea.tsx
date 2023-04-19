import React from 'react'
import s from './BattleArea.module.scss'
import classNames from 'classnames'
import {CommonButton} from 'src/common/CommonButton/CommonButton'

export const BattleArea = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <CommonButton className={s.additionalButtonStyles}>Battle</CommonButton>
    </div>
}

type PropsType = {
    className?: string
}

