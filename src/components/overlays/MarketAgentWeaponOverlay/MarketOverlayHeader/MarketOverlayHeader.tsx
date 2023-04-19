import React from 'react'
import s from './MarketOverlayHeader.module.scss'
import classNames from 'classnames'
import close from 'src/assets/image/close.svg'
import {useDispatch} from 'react-redux'
import {setOverlayAgentWeaponShow} from 'src/redux/overlaySlice'
import {marketData} from 'src/localData/localData'
import {useAppSelector} from 'src/hooks/hooks'

export const MarketOverlayHeader = (props: PropsType) => {
    const selectedItemId = useAppSelector((state) => state.overlay.marketAgentWeapon.selectedItemId)
    const dispatch = useDispatch()

    const item = marketData.find(e => e.id === selectedItemId)

    const onCloseOverlay = () => {
        dispatch(setOverlayAgentWeaponShow({show: false, selectedItemId: ''}))
    }

    return (
        <div className={classNames(props.className, s.component)}>
            {
                item && <>
                    {item.itemName}
                    <img className={s.imgClose} src={close} alt="close" onClick={onCloseOverlay}/>
                </>
            }

        </div>
    )


}

type PropsType = {
    className?: string
}
