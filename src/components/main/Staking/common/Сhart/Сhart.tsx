import React from 'react'
import s from './Сhart.module.scss'
import classNames from 'classnames'
import KeresLogo from 'src/assets/image/tokens/keres.svg'
import HydroLogo from 'src/assets/image/tokens/hydro.svg'

export const Chart = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <img className={s.chartImg} src={props.chartImg} alt="chartImg"/>
        <div className={s.conversionWay}>{props.conversionWay}</div>
        <img className={classNames(s.logoImg, props.token === 'Keres' ? s.logoImgKeres : s.logoImgHydro)}
             src={props.token === 'Keres' ? KeresLogo : HydroLogo} alt="logoImg"/>
    </div>
}

type PropsType = {
    className?: string
    conversionWay: string
    chartImg: string
    token: 'Keres' | 'Hydro'
}

