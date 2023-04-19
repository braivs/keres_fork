import React from 'react'
import classNames from 'classnames'
import cn from 'classnames'
import s from './RegisterLogin.module.scss'
import {useDispatch} from 'react-redux'
import {setLoginShow, setRegisterShow} from 'src/redux/overlaySlice'
import {CommonButton} from "src/common/CommonButton/CommonButton"
import sC from "src/common/styles/Common.module.scss"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"

export const RegisterLogin = (props: PropsType) => {
    const dispatch = useDispatch()

    const onRegister = () => {
        dispatch(setRegisterShow(true))
    }

    const onLogin = () => {
        dispatch(setLoginShow(true))
    }

    return (
        <div className={classNames(s.component, props.className)}>
            <CommonButton onClick={onRegister} className={sC.headerButton}>Register</CommonButton>
            <CommonButton onClick={onLogin} className={cn(sC.headerButton, sC.lastHeaderButton)}>Login</CommonButton>
            <BriLinearProgress show={false} />
        </div>
    )
}

type PropsType = {
    className?: string
}