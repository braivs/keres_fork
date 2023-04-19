import React from 'react'
import s from './MarketOverlayBody.module.scss'
import {MarketOverlayBodyLeft} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyLeft/MarketOverlayBodyLeft'
import {MarketOverlayBodyRight} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyRight/MarketOverlayBodyRight'

export const MarketOverlayBody = (props: PropsType) => {
    return (
        <div className={s.component}>
            <MarketOverlayBodyLeft className={props.className}/>
            <MarketOverlayBodyRight className={props.className}/>
        </div>
    )
}

type PropsType = {
    className?: string
}
