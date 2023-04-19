import React, {useState} from 'react'
import s from './InventoryOverlay.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {CommonOverlayBackground} from 'src/common/CommonOverlayBackground/CommonOverlayBackground'
import {useDispatch} from 'react-redux'
import {setOverlayInventoryShow} from 'src/redux/overlaySlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Inventory} from 'src/components/main/Profile/Inventory/Inventory'
import {blankInventoryElement, InventoryData} from 'src/localData/localData'
import {InventoryDataType} from 'src/common/types'
import {v1} from 'uuid'
import {CommonHeader} from 'src/components/main/Profile/Inventory/CommonHeader/CommonHeader'
import cn from 'classnames'
import {fetchMoreDataAPI} from 'src/api/fakeAPI'
import {useAppSelector} from 'src/hooks/hooks'

export const InventoryOverlay = () => {
    const dispatch = useDispatch()
    const inventoryShow = useAppSelector((state) => state.overlay.inventoryShow)

    const [inputData, setInputData] = useState(InventoryData)

    const onClickOverlay = () => {
        dispatch(setOverlayInventoryShow({inventoryShow: false}))
    }

    const fetchMoreData = () => {
        const blankValue: InventoryDataType = {
            id: v1(), ...blankInventoryElement
        }

        fetchMoreDataAPI<InventoryDataType>(setInputData, inputData, blankValue)
    }

    if (!inventoryShow) return null
    return (
        <CommonOverlayBackground onClick={onClickOverlay} className={cn(s.component, sC.cursorPointer)}>
            <CommonOverlayBackground className={sC.baseBgColor} isSecondUse={true}>
                <div className={cn(s.component)}>
                    <CommonHeader title={'Inventory'} className={cn(sC.baseBgColor, s.inventoryHeader, sC.cursorAuto)}
                                  onClick={e => e.stopPropagation()} showCloseIcon={true}
                                  closeIconAction={onClickOverlay}/>
                    <div id="scrollableDiv" style={{height: '85vh', overflow: 'auto'}}
                         onClick={e => e.stopPropagation()} className={sC.cursorAuto}>
                        <InfiniteScroll
                            dataLength={inputData.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            <Inventory version={'overlay'} inputData={inputData}/>
                        </InfiniteScroll>
                    </div>
                </div>
            </CommonOverlayBackground>
        </CommonOverlayBackground>
    )
}