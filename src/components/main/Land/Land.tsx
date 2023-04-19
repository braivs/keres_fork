import React, {useState} from 'react'
import s from './Land.module.scss'
import {LandHeader} from 'src/components/main/Land/LandHeader/LandHeader'
import {LandDisplay} from 'src/components/main/Land/LandDisplay/LandDisplay'
import {v1} from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component'
import {lands} from 'src/localData/localData'
import {fetchMoreDataAPI} from 'src/api/fakeAPI'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"
import {LandType} from "src/common/types"

export const Land = () => {
    const [state, setState] = useState<LandType[]>(lands)
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    const fetchMoreData = () => {
        const blankValue = {id: v1(), plotNumber: 0, plotImg: '', tokenId: '', bullets: 0, ale: 0, nectar: 0}
        fetchMoreDataAPI<LandType>(setState, state, blankValue)
    }

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <LandHeader totalLandPlots={3} activeLandPlots={3} bulletsForged={'9 / day'} aleBrewed={'0.9L / Day'}
                    nectarBrewed={'0.9L / Day'}/>
        <div id="scrollableDiv" style={{height: '82vh', overflow: 'auto'}}>
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
            >
                {
                    state.map(e => <LandDisplay key={e.id} plotNumber={e.plotNumber} plotImg={e.plotImg}
                                                tokenId={e.tokenId} bullets={e.bullets} ale={e.ale} nectar={e.nectar}/>)
                }
            </InfiniteScroll>
        </div>
    </div>
}

