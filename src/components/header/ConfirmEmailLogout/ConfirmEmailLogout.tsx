import React from 'react'
import classNames from 'classnames'
import s from './ConfirmEmailLogout.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {setConfirmEmailShow} from 'src/redux/overlaySlice'
import {userThunks} from "src/redux/userSlice"
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import cn from 'classnames'
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"

export const ConfirmEmailLogout = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const {logoutStatus} = useAppSelector(state => state.app)

    const onConfirm = () => {
        dispatch(setConfirmEmailShow({show: true}))
    }

    const onLogout = () => {
        dispatch(userThunks.logoutUser())
    }

    return (
        <div className={classNames(s.component, props.className)}>
            <CommonButton onClick={onConfirm} className={sC.headerButton} isDisabled={logoutStatus === 'loading'}>Confirm
                email</CommonButton>
            <CommonButton onClick={onLogout} className={cn(sC.headerButton, sC.lastHeaderButton)}
                          isDisabled={logoutStatus === 'loading'}>Logout</CommonButton>
            <BriLinearProgress show={logoutStatus === 'loading'}/>
        </div>
    )
}

type PropsType = {
    className?: string
}