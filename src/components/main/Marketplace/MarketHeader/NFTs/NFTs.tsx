import React from 'react'
import s from './NFTs.module.scss'
import sC from 'src/components/main/Marketplace/common/MarketStyles.module.scss'
import {MarketButton} from 'src/components/main/Marketplace/MarketHeader/common/MarketButton/MarketButton'

export const NFTs = () => {
    return <div className={s.component}>
        <div className={sC.header}>NFTS</div>
        <div className={s.container}>
            <MarketButton text={'Weapons'}/>
            <MarketButton text={'Agents'}/>
            <MarketButton text={'Gear'}/>
            <MarketButton text={'Sidekicks'}/>
            <MarketButton text={'Land'}/>
            <MarketButton text={'Titles'}/>
            <MarketButton text={'Xylium'}/>
            <MarketButton text={'Xantor'}/>
            <MarketButton text={'Weiznig'}/>
            <MarketButton text={'Kralukur'}/>
            <MarketButton text={'Trixaz'}/>
            <MarketButton text={'Veintur'}/>
            <MarketButton text={'NFT Tiers'}/>
            <div className={s.volume}><span>24h Volume:</span> 17790 sales / 734899 USD</div>
        </div>

    </div>
}

