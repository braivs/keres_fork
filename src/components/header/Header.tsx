import React, {useEffect, useState} from 'react'
import s from './Header.module.scss'
import keres from 'src/assets/image/tokens/keres.svg'
import Keresverse from 'src/assets/image/Keresverse.svg'
import question from 'src/assets/image/question.png'
import admin from 'src/assets/image/admin.png'
import {MenuDesktop} from '../main/Menu/MenuDesktop/MenuDesktop'
import {MenuBurger} from '../main/Menu/MenuBurger/MenuBurger'
import sC from '../../common/styles/Common.module.scss'
import cn from 'classnames'
import {AvaNameBalance} from 'src/components/header/AvaNameBallance/AvaNameBalance'
import {RegisterLogin} from 'src/components/header/RegisterLogin/RegisterLogin'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {authThunks, setLoginStatus} from 'src/redux/authSlice'
import {ConfirmEmailLogout} from "src/components/header/ConfirmEmailLogout/ConfirmEmailLogout"
import {CheckingContainer} from "src/components/header/CheckingContainer/CheckingContainer"
import {appThunks, setIs600pxMode, setIsMobileMode} from "src/redux/appSlice"
import {setCreateUserNameShow, setHelpOverlayShow} from "src/redux/overlaySlice"
import {Tooltip} from "@mui/material"
import {CreateUserNameLogout} from "src/components/header/CreateUserNameLogout/CreateUserNameLogout"
import {combinedThunks} from "src/redux/combinedSlice"

export const Header = () => {
    const dispatch = useAppDispatch()
    const [width, setWidth] = useState(window.innerWidth)

    const {activeAuthUser, activeFirebaseUser} = useAppSelector(state => state.user)
    const {loginStatus, registerStatus} = useAppSelector(state => state.auth)
    const {
        changeFriendshipStatus,
        activeFriendStatus,
        isConnectedToFirebase,
    } = useAppSelector(state => state.app)
    const {newMessageSendStatus} = useAppSelector(state => state.messages)

    useEffect(() => { // for adaptive
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth
            setWidth(newWidth)
        }
        window.addEventListener("resize", updateWindowDimensions)
        width < 1201 ? dispatch(setIsMobileMode(true)) : dispatch(setIsMobileMode(false))
        width < 601 ? dispatch(setIs600pxMode(true)) : dispatch(setIs600pxMode(false))
        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, [width, dispatch])

    useEffect(() => {
        dispatch(setLoginStatus("checking")) // that is fix for login blinking
        dispatch(authThunks.turnOnLoginObserver()) // this is monitoring for auto login, after restart
    }, [dispatch])

    useEffect(() => {
        dispatch(appThunks.isFirebaseAvailable()) //todo: maybe need to combine with presenceObserver
    }, [dispatch])

    useEffect(() => {
        if (registerStatus === 'not registered' && loginStatus === 'loggedIn') {
            dispatch(setCreateUserNameShow({createUserNameShow: true}))
        } else {
            dispatch(setCreateUserNameShow({createUserNameShow: false}))
        }
    }, [registerStatus, loginStatus, dispatch])

    // if user logged in then set userName from activeUser and turn on users online realtime monitoring
    // + his username is registered
    useEffect(() => {
        dispatch(combinedThunks.firebaseMonitoringAndUserData())
    }, [activeAuthUser, dispatch, isConnectedToFirebase])

    useEffect(() => {
        dispatch(combinedThunks.blockElements())
    }, [dispatch, loginStatus, registerStatus, isConnectedToFirebase])

    useEffect(() => {
        dispatch(combinedThunks.blockButtons())
    }, [changeFriendshipStatus, newMessageSendStatus, activeFriendStatus, loginStatus, dispatch])

    const onAdminClick = () => {
        dispatch(appThunks.showObserverList())
    }

    return (
        <div className={s.header}>
            <div className={cn(s.logoAndMenu, sC.baseBgColor)}>
                <div className={s.logo}>
                    <img src={keres} alt="wextrizigCompass" className={s.wextrizigCompass}/>
                    <img src={Keresverse} alt="Keresverse" className={s.keresverse}/>
                </div>
                <MenuDesktop/>
                <MenuBurger/>
                <div className={s.iconBlock}>
                    {activeFirebaseUser?.isAdmin && <Tooltip title={'For Shamans'} placement="top">
                      <img className={s.icons} src={admin} alt="" onClick={onAdminClick}/>
                    </Tooltip>}
                    <Tooltip title={'Help'} placement="top">
                        <img className={s.icons} src={question} alt="" onClick={() => {
                            dispatch(setHelpOverlayShow(true))
                        }
                        }/>
                    </Tooltip>
                </div>

            </div>
            {!isConnectedToFirebase
                ? <>
                    <CheckingContainer className={cn(sC.baseBgColor, s.additionalPadding)}
                                       text={'Connecting to database...'}/>
                </>
                : <>
                    {loginStatus === 'noLoggedIn' && <RegisterLogin className={sC.baseBgColor}/>}
                    {loginStatus === 'preLogin' && <ConfirmEmailLogout className={sC.baseBgColor}/>}
                    {loginStatus === 'checking' &&
                      <CheckingContainer className={cn(sC.baseBgColor, s.additionalPadding)}
                                         text={'Checking login status...'}/>
                    }
                    {loginStatus === 'loggedIn' && <>
                        {registerStatus === 'unknown' &&
                          <CheckingContainer className={cn(sC.baseBgColor, s.additionalPadding)}
                                             text={'Checking username...'}/>}
                        {registerStatus === 'not registered' && <CreateUserNameLogout className={cn(sC.baseBgColor)}/>}
                        {registerStatus === 'registered' && <AvaNameBalance/>}
                    </>
                    }
                    {(loginStatus === 'Logging in...' || loginStatus === 'Logging out...') &&
                      <CheckingContainer className={cn(sC.baseBgColor, s.additionalPadding)}
                                         text={loginStatus}/>}
                </>
            }
        </div>
    )
}