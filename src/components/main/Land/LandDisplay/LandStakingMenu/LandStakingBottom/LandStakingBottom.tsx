import React from 'react'
import s from './LandStakingBottom.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'

export const LandStakingBottom = (props: PropsType) => {
    return <div className={s.component}>
        <button onClick={props.onClaimClick}>
            Claim
        </button>
        <div className={classNames(sC.baseBgColor, s.stats)}>
            <div><span>Bullets:</span>{props.bullets} / day</div>
            <div><span>Ale:</span>{props.ale}L / day</div>
            <div><span>Nectar:</span>{props.nectar}L / day</div>
        </div>
    </div>
}

type PropsType = {
    onClaimClick: () => void
    bullets: number
    ale: number
    nectar: number
}

