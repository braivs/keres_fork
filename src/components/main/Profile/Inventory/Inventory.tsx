import React from 'react'
import sC from 'src/common/styles/Common.module.scss'
import sCI from 'src/common/styles/CommonInventory.module.scss'
import {useDispatch} from 'react-redux'
import {setOverlayInventoryShow} from 'src/redux/overlaySlice'
import {InventoryContent} from './InventoryContent/InventoryContent'
import {CommonHeader} from './CommonHeader/CommonHeader'
import s from './Inventory.module.scss'
import cn from 'classnames'
import {InventoryDataType} from 'src/common/types'
import {
    InventoryElement
} from "src/components/main/Profile/Inventory/InventoryContent/InventoryElement/InventoryElement"
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const Inventory = (props: PropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        if (isElementsBlocked) return
        dispatch(setOverlayInventoryShow({inventoryShow: true}))
    }
    const {is1200pxMode} = useAppSelector(state => state.app)
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div onClick={onClickHandler}
                className={
                    cn(
                        props.className, s.component,
                        props.version === 'main'
                            ? s.main
                            : s.overlay,
                        (!isElementsBlocked && props.version === 'main')
                            ? s.cursorPointer
                            : ''
                    )
                }>

        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }

        {props.version === 'main' &&
          <CommonHeader title={'Inventory'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>}

        {props.version === 'main'
            ? <>
                <div className={s.inventoryContent}>
                    <div>
                        <CommonHeader title={'Weapons'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                        <InventoryElement className={sCI.weapons} initialData={props.inputData[0].weapons}/>
                    </div>
                    {/*todo: refactor duplications*/}
                    <div>
                        <CommonHeader title={'Agents'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                        <InventoryElement className={sCI.agents} initialData={props.inputData[0].agents}/>
                    </div>
                    <div>
                        <CommonHeader title={'Sidekicks'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                        <InventoryElement className={sCI.sidekicksGearLand} initialData={props.inputData[0].sidekicks}/>
                    </div>
                    <div>
                        <CommonHeader title={'Gear'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                        <InventoryElement className={sCI.sidekicksGearLand} initialData={props.inputData[0].gears}/>
                    </div>
                    <div>
                        <CommonHeader title={'Land'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                        <InventoryElement className={sCI.sidekicksGearLand} initialData={props.inputData[0].lands}/>
                    </div>
                </div>
            </>
            : <>
                {!is1200pxMode && <div className={s.overlayHeaders}>
                  <CommonHeader title={'Weapons'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                  <CommonHeader title={'Agents'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                  <CommonHeader title={'Sidekicks'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                  <CommonHeader title={'Gear'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                  <CommonHeader title={'Land'} className={cn(sC.baseBgColor, s.inventoryHeader)}/>
                </div>}
                {props.inputData.map(e => <InventoryContent key={e.id} initialData={e}/>)}
            </>
        }

    </div>
}

type PropsType = {
    version: 'main' | 'overlay'
    inputData: Array<InventoryDataType>
    className?: string
}