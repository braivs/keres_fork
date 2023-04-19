import React, {useState} from 'react'
import {CircularProgress} from "@mui/material"
import DefaultAvatar from "src/assets/image/avatar.png"
import {useAppSelector} from "src/hooks/hooks"
import sC from 'src/common/styles/Common.module.scss'
import cn from 'classnames'

export const AvaImg = (props: PropsType) => {
    const [isImgLoading, setIsImgLoading] = useState(true)
    const {avaImg} = useAppSelector(state => state.imageUpload.avatar)
    const imgOnLoad = () => {
        setIsImgLoading(false)
    }

    return (
        <>
            {isImgLoading && <CircularProgress/> }
            <img src={avaImg ? avaImg : DefaultAvatar} alt="" onLoad={imgOnLoad}
                 className={cn(props.className, isImgLoading ? sC.hiddenImg : '')}/>
        </>
    )
}

type PropsType = {
    className?: string
}