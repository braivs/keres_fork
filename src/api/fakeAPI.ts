import {InventoryDataType, LandType, MarketItemType} from 'src/common/types'
import React, {Dispatch} from "react"

// a fake async api call like which sets new values in 1.5 secs
export const fetchMoreDataAPI = <T extends FetchDataType>(
    setInputData: Dispatch<React.SetStateAction<T[]>>,
    inputData: T[],
    blankValue: T,
    isMarketMode = false
) => {

    setTimeout(() => {
        !isMarketMode
            ? setInputData([
                ...inputData, {...blankValue}
            ])
            : setInputData([
                ...inputData, {...blankValue},
                {...blankValue, id: blankValue.id + '1'},
                {...blankValue, id: blankValue.id + '2'},
                {...blankValue, id: blankValue.id + '3'},
                {...blankValue, id: blankValue.id + '4'},
                {...blankValue, id: blankValue.id + '5'}
            ])
    }, 1500)
}

type FetchDataType = InventoryDataType | LandType | MarketItemType