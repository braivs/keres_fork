import React from 'react'
import s from './WalletAndSettingsOverlay.module.scss'
import {setConfirmEmailOverlayShow, setImgUploadShow, setOverlayWalletAndSettingsShow} from 'src/redux/overlaySlice'
import {Notification} from './Notification/Notification'
import {AssetsAndSettings} from './AssetsAndSettings/AssetsAndSettings'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {CommonButton} from 'src/common/CommonButton/CommonButton'
import {BriLinearProgress} from 'src/common/BriLinearProgress/BriLinearProgress'
import {userThunks} from 'src/redux/userSlice'
import {AvaNameChain} from "src/components/overlays/WalletAndSettingsOverlay/AvaNameChain/AvaNameChain"
import cn from 'classnames'
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const WalletAndSettingsOverlay = () => {
    const show = useAppSelector((state) => state.overlay.walletAndSettings.show)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const dispatch = useAppDispatch()

    const {activeAuthUser} = useAppSelector(state => state.user)

    const onLogout = () => {
        dispatch(userThunks.logoutUser())
    }

    const onEditAva = () => {
        dispatch(setImgUploadShow({show: true, mode: "avatar"}))
    }

    const onEditStatus = () => {
        dispatch(setConfirmEmailOverlayShow(true))
    }

    const onCloseOverlay = () => {
        dispatch(setOverlayWalletAndSettingsShow({show: false}))
    }

    if (!show) return null

    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={s.component}>
            <div className={s.avaContainer}>
                <AvaNameChain/>
                <Notification/>
                <Notification/>
                <AssetsAndSettings/>
                <BriLinearProgress show={appStatus === 'loading'}/>
                <div className={s.buttonContainer}>
                    <CommonButton className={s.button} onClick={onEditAva}
                                  isDisabled={appStatus === 'loading' || activeAuthUser === null}>Edit
                        Ava</CommonButton>
                    <CommonButton className={s.button} onClick={onEditStatus}
                                  isDisabled={appStatus === 'loading' || activeAuthUser === null}>Edit
                        Status</CommonButton>
                    <CommonButton className={cn(s.button, s.lastButton)} onClick={onLogout}
                                  isDisabled={appStatus === 'loading' || activeAuthUser === null}>Logout</CommonButton>

                </div>
            </div>
        </CommonOverlay>
    )


}

