import React, {FC} from 'react'
import s from './InventoryContent.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {InventoryDataType} from 'src/common/types'
import {InventoryElement} from 'src/components/main/Profile/Inventory/InventoryContent/InventoryElement/InventoryElement'
import {CommonHeader} from "src/components/main/Profile/Inventory/CommonHeader/CommonHeader"
import {useAppSelector} from "src/hooks/hooks"

export const InventoryContent: FC<PropsType> = (props) => {

    const {is1200pxMode} = useAppSelector(state => state.app)

    return <div className={s.component}>
        {is1200pxMode && <CommonHeader title={'Weapons'} className={sC.baseBgColor}/>}
        <InventoryElement className={s.weapons} initialData={props.initialData.weapons}/>
        {is1200pxMode && <CommonHeader title={'Agents'} className={sC.baseBgColor}/>}
        <InventoryElement className={s.agents} initialData={props.initialData.agents}/>
        {is1200pxMode && <CommonHeader title={'Sidekicks'} className={sC.baseBgColor}/>}
        <InventoryElement className={s.sidekicksGearLand} initialData={props.initialData.sidekicks}/>
        {is1200pxMode && <CommonHeader title={'Gear'} className={sC.baseBgColor}/>}
        <InventoryElement className={s.sidekicksGearLand} initialData={props.initialData.gears}/>
        {is1200pxMode && <CommonHeader title={'Land'} className={sC.baseBgColor}/>}
        <InventoryElement className={s.sidekicksGearLand} initialData={props.initialData.lands}/>
    </div>
}

type PropsType = {
    initialData: InventoryDataType
}