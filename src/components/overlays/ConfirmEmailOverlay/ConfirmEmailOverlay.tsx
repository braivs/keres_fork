import React, {useState} from 'react'
import s from "./ConfirmEmailOverlay.module.scss"
import sC from 'src/common/styles/Common.module.scss'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import {setConfirmEmailShow} from "src/redux/overlaySlice"
import {userThunks} from "src/redux/userSlice"
import cn from 'classnames'
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import sCO from "src/common/styles/Overlays.module.scss"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import {auth} from "src/firebase"
import {CommonOverlay} from 'src/common/CommonOverlay/CommonOverlay'

export const ConfirmEmailOverlay = () => {
    const dispatch = useAppDispatch()
    const [isVerifyButtonDisabled, setVerifyButtonDisabled] = useState(false)

    const {confirmEmailShow} = useAppSelector((state) => state.overlay)
    const {isSend, answerText} = useAppSelector(state => state.user.verifyEmailStatus)
    const {emailVerificationStatus} = useAppSelector(state => state.app)

    const user = auth.currentUser

    const onClickOverlay = () => {
        dispatch(setConfirmEmailShow({show: false}))
    }

    const onClickVerify = () => {
        if (user) {
            setVerifyButtonDisabled(true)
            dispatch(userThunks.sendVerificationEmail({user}))
        }
    }

    if (!confirmEmailShow) return null

    return (
        <CommonOverlay onCloseClick={onClickOverlay} overlayContainerClass={sCO.container}>
            <div className={sCO.header}>Register</div>
            <div className={sCO.header}>Stage 2/3</div>
            <div className={s.email}>You email: {user?.email} is not verified!</div>
            <CommonButton className={cn(sCO.button, isVerifyButtonDisabled && s.isDisabled)} type={'submit'}
                          isDisabled={isVerifyButtonDisabled} onClick={onClickVerify}>Send verify
                email</CommonButton>
            <BriLinearProgress show={emailVerificationStatus === 'loading'}/>
            {isSend &&
              <div className={cn(s.serverAnswer, s.send)}>Email sent. Please click on the link in your mail.</div>}
            {!isSend && <div className={cn(s.serverAnswer, sC.error)}>{answerText}</div>}
        </CommonOverlay>
    )
}