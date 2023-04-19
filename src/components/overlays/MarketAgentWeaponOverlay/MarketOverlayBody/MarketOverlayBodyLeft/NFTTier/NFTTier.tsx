import React from 'react'
import s from './NFTTier.module.scss'
import sC from '../../common/Styles.module.scss'
import classNames from 'classnames'
import {useDispatch} from 'react-redux'
import {setOverlayNFTTiersShow} from 'src/redux/overlaySlice'
import {marketData} from 'src/localData/localData'
import {useAppSelector} from 'src/hooks/hooks'
import {NftTiersImgs} from "src/common/helpers"

export const NFTTier = (props: PropsType) => {
    const selectedItemId = useAppSelector((state) => state.overlay.marketAgentWeapon.selectedItemId)

    const dispatch = useDispatch()

    const item = marketData.find(e => e.id === selectedItemId)

    const onNftTierImgClick = () => {
        dispatch(setOverlayNFTTiersShow({nftTiersShow: true}))
    }

    return (
        <div className={classNames(props.className, s.component, sC.NFTAbilitiesSpecial)}>
            {
                item && <>
                    {item.nftTier}
                    <img className={s.nftTiersImg} src={NftTiersImgs(item.nftTier)} alt="nftTiersImg" onClick={onNftTierImgClick}/>
                </>
            }

        </div>
    )


}

type PropsType = {
    className?: string
}
