import React from 'react'
import s from './MarketAgentWeaponOverlay.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {useDispatch} from 'react-redux'
import {setOverlayAgentWeaponShow} from 'src/redux/overlaySlice'
import {
    MarketOverlayHeader
} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayHeader/MarketOverlayHeader'
import {MarketOverlayBody} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBody'
import {
    MarketOverlayBottom
} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBottom/MarketOverlayBottom'
import {useAppSelector} from 'src/hooks/hooks'
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const MarketAgentWeaponOverlay = () => {

    const show = useAppSelector((state) => state.overlay.marketAgentWeapon.show)

    const dispatch = useDispatch()

    if (!show) return null

    const onCloseOverlay = () => {
        dispatch(setOverlayAgentWeaponShow({show: false, selectedItemId: ''}))
    }

    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={s.overlayContainer}
                       isCloseIconHidden={true}>
            <MarketOverlayHeader className={sC.baseBgColor}/>
            <MarketOverlayBody className={sC.baseBgColor}/>
            <MarketOverlayBottom className={sC.baseBgColor}/>
        </CommonOverlay>
    )


}

