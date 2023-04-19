import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import * as yup from "yup"
import {useFormik} from "formik"
import {userThunks} from "src/redux/userSlice"
import s from "./RegisterOverlay.module.scss"
import sCO from 'src/common/styles/Overlays.module.scss' // common overlays styles
import sC from 'src/common/styles/Common.module.scss' // common project styles
import closeIcon from "src/assets/image/close.svg"
import cn from "classnames"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import {setRegisterShow} from "src/redux/overlaySlice"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const RegisterOverlay = () => {
    const [isRegisterDisabled, setIsRegisterDisabled] = useState(false)
    const [errorSelf, setErrorSelf] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const {registerShow} = useAppSelector(state => state.overlay)
    const {errorCode, activeAuthUser} = useAppSelector((state) => state.user)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const schemeCreator = () => {
        return yup.object().shape({
            email: yup.string().email('Invalid email').required('Required').trim(),
            password: yup.string()
                .matches(/^[a-zA-Z0-9]+/, 'Password can only contain Latin letters and numbers.')
                .required('Required')
                .min(6, 'Password must be more than 6 characters...'),
            checkPassword: yup.string()
                .required('Required'),
        })
    }

    const onClickOverlay = () => {
        dispatch(setRegisterShow(false))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkPassword: '',
        },
        onSubmit: async (values) => {
            if (values.email.trim() !== '' && values.password === values.checkPassword) {
                dispatch(userThunks.registerStage1({email: values.email.trim(), password: values.password}))
                setErrorSelf('')
            } else {
                if (values.password !== values.checkPassword) {
                    setErrorSelf('password not equal')
                }
            }
        },
        validationSchema: schemeCreator()
    })

    useEffect(() => {
        (formik.errors.email || formik.errors.password || formik.errors.checkPassword) ? setIsRegisterDisabled(true) : setIsRegisterDisabled(false)
    }, [formik]) // disable reg button if errors in validationSchema

    if (!registerShow) return null

    return (
        <CommonOverlay onCloseClick={onClickOverlay} overlayContainerClass={sCO.container}>
            <img src={closeIcon} alt="" className={sCO.imgClose} onClick={onClickOverlay}/>
            <div className={sCO.header}>Register</div>
            <div className={sCO.header}>Stage 1/3</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={sCO.elementContainer}>
                    <div>email:</div>
                    <input
                        type={'email'}
                        placeholder={'email'}
                        {...formik.getFieldProps('email')}
                    />
                    <div className={sC.error}>{formik.touched.email ? formik.errors.email : ''}</div>
                </div>
                <div className={sCO.elementContainer}>
                    <div>Password:</div>
                    <input
                        type="password"
                        placeholder={'password'}
                        autoComplete={'on'}
                        {...formik.getFieldProps('password')}
                    />
                    <div
                        className={sC.error}>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</div>
                </div>
                <div>Repeat password:</div>
                <div className={sCO.elementContainer}>
                    <input
                        type="password"
                        placeholder={'repeat password'}
                        autoComplete={'on'}
                        {...formik.getFieldProps('checkPassword')}
                    />
                    <div
                        className={sC.error}>{formik.touched.checkPassword && formik.errors.checkPassword ? formik.errors.checkPassword : ''}</div>
                </div>
                <div className={cn(sC.error, s.lastElementContainer)}>{errorSelf}</div>
                <div className={sCO.registerLoginStatusMessages}>
                    <div>Information messages:</div>
                    {activeAuthUser?.uid && <div>Registered email: {activeAuthUser.email}</div>}
                    {errorCode && <div>Register error: {errorCode}:</div>}
                </div>
                <BriLinearProgress show={appStatus === 'loading'}/>
                <CommonButton className={sCO.button} type={'submit'}
                              isDisabled={isRegisterDisabled || appStatus === 'loading' || activeAuthUser !== null}>Next</CommonButton>
            </form>
        </CommonOverlay>
    )
}