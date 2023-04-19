import React, {FC} from 'react'
import s from './StandartCard.module.scss'
import classNames from 'classnames'
import {StakingButton} from 'src/common/StakingButton/StakingButton'
import {MarketItemType} from 'src/common/types'
import {useDispatch} from 'react-redux'
import {setOverlayAgentWeaponShow, setOverlayNFTTiersShow} from 'src/redux/overlaySlice'
import {NftTiersImgs} from "src/common/helpers"

export const StandartCard: FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(setOverlayAgentWeaponShow({show: true, selectedItemId: props.id}))
    }

    const onNftTierImgClick = () => {
        dispatch(setOverlayNFTTiersShow({nftTiersShow: true}))
    }

    const mainImgClassSelector = () => {
        switch (props.type) {
            case 'agent':
                return s.mainImgAgent
            case 'weapon':
                return s.mainImgWeapon
            case 'land':
                return s.mainImgLand
            default:
                return ''
        }
    }

    return <div className={classNames(s.component, props.className)}>
        <div className={s.price}>
            <div>{props.price} USD</div>
            <img className={s.nftTierImg} src={NftTiersImgs(props.nftTier)} alt="nftTierImg" onClick={onNftTierImgClick}/>
        </div>
        <div className={s.imgContainer}>
            {props.mainImg && <img className={mainImgClassSelector()} src={props.mainImg} alt="mainImg"/> }
        </div>
        <div className={s.header}>{props.itemName}</div>
        <div className={s.secondHeader}>{props.secondHeader}</div>
        <div className={s.buttonContainer}>
            <StakingButton buttonText={'Buy now'} onClick={onClickHandler} className={s.button}/>
        </div>
    </div>
}

type PropsType = MarketItemType & { className?: string }
