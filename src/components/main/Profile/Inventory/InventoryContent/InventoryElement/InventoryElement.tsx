import React, {FC} from 'react'
import sC from 'src/common/styles/Common.module.scss'
import {InventoryElementType} from 'src/common/types'

export const InventoryElement: FC<PropsType> = (props) => {
    return <div className={props.className}>
        {props.initialData.map(e => <div key={e.id} className={sC.baseBgColor}>
            <img src={e.value} alt=""/>
        </div>)}
    </div>

}

type PropsType = {
    className: string
    initialData: Array<InventoryElementType>

}
