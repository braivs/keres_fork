import React, {ChangeEvent, useCallback, useState} from 'react'
import sCO from "src/common/styles/Overlays.module.scss"
import s from './ImgUploadOverlay.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import {setImgUploadShow} from "src/redux/overlaySlice"
import {Slider} from "@mui/material"
import {CommonButton} from "src/common/CommonButton/CommonButton"
import Cropper, {Area} from "react-easy-crop"
import {BriLinearProgress} from "src/common/BriLinearProgress/BriLinearProgress"
import cn from 'classnames'
import {setMessagesMode} from "src/redux/messagesSlice"
import {imageUploadThunks, setCropImg, setImgFileName, setInputImg} from "src/redux/imageUploadSlice"
import {combinedId} from "src/common/helpers"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const ImgUploadOverlay = () => {
    const {activeAuthUser} = useAppSelector(state => state.user)
    const {avaUploadStatus} = useAppSelector(state => state.app)
    const {imgUploadShow, imgUploadMode} = useAppSelector(state => state.overlay.imgUpload)
    const {cropImg, inputImg} = useAppSelector(state => state.imageUpload)
    const {avaLoadingResult, avaLoadingMessage} = useAppSelector(state => state.imageUpload.avatar)
    const {activeFriend} = useAppSelector((state) => state.friends)

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [cropArea, setCropArea] = useState<null | CropType>(null)
    const [zoom, setZoom] = useState(1)

    // combined chatId, to be the same for from/to
    const chatId = (activeAuthUser?.uid && activeFriend.userData?.id)
        ? combinedId(activeAuthUser?.uid, activeFriend.userData.id)
        : null

    const dispatch = useAppDispatch()
    const onCloseOverlay = () => {
        dispatch(imageUploadThunks.cancelImgUpload())
    }

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            dispatch(setImgFileName(file.name))
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                dispatch(setInputImg(reader.result as string))
            }, false)
            if (file) {
                reader.readAsDataURL(file)
            }
        }
    }

    const sliderHandler = (event: Event, newValue: number | number[]) => {
        setZoom(newValue as number)
    }

    const onUploadFile2Firestore = () => {
        dispatch(imageUploadThunks.uploadImg2Firestore({
            mode: imgUploadMode,
            chatId: chatId,
        }))
    }

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCropArea({
                x: croppedAreaPixels.x,
                y: croppedAreaPixels.y,
                width: croppedAreaPixels.width,
                height: croppedAreaPixels.height
            })
        },
        []
    )

    // create the image with a src of the base64 string
    const createImage = (url: string): Promise<CanvasImageSource> =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
        })

    const getCroppedImg = async (imageSrc: string, crop: CropType): Promise<string> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        /* setting canvas width & height allows us to
        resize from the original image resolution */
        if (imgUploadMode === 'avatar') {
            canvas.width = 70
            canvas.height = 70
        }
        if (imgUploadMode === 'chat') {
            canvas.width = 300
            canvas.height = 200
        }

        ctx && ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            canvas.width,
            canvas.height
        )

        return canvas.toDataURL('image/jpeg')
    }

    const onCropImg = async () => {
        if (cropArea && inputImg) {
            const img = await getCroppedImg(inputImg, cropArea)
            dispatch(setCropImg(img))
        }
    }

    const AvaImgText = () => {
        switch (imgUploadMode) {
            case 'avatar':
                return 'ava'
            case 'chat':
                return 'img'
            default:
                return ''
        }
    }

    const cropSizeSelector = () => {
        switch (imgUploadMode) {
            case 'avatar':
                return {width: 70, height: 70}
            case 'chat':
                return {width: 300, height: 200}
            default:
                return {width: 0, height: 0}
        }
    }

    const onApprove = () => {
        dispatch(setImgUploadShow({show: false, mode: 'chat'}))
        dispatch(setMessagesMode("image"))
    }

    if (!imgUploadShow) return null

    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={sCO.container}>
            <div className={s.innerContainer}>
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={onFileChange}
                />
                <div className={s.uploadContainer}>
                    <div
                        className={cn(s.imgContainer, imgUploadMode === 'avatar' ? s.imgContainerAva : s.imgContainerChat)}>
                        {inputImg
                            ? <Cropper
                                image={inputImg}
                                crop={crop}
                                zoom={zoom}
                                cropSize={cropSizeSelector()}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                            : <div
                                className={cn(s.dummyImg, imgUploadMode === 'avatar' ? s.dummyImgAva : s.dummyImgChat)}>{AvaImgText()}</div>
                        }
                    </div>
                    {inputImg && <Slider
                      aria-label="raceSlider"
                      value={zoom}
                      min={1}
                      max={10}
                      step={0.1}
                      onChange={sliderHandler}
                      className={s.slider}
                    />}
                </div>
                <CommonButton className={s.button} onClick={onCropImg} isDisabled={!inputImg}>Crop
                    Image</CommonButton>
                <div className={s.cropImgPrev}>Cropped img preview:</div>
                <div className={s.uploadContainer}>
                    <div
                        className={cn(s.imgContainer, imgUploadMode === 'avatar' ? s.imgContainerAva : s.imgContainerChat)}>{
                        cropImg
                            ? <img
                                className={cn(s.croppedImg, imgUploadMode === 'avatar' ? s.croppedImgAva : s.croppedImgChat)}
                                src={cropImg} alt="cropImg"/>
                            : <div
                                className={cn(s.dummyImg, imgUploadMode === 'avatar' ? s.dummyImgAva : s.dummyImgChat)}>{AvaImgText()}</div>}
                    </div>
                </div>
                <CommonButton className={cn(s.button, s.lastButton)}
                              onClick={imgUploadMode === 'avatar' ? onUploadFile2Firestore : onApprove}
                              isDisabled={!cropImg}>
                    {imgUploadMode === 'avatar' ? `Upload to Firebase` : `Approve`}</CommonButton>
                <BriLinearProgress show={avaUploadStatus === 'loading'}/>
                <div
                    className={cn(sC.avaMessage, avaLoadingResult ? sC.success : sC.error)}>{avaLoadingMessage}</div>
            </div>
        </CommonOverlay>
    )
}

type CropType = {
    x: number
    y: number
    width: number
    height: number
}