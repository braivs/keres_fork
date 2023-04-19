import React from 'react'
import s from './MarketOverlayBodyLeft.module.scss'
import sC from '../common/Styles.module.scss'
import {NFTTier} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyLeft/NFTTier/NFTTier'
import {MainPart} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyLeft/MainPart/MainPart'
import classNames from 'classnames'

export const MarketOverlayBodyLeft = (props: PropsType) => {
    return (
        <div className={classNames(s.component, sC.leftAndRight)}>
            <NFTTier className={props.className}/>
            <MainPart className={props.className}/>
        </div>
    )


}

type PropsType = {
    className?: string
}
