import React from 'react'
import sC from 'src/common/styles/InfoAndLandHeader.module.scss'
import s from './LandHeader.module.scss'
import classNames from 'classnames'

export const LandHeader: React.FC<PropsType> = (props) => {
    return <div className={classNames(sC.component, s.additional)}>
        <div className={s.element}>
            <div>Total Land Plots:</div>
            <div>{props.totalLandPlots}</div>
        </div>
        <div className={s.element}>
            <div>Active Land Plots:</div>
            <div>{props.activeLandPlots}</div>
        </div>
        <div className={s.element}>
            <div>Bullets forged:</div>
            <div>{props.bulletsForged}</div>
        </div>
        <div className={s.element}>
            <div>Ale brewed:</div>
            <div>{props.aleBrewed}</div>
        </div>
        <div className={s.element}>
            <div>Nectar brewed:</div>
            <div>{props.nectarBrewed}</div>
        </div>
    </div>

}

type PropsType = {
    totalLandPlots: number
    activeLandPlots: number
    bulletsForged: string
    aleBrewed: string
    nectarBrewed: string
}