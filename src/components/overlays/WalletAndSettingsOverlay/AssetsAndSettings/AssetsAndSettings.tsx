import React from 'react'
import s from './AssetsAndSettings.module.scss'
import {AsAndSetMenu} from './AsAndSetMenu/AsAndSetMenu'
import {AssetsContent} from './AssetsContent/AssetsContent'
import {useAppSelector} from 'src/hooks/hooks'

export const AssetsAndSettings = () => {
    const currentValue = useAppSelector((state) => state.overlay.walletAndSettings.currentValue)


    return <div className={s.component}>
        <AsAndSetMenu />
        { currentValue === 'assets' && <AssetsContent /> }
    </div>



}