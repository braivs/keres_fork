import React from 'react'
import s from './NFTTiersOverlay.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {useDispatch} from 'react-redux'
import {setOverlayNFTTiersShow} from 'src/redux/overlaySlice'
import cn from 'classnames'
import keres from 'src/assets/image/tokens/keres.svg'
import {useAppSelector} from 'src/hooks/hooks'
import {nftTiersData} from "src/localData/localData"
import {CommonOverlay} from 'src/common/CommonOverlay/CommonOverlay'


export const NFTTiersOverlay = () => {
    const nftTiersShow = useAppSelector((state) => state.overlay.nftTiersShow)

    const dispatch = useDispatch()

    if (!nftTiersShow) return null

    const onCloseOverlay = () => {
        dispatch(setOverlayNFTTiersShow({nftTiersShow: false}))
    }

    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={s.overlayContainer}>
            <img src={keres} alt="Wextrizig" className={s.wextrizig}/>
            <div className={s.tableHeader}>
                <div className={cn(sC.baseBgColor, s.first, s.tableCell)}>
                    NFT tiers
                </div>
                <div className={s.others}>
                    <div className={cn(sC.baseBgColor, s.smallFont, s.tableCell)}>Skin<br/>designs</div>
                    <div className={cn(sC.baseBgColor, s.smallFont, s.tableCell)}>Skin Editions<br/>per<br/>Skin
                        Designs
                    </div>
                    <div className={cn(sC.baseBgColor, s.smallFont, s.tableCell)}>Burn<br/>Value</div>
                </div>
            </div>
            {
                nftTiersData.map(e => <div className={s.tableRow} key={e.id}>
                    <div className={s.nftTiers}>
                        <div className={cn(sC.baseBgColor, s.tableCell)}>{e.id}</div>
                        <div className={cn(sC.baseBgColor, s.tableCell)}><img src={e.tierImg} alt=""/></div>
                        <div className={cn(sC.baseBgColor, s.tableCell)}>{e.tierName}</div>
                    </div>
                    <div className={s.others}>
                        <div className={cn(sC.baseBgColor, s.tableCell)}>{e.skinDesign}</div>
                        <div className={cn(sC.baseBgColor, s.tableCell)}>{e.skinPerDesigns}</div>
                        <div className={cn(sC.baseBgColor, s.tableCell)}>{e.burnValue}</div>
                    </div>
                </div>)
            }
        </CommonOverlay>
    )
}


