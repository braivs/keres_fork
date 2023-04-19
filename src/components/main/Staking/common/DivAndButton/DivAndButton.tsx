import React from 'react'
import s from './DivAndButton.module.scss'
import classNames from 'classnames'
import {StakingButton} from 'src/common/StakingButton/StakingButton'

export const DivAndButton = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <div>{props.outputValue} <span>{props.token}</span></div>
        <StakingButton buttonText={'Claim'} onClick={props.onClick}/>
    </div>
}

type PropsType = {
    className?: string
    onClick: () => void
    outputValue: number
    token: string
}

