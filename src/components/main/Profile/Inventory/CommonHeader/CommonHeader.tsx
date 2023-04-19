import React, {FC} from 'react'
import s from './CommonHeader.module.scss'
import classNames from 'classnames'
import close from "src/assets/image/close.svg"
import sCO from "src/common/styles/Overlays.module.scss"

export const CommonHeader: FC<PropsType> = (props) => {
    return <div className={classNames(s.component, props.className)} onClick={props.onClick}>
        {props.title}
        {props.showCloseIcon && <img className={sCO.imgClose} src={close} alt="close" onClick={props.closeIconAction}/>}
    </div>
}

type PropsType = {
    title: string
    className?: string
    onClick?: React.MouseEventHandler // this is for stopPropagation
    showCloseIcon?: boolean // using in InventoryOverlay
    closeIconAction?: React.MouseEventHandler // same
}

