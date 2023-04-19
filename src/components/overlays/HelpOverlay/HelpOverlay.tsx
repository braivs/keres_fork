import React from 'react'
import s from './HelpOverlay.module.scss'
import chat from 'src/assets/image/tabfriends/chat.svg'
import add from 'src/assets/image/tabfriends/add.svg'
import uploadImg from 'src/assets/image/uploadImg.svg'
import burger from 'src/assets/image/burger_white.png'
import {useDispatch} from "react-redux"
import {setHelpOverlayShow} from "src/redux/overlaySlice"
import {useAppSelector} from "src/hooks/hooks"
import arrowRight from 'src/assets/image/tabfriends/arrowRight.svg'
import arrowUp from 'src/assets/image/tabfriends/arrowUp.svg'
import {CommonButton} from "src/common/CommonButton/CommonButton"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const HelpOverlay = () => {
    const dispatch = useDispatch()
    const {helpOverlayShow} = useAppSelector((state) => state.overlay)

    const onCloseOverlay = () => {
        dispatch(setHelpOverlayShow(false))
    }

    if (!helpOverlayShow) return null

    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={s.overlayContainer}>
            <div>
                First of all you need to register and login.
            </div>
            <h1>Header:</h1>
            <div className={s.helpBlock}>
                <img className={s.burger} src={burger} alt="arrowRight"/>
                <div>Open burger menu in mobile mode</div>
            </div>
            <h1>Friends tab:</h1>
            <div className={s.helpBlock}>
                <img src={arrowRight} alt="arrowRight"/>
                <div>Send friend request</div>
            </div>
            <div className={s.helpBlock}>
                <img src={arrowUp} alt=""/>
                <div>That means that friend request is sent, and by click of that possible to unfriend the user</div>
            </div>
            <div className={s.helpBlock}>
                <img src={chat} alt=""/>
                <div>Begin chat with user</div>
            </div>
            <div className={s.helpBlock}>
                <CommonButton className={s.additionalButtonSettings}>
                    <img src={add} alt="add"/>
                </CommonButton>
                <div>Add new friends from all user registered on our server</div>
            </div>
            <div className={s.helpBlock}>
                <CommonButton className={s.additionalButtonSettings}>
                    <img src={uploadImg} alt="add"/>
                </CommonButton>
                <div>Send image to chat</div>
            </div>
        </CommonOverlay>
    )
}