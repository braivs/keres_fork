import React from 'react'
import s from './PriceMarketTotal.module.scss'
import classNames from 'classnames'
import {PriceMarketTotalDataType} from 'src/common/types'
import {v1} from 'uuid'

export const PriceMarketTotal = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        {props.inputData.map(e => <div key={v1()} className={s.element}>
            <div>{e.value1}</div>
            <div>{e.value2}</div>
        </div>)}
    </div>
}

type PropsType = {
    className?: string
    inputData: PriceMarketTotalDataType
}

