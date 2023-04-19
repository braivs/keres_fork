import React, {useEffect, useState} from 'react'
import {setCreateUserNameShow} from 'src/redux/overlaySlice'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import * as yup from 'yup'
import {useFormik} from 'formik'
import {CommonButton} from 'src/common/CommonButton/CommonButton'
import {BriLinearProgress} from 'src/common/BriLinearProgress/BriLinearProgress'
import sCO from "src/common/styles/Overlays.module.scss"
import sC from 'src/common/styles/Common.module.scss'
import {userThunks} from "src/redux/userSlice"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const CreateUserNameOverlay = () => {
    const dispatch = useAppDispatch()

    const [isCreateDisabled, setIsCreateDisabled] = useState(false)
    const [isButtonsBlocked, setIsButtonsBlocked] = useState(false)
    const [autoUserName, setAutoUserName] = useState('')

    const createUserNameShow = useAppSelector((state) => state.overlay.createUserNameShow)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const {activeAuthUser} = useAppSelector(state => state.user)
    const {success, error} = useAppSelector(state => state.user.createUserMessages)

    useEffect(() => {
        if (activeAuthUser && activeAuthUser.email) {
            setAutoUserName(activeAuthUser.email.slice(0, activeAuthUser.email.indexOf('@')))
        }
    }, [activeAuthUser]) // take sliced name from user.email for initial value

    useEffect(() => {
        if (isCreateDisabled || appStatus === 'loading') setIsButtonsBlocked(true)
        else setIsButtonsBlocked(false)
    }, [isCreateDisabled, appStatus])

    const schemeCreator = () => {
        return yup.object().shape({
            username: yup.string().trim()
                .required('Required'),
        })
    }

    const onClickOverlay = () => {
        if (isButtonsBlocked) return
        dispatch(setCreateUserNameShow({createUserNameShow: false}))
    }

    const formik = useFormik({
        initialValues: {
            username: autoUserName
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (activeAuthUser) {
                dispatch(userThunks.creatingUserInFirestoreDB({activeAuthUser, userName: values.username}))
            } else {
                console.error('no activeAuthUser')
            }
        },
        validationSchema: schemeCreator()
    })

    useEffect(() => {
        formik.errors.username ? setIsCreateDisabled(true) : setIsCreateDisabled(false)
    }, [formik]) // disable create button if errors in validationSchema

    if (!createUserNameShow) return null
    return (
        <CommonOverlay onCloseClick={onClickOverlay} overlayContainerClass={sCO.container}
                       isCloseDisabled={isButtonsBlocked}>
            <div className={sCO.header}>Register</div>
            <div className={sCO.header}>Stage 3/3</div>
            <form onSubmit={formik.handleSubmit}>
                <div>Plz create your user name.</div>
                <div className={sCO.elementContainer}>
                    <input
                        type={'text'}
                        placeholder={'user name'}
                        {...formik.getFieldProps('username')}
                    />
                    <div
                        className={sC.error}>{
                        formik.touched.username && formik.errors.username ? formik.errors.username : ''
                    }</div>
                </div>
                <CommonButton className={sCO.button} type={'submit'}
                              isDisabled={isButtonsBlocked}>Create</CommonButton>
                <BriLinearProgress show={appStatus === 'loading'}/>
                <div className={sCO.registerLoginStatusMessages}>
                    <div>Information messages:</div>
                    {error !== '' && <div>Error: {error}</div>}
                    {success !== '' && <div>{success}</div>}
                </div>
            </form>
        </CommonOverlay>
    )
}