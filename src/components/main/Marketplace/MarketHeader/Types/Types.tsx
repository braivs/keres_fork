import React from 'react'
import s from './Types.module.scss'
import sC from '../../common/MarketStyles.module.scss'
import {MarketButton} from 'src/components/main/Marketplace/MarketHeader/common/MarketButton/MarketButton'

export const Types = () => {
    return <div className={s.component}>
        <div className={sC.header}>Types</div>
        <div className={s.container1}>
            <MarketButton text={'Mercenary'}/>
            <MarketButton text={'Guardian'}/>
            <MarketButton text={'Instigator'}/>
            <MarketButton text={'Regulator'}/>
        </div>
        <div className={s.container2}>
            <MarketButton text={'Knife'}/>
            <MarketButton text={'Sidearm'}/>
            <MarketButton text={'SMG'}/>
            <MarketButton text={'Shotgun'}/>
            <MarketButton text={'Rifle'}/>
            <MarketButton text={'Sniper'}/>
            <MarketButton text={'Rocket'}/>
        </div>
        <div className={s.container3}>
            <MarketButton text={'Armour'}/>
            <MarketButton text={'Helmet'}/>
            <MarketButton text={'Gloves'}/>
        </div>
    </div>
}

