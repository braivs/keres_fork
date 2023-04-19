import React, {useState} from 'react'
import s from './MarketBody.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {StandartCard} from 'src/components/main/Marketplace/MarketBody/StandartCard/StandartCard'
import {marketData} from 'src/localData/localData'
import {v1} from 'uuid'
import {MarketItemType} from 'src/common/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import {fetchMoreDataAPI} from 'src/api/fakeAPI'

export const MarketBody = () => {

    const [state, setState] = useState(marketData)

    const fetchMoreData = () => {
        const blankValue: MarketItemType = {
            id: v1(),
            itemName: '',
            secondHeader: '',
            mainImg: '',
            price: 0,
            nftTier: 'Xylium',
            type: 'blank'
        }

        fetchMoreDataAPI<MarketItemType>(setState, state, blankValue, true)
    }

    return <div id="scrollableDiv" style={{height: '74vh', overflow: 'auto'}}>

        <InfiniteScroll
            dataLength={state.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            endMessage={
                <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            className={s.component}
        >
            {
                state.map(e => <StandartCard
                    key={e.id}
                    id={e.id}
                    className={sC.baseBgColor}
                    itemName={e.itemName}
                    secondHeader={e.secondHeader}
                    mainImg={e.mainImg}
                    price={e.price}
                    nftTier={e.nftTier}
                    type={e.type}
                />)
            }
        </InfiniteScroll>
    </div>
}

