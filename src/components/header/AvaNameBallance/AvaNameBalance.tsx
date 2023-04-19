import React, {FC} from 'react'
import s from './AvaNameBallance.module.scss'
import cn from 'classnames'
import sC from 'src/common/styles/Common.module.scss'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import {setOverlayWalletAndSettingsShow} from "src/redux/overlaySlice"
import {CircularProgress} from "@mui/material"
import {AvaImg} from "src/common/AvaImg/AvaImg"

export const AvaNameBalance: FC<PropsType> = (props) => {
    const {avaDownloadStatus} = useAppSelector(state => state.app)
    const {activeFirebaseUser} = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()

    const onAvaAndOtherClick = () => {
        dispatch(setOverlayWalletAndSettingsShow({show: true}))
    }

    return <div className={cn(s.component, props.className, sC.baseBgColor)}>
        {avaDownloadStatus === "loading"
            ? <CircularProgress/>
            : <div onClick={onAvaAndOtherClick} className={s.avaNameBalanceContainer}>
                <AvaImg/>
                <div className={s.nameBalance}>
                    <div className={s.nameWrapper}>
                        <div className={s.name}>{activeFirebaseUser?.name}</div>
                    </div>
                    <div className={s.balance}>2000 krs</div>
                </div>
                <div/>
            </div>
        }
    </div>
}

type PropsType = {
    className?: string
}