import React from 'react'
import s from "./CommonOverlay.module.scss"
import cn from "classnames"
import sC from "src/common/styles/Common.module.scss"
import sCO from "src/common/styles/Overlays.module.scss"
import {CommonOverlayBackground} from "src/common/CommonOverlayBackground/CommonOverlayBackground"

export const CommonOverlay: React.FC<PropsType> = (props) => {
    return (
        <CommonOverlayBackground onClick={!props.isCloseDisabled ? props.onCloseClick : () => {
        }} className={cn(s.component, !props.isCloseDisabled && sC.cursorPointer)}>
            <div className={cn(sC.baseBgColor, s.container, props.overlayContainerClass)}
                 onClick={e => e.stopPropagation()}>
                {
                    !props.isCloseIconHidden &&
                  <div
                    className={cn(sCO.imgClose, !props.isCloseDisabled ? sCO.closeEnabled : sCO.closeDisabled)}
                    onClick={!props.isCloseDisabled ? props.onCloseClick : () => {
                    }}
                  />


                }
                {props.children}
            </div>
        </CommonOverlayBackground>
    )
}

type PropsType = {
    onCloseClick: React.MouseEventHandler
    overlayContainerClass: string
    isCloseIconHidden?: boolean
    isCloseDisabled?: boolean
}