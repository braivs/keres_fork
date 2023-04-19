import React from 'react'
import s from './LandDisplay.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {LandDisplayInfo} from 'src/components/main/Land/LandDisplay/LandDisplayInfo/LandDisplayInfo'
import {LandStakingMenu} from 'src/components/main/Land/LandDisplay/LandStakingMenu/LandStakingMenu'
import {useDispatch} from 'react-redux'
import {setOverlayLandConfirmOrClaimShow} from 'src/redux/overlaySlice'
import {LandType} from 'src/common/types'

export const LandDisplay = (props: PropsType) => {
    const dispatch = useDispatch()

    const onClaim = () => {
        dispatch(setOverlayLandConfirmOrClaimShow({
            show: true,
            version: 'rewards',
            tokenId: '',
            amountValue: '',
            bullets: props.bullets,
            ale: props.ale,
            nectar: props.nectar
        }))
    }

    return <div className={s.component}>
        <LandDisplayInfo plotNumber={props.plotNumber} plotImg={props.plotImg} tokenID={props.tokenId}/>
        <LandStakingMenu
            className={sC.baseBgColor}
            onClaim={onClaim}
            plotNumber={props.plotNumber}
            tokenId={props.tokenId}
            bullets={props.bullets}
            ale={props.ale}
            nectar={props.nectar}
        />
    </div>
}

type PropsType = Omit<LandType, 'id'> /* Omit exclude property*/