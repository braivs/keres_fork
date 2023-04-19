import React from 'react'
import s from './Marketplace.module.scss'
import {MarketHeader} from 'src/components/main/Marketplace/MarketHeader/MarketHeader'
import {MarketBody} from 'src/components/main/Marketplace/MarketBody/MarketBody'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const Marketplace = () => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <MarketHeader />
        <MarketBody />
    </div>
}

