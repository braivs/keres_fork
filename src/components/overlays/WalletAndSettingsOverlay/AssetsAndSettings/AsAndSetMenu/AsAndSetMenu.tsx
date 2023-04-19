import React from 'react'
import s from './AsAndSetMenu.module.scss'
import cn from 'classnames'
import {useDispatch} from 'react-redux'
import {setOverlayWalletAndSettingsCurrentValue} from 'src/redux/overlaySlice'
import {useAppSelector} from 'src/hooks/hooks'

export const AsAndSetMenu = () => {
    const dispatch = useDispatch()
    const currentValue = useAppSelector((state) => state.overlay.walletAndSettings.currentValue)


    return <div className={s.component}>
        <div
            className={cn(s.menuComponent, currentValue === 'assets' ? s.active : s.passive)}
            onClick={() => {dispatch(setOverlayWalletAndSettingsCurrentValue({currentValue: 'assets'}))}}>
            Assets
        </div>
        <div
            className={cn(s.menuComponent, currentValue === 'settings' ? s.active : s.passive)}
            onClick={() => {dispatch(setOverlayWalletAndSettingsCurrentValue({currentValue: 'settings'}))}}>
            Settings
        </div>
    </div>
}