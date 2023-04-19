import React from 'react'
import {Info} from 'src/common/Info'
import {ProfileBody} from './ProfileBody/ProfileBody'
import {Inventory} from './Inventory/Inventory'
import s from './Profile.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {InventoryData} from 'src/localData/localData'
import {useAppSelector} from "src/hooks/hooks"

export const Profile = () => {
    const {is600pxMode} = useAppSelector(state => state.app)

    return <div className={s.component}>
        <Info />
        <ProfileBody />
        {!is600pxMode && <Inventory version={'main'} inputData={InventoryData} className={sC.baseBgColor}/>}
    </div>

}