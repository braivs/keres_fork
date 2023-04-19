import React, {FC} from 'react'
import s from './LandDisplayRight.module.scss'
import cn from 'classnames'
import {ProgressBar} from 'src/components/main/Land/LandDisplay/LandDisplayInfo/LandDisplayRight/ProgressBar/ProgressBar'

export const LandDisplayRight: FC<PropsType> = (props) => {
    return <div className={cn(s.component, props.className)}>
        {
            props.tokenID !== ''
                ? <div className={s.container}>
                    <div className={cn(s.tokenAndClass, s.element)}>
                        <div className={s.element}>
                            <div className={s.header}>Token ID</div>
                            <div className={s.dataPlace}>{props.tokenID}</div>
                        </div>
                        <div className={s.element}>
                            <div className={s.header}>Class</div>
                            <div className={s.dataPlace}>Veintur</div>
                        </div>
                    </div>
                    <div className={cn(s.header, s.element)}>Crystal Pyramid</div>
                    <ProgressBar completed={100}/>
                    <div className={cn(s.header, s.element)}>Hydro producing Air</div>
                    <ProgressBar completed={100}/>
                    <div className={cn(s.header, s.element)}>Granite Pyramid</div>
                    <ProgressBar completed={100}/>
                    <div className={cn(s.header, s.element)}>Factory</div>
                    <ProgressBar completed={50}/>
                    <div className={cn(s.header, s.element)}>Lounge</div>
                    <ProgressBar completed={25}/>
                    <div className={cn(s.header, s.element)}>Brewery</div>
                    <ProgressBar completed={10}/>
                </div>
                : <></>
        }

    </div>
}

type PropsType = {
    className?: string
    tokenID: string
}
