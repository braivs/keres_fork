import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import sCO from "src/common/styles/Overlays.module.scss"
import {setConfirmEmailOverlayShow} from "src/redux/overlaySlice"
import cn from "classnames"
import s from "./StatusEditOverlay.module.scss"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import {useFormik} from "formik"
import {firebaseAPI} from "src/api/firebaseAPI"
import * as yup from "yup"
import sC from "src/common/styles/Common.module.scss"
import {setActiveFirebaseUser} from "src/redux/userSlice"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const StatusEditOverlay = () => {
    const dispatch = useAppDispatch()
    const {statusEditOverlayShow} = useAppSelector((state) => state.overlay)
    const {activeFirebaseUser} = useAppSelector(state => state.user)

    const [isStatusUpdating, setIsStatusUpdating] = useState(false)
    const [isUpdateStatusDisabled, setIsUpdateStatusDisabled] = useState(false)

    const onClose = () => {
        formik.resetForm()
        dispatch(setConfirmEmailOverlayShow(false))
    }

    const onDeleteStatus = async () => {
        try {
            setIsStatusUpdating(true)
            await firebaseAPI.deleteAuthUserStatus() // todo: move to thunk
            if (activeFirebaseUser) dispatch(setActiveFirebaseUser({
                ...activeFirebaseUser,
                userStatus: null
            }))
            setIsStatusUpdating(false)
        } catch (e: any) {
            console.error('StatusEditOverlay error')
        }

    }

    const schemeCreator = () => {
        return yup.object().shape({
            userStatus: yup.string().trim()
                .required('Required'),
        })
    }

    const updateStatus = async (statusText: string) => {
        try {
            setIsStatusUpdating(true)
            await firebaseAPI.updateAuthUserStatus(statusText) // todo: move to thunk
            if (activeFirebaseUser) dispatch(setActiveFirebaseUser({
                ...activeFirebaseUser,
                userStatus: statusText
            }))
            formik.resetForm()
            setIsStatusUpdating(false)
        } catch (e: any) {
            console.error('StatusEditOverlay error')
        }
    }

    const formik = useFormik({
        initialValues: {
            userStatus: ''
        },
        onSubmit: async (values) => {
            await updateStatus(values.userStatus)
        },
        validationSchema: schemeCreator()
    })


    useEffect(() => {
        formik.values.userStatus.trim() === '' ? setIsUpdateStatusDisabled(true) : setIsUpdateStatusDisabled(false)
    }, [formik]) // disable create button if userStatus blank

    if (!statusEditOverlayShow) return null

    return (
        <CommonOverlay onCloseClick={onClose} overlayContainerClass={cn(sCO.container, s.container)}
                       isCloseDisabled={isStatusUpdating}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div className={s.statusContainer}>
                    <div className={s.statusName}>Current status:</div>
                    <div className={s.statusTextWrapper}>
                        {activeFirebaseUser?.userStatus ? activeFirebaseUser?.userStatus : 'none'}
                    </div>
                </div>
                <div className={s.statusContainer}>
                    <div className={s.statusName}>New status:</div>
                    <div className={cn(sCO.elementContainer, s.elementContainerAdditional)}>
                        <input
                            type={'text'}
                            placeholder={'user status'}
                            {...formik.getFieldProps('userStatus')}
                        />
                        <div
                            className={sC.error}>{formik.touched.userStatus && formik.errors.userStatus ? formik.errors.userStatus : ''}</div>
                    </div>
                </div>
                <BriLinearProgress show={isStatusUpdating}/>
                <CommonButton className={sCO.button} type={'submit'}
                              isDisabled={isStatusUpdating || isUpdateStatusDisabled}>Update
                    status</CommonButton>
                <CommonButton className={sCO.button}
                              isDisabled={isStatusUpdating
                                  || !!activeFirebaseUser?.userStatus === undefined
                                  || activeFirebaseUser?.userStatus === null
                              }
                              onClick={onDeleteStatus}
                              type={"button"}>Delete status</CommonButton>
            </form>
        </CommonOverlay>

    )
}
