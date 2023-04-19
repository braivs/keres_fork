import React from 'react'
import s from './MarketHeader.module.scss'
import {NFTs} from 'src/components/main/Marketplace/MarketHeader/NFTs/NFTs'
import {Types} from 'src/components/main/Marketplace/MarketHeader/Types/Types'
import {Filters} from 'src/components/main/Marketplace/MarketHeader/Filters/Filters'

export const MarketHeader = () => {
    return <div className={s.component}>
        <NFTs />
        <Types />
        <Filters />
    </div>
}

