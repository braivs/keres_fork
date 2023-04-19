import React, {useState} from 'react'
import s from './Filters.module.scss'
import sC from '../../common/MarketStyles.module.scss'
import {MarketButton} from 'src/components/main/Marketplace/MarketHeader/common/MarketButton/MarketButton'
import {FilterSelector} from 'src/components/main/Marketplace/MarketHeader/Filters/common/FilterSelector/FilterSelector'

export const Filters = () => {
    const [input, setInput] = useState('')

    return <div className={s.component}>
        <div className={sC.header}>Filters</div>
        <div className={s.container}>
            <MarketButton text={'New'}/>
            <MarketButton text={'Featured'}/>
            <MarketButton text={'Trending'}/>
            <FilterSelector text1={'Price v'} text2={'Price a'} />
            {/*<div>Price v</div>
            <div>Price a</div>*/}
            <MarketButton text={'Favorites'}/>
            <MarketButton text={'Selling'}/>
            <MarketButton text={'History'}/>
            <FilterSelector text1={'Rarirty v'} text2={'Rarirty a'} />
            {/*<div>Rarirty v</div>
            <div>Rarirty a</div>*/}
        </div>
        <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}} placeholder={'search...'}/>
    </div>
}

