import React from 'react'
import s from './LandGridRow.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import cn from 'classnames'
import {numberChecker} from "src/common/helpers"

export const LandGridRow = (props: PropsType) => {
    return <div className={cn(s.gridRow, props.thirdValueType === 'none' && s.noneThirdValue)}>
        <div className={sC.baseBgColor}>{props.firstValue}</div>
        {props.thirdValueType === 'button'
            ? <input className={sC.baseBgColor} type="text" placeholder={props.secondValue} value={props.inputValue}
                     onChange={(e) => {
                         props.setInputValue
                             ? numberChecker(e.target.value, props.setInputValue)
                             : alert('you need to transfer setInputValue')
                     }}/>
            : <div className={sC.baseBgColor}>{props.secondValue}</div>
        }
        {props.thirdValueType === 'button'
            ? <button onClick={() => props.onClickButton ? props.onClickButton() : {}
            }>{props.thirdValue}
            </button>
            : props.thirdValueType !== 'none' &&
          <div className={props.thirdValueType === 'complete' ? s.complete : s.inProgress}>{props.thirdValue}</div>
        }
    </div>
}

type PropsType = {
    firstValue: string
    secondValue: string
    thirdValueType: 'button' | 'complete' | 'in progress' | 'none'
    thirdValue: string
    onClickButton?: (value?: string) => void
    inputValue?: string
    setInputValue?: (value: string) => void;
}