import React from 'react'
import s from './MarketOverlayBodyRight.module.scss'
import sC from '../common/Styles.module.scss'
import classNames from 'classnames'
import {AbilitiesOrSpecialEffects} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyRight/AbilitiesOrSpecialEffects/AbilitiesOrSpecialEffects'
import {MainPart} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyRight/MainPart/MainPart'

export const MarketOverlayBodyRight = (props: PropsType) => {
    return (
        <div className={classNames(s.component, sC.leftAndRight)}>
            <AbilitiesOrSpecialEffects className={props.className}/>
            <MainPart className={props.className}/>
        </div>
    )
}

type PropsType = {
    className?: string
}
