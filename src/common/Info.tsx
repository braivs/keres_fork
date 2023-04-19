import React from 'react'
import sC from 'src/common/styles/InfoAndLandHeader.module.scss'
import {useAppSelector} from "src/hooks/hooks"

export const Info = () => {
    const {isElementsBlocked, reason} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={sC.component}>
        {isElementsBlocked
            ? <div>{reason}</div>
            : <>
                <div>Info</div>
                <div>Info</div>
                <div>Info</div>
                <div>Info</div>
                <div>Info</div>
                <div>Info</div>
            </>}

    </div>

}