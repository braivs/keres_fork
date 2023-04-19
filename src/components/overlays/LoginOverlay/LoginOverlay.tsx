import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import * as yup from "yup"
import {setLoginShow} from "src/redux/overlaySlice"
import {useFormik} from "formik"
import {userThunks} from "src/redux/userSlice"
import sCO from "src/common/styles/Overlays.module.scss"
import sC from 'src/common/styles/Common.module.scss' // common project styles
import {CommonOverlayBackground} from "src/common/CommonOverlayBackground/CommonOverlayBackground"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import closeIcon from "src/assets/image/close.svg"
import cn from 'classnames'

export const LoginOverlay = () => {
    const [isLoginDisabled, setIsLoginDisabled] = useState(false)
    const dispatch = useAppDispatch()

    const {loginShow} = useAppSelector(state => state.overlay)
    const {errorCode, activeAuthUser} = useAppSelector((state) => state.user)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const schemeCreatorLogin = () => {
        return yup.object().shape({
            email: yup.string().email('Invalid email').required('Required').trim(),
            password: yup.string()
                .required('Required'),
        })
    }

    const onClickOverlay = () => {
        dispatch(setLoginShow(false))
    }

    const onGoogleLogin = async () => {
        dispatch(userThunks.googleLogin())
    }

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            if (appStatus !== 'loading' && activeAuthUser === null) {
                dispatch(userThunks.loginUser({email: values.email, password: values.password}))
            }
        },
        validationSchema: schemeCreatorLogin()
    })

    useEffect(() => {
        (formikLogin.errors.email || formikLogin.errors.password) ? setIsLoginDisabled(true) : setIsLoginDisabled(false)
    }, [formikLogin]) // disable login button if errors in validationSchema

    if (!loginShow) return null

    return (
        <CommonOverlayBackground className={cn(sCO.loginRegister, sC.cursorPointer)} onClick={onClickOverlay}>
            <div className={sCO.container} onClick={e => e.stopPropagation()}>
                <img src={closeIcon} alt="" className={sCO.imgClose} onClick={onClickOverlay}/>
                <div className={sCO.header}>Login</div>
                <form onSubmit={formikLogin.handleSubmit}>
                    <div className={sCO.elementContainer}>
                        <div>email:</div>
                        <input
                            type={'email'}
                            placeholder={'email'}
                            {...formikLogin.getFieldProps('email')}
                        />
                        <div className={sC.error}>{formikLogin.touched.email ? formikLogin.errors.email : ''}</div>
                    </div>
                    <div className={sCO.elementContainer}>
                        <div>Password:</div>
                        <input
                            type="password"
                            placeholder={'password'}
                            autoComplete="on"
                            {...formikLogin.getFieldProps('password')}
                        />
                        <div
                            className={sC.error}>{formikLogin.touched.password && formikLogin.errors.password ? formikLogin.errors.password : ''}</div>
                    </div>
                    <div className={sCO.registerLoginStatusMessages}>
                        <div>Information messages:</div>
                        {activeAuthUser?.email && <div>Login email: {activeAuthUser.email}</div>}
                        {errorCode && <div>Login error: {errorCode}</div>}
                    </div>
                    <BriLinearProgress show={appStatus === 'loading'}/>
                    <CommonButton className={sCO.button} type={'submit'}
                                  isDisabled={isLoginDisabled || appStatus === 'loading' || activeAuthUser !== null}>Login
                    </CommonButton>
                </form>
                <div className={sCO.header}>Or you can login with google:</div>
                <CommonButton className={sCO.button}
                              isDisabled={isLoginDisabled || appStatus === 'loading' || activeAuthUser !== null}
                              onClick={onGoogleLogin}>Google Login
                </CommonButton>
            </div>
        </CommonOverlayBackground>
    )
}