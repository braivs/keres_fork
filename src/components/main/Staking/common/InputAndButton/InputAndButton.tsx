import React from 'react'
import s from './InputAndButton.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import {StakingButton} from 'src/common/StakingButton/StakingButton'
import {numberChecker} from "src/common/helpers"

export const InputAndButton = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <input type="text" className={sC.chartBgColor} placeholder={'input amount'} value={props.inputValue} onChange={e => numberChecker(e.target.value, props.setInputValue)}/>
        <StakingButton buttonText={props.buttonText} onClick={props.onClick}/>
    </div>
}

type PropsType = {
    className?: string
    buttonText: string
    onClick: () => void
    inputValue: string
    setInputValue: (value: string) => void
}

