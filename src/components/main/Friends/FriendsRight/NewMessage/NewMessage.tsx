import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './NewMessage.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import {CommonButton} from 'src/common/CommonButton/CommonButton'
import uploadImg from 'src/assets/image/uploadImg.svg'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {BriLinearProgress} from 'src/common/BriLinearProgress/BriLinearProgress'
import {messagesThunks, setTextAreaValue} from "src/redux/messagesSlice"
import {setImgUploadShow} from "src/redux/overlaySlice"
import {imageUploadThunks} from "src/redux/imageUploadSlice"
import cn from "classnames"
import {combinedId} from "src/common/helpers"

export const NewMessage = (props: PropsType) => {
    const {imgFileName} = useAppSelector(state => state.imageUpload)
    const {activeAuthUser} = useAppSelector(state => state.user)
    const {newMessageSendStatus, textAreaValue, messagesMode} = useAppSelector(state => state.messages)
    const {imgUploadMode} = useAppSelector(state => state.overlay.imgUpload)
    const {avaLoadingResult, avaLoadingMessage} = useAppSelector(state => state.imageUpload.avatar)
    const {avaUploadStatus, activeFriendStatus} = useAppSelector(state => state.app)
    const {activeFriend} = useAppSelector((state) => state.friends)
    const {friendCardButtonsDisabled} = useAppSelector(state => state.app.buttonsState)

    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false)

    useEffect(() => {
        if (newMessageSendStatus === 'loading' || !activeFriend.userData || activeFriendStatus === 'loading' ||
            friendCardButtonsDisabled)
        {
            setIsButtonsDisabled(true)
        } else {
            setIsButtonsDisabled(false)
        }
    }, [newMessageSendStatus, activeFriend, activeFriendStatus, friendCardButtonsDisabled])

    const dispatch = useAppDispatch()

    // combined chatId, to be the same for from/to
    const chatId = (activeAuthUser?.uid && activeFriend.userData?.id)
        ? combinedId(activeAuthUser.uid, activeFriend.userData.id)
        : null

    const onUploadFile2Firestore = () => {
        dispatch(imageUploadThunks.uploadImg2Firestore({
            mode: imgUploadMode,
            chatId: chatId
        }))
    }

    const onSend = async () => {
        if (activeFriend.userData?.id) {
            messagesMode === 'text'
                ? dispatch(messagesThunks.sendMessage({chatId, friendshipId: activeFriend.friendshipId, isImg: false, imgUrl: null}))
                : onUploadFile2Firestore() // img mode
        }
        else {
            console.error('no activeFriend.userData.id')
        }

    }

    const onCancel = () => {
        dispatch(imageUploadThunks.cancelImgUpload())
    }

    const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextAreaValue({text: e.target.value}))
    }

    const onUploadImg = () => {
        dispatch(setImgUploadShow({show: true, mode: "chat"}))
    }

    return <div className={classNames(s.component, props.className)}>
        <BriLinearProgress show={newMessageSendStatus === 'loading' && activeFriend.userData !== null}/>
        <div className={s.container}>
            <CommonButton className={s.additionalButtonUploadSettings}
                          isDisabled={isButtonsDisabled}
                          onClick={onUploadImg}
                          tooltipText={'Send picture'}
            >
                <img src={uploadImg} alt="photoGallery"/>
            </CommonButton>
            {messagesMode === 'text'
                ? <textarea className={classNames(sC.baseBgColor, s.textArea)}
                            value={textAreaValue}
                            onChange={e => onTextChange(e)}/>
                : <div className={s.selectedImg}>
                    <div className={s.selectedImgMain}>
                        <div className={s.fileName}>{imgFileName}</div>
                        <BriLinearProgress show={avaUploadStatus === 'loading'}/>
                        <div className={cn(sC.avaMessage, avaLoadingResult ? sC.success : sC.error)}>
                            {avaLoadingMessage}
                        </div>
                    </div>
                    <CommonButton className={s.additionalButtonSettings} onClick={onCancel}
                                  isDisabled={isButtonsDisabled}
                                  classNameContainer={s.cancelButtonContainer}>
                        Cancel
                    </CommonButton>
                </div>
            }

            <CommonButton className={s.additionalButtonSettings} onClick={onSend}
                          isDisabled={isButtonsDisabled}>
                send
            </CommonButton>
        </div>

    </div>

}

type PropsType = {
    className?: string
}

