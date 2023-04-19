import React from 'react'
import s from './BriLinearProgress.module.scss'
import {LinearProgress} from '@mui/material'

export const BriLinearProgress = (props: PropsType) => {
    return <div className={s.progressContainer}>
        {props.show ? <LinearProgress/> : <div/>}
    </div>
}

type PropsType = {
    show: boolean
}