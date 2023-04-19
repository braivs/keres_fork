import React from 'react'
import s from './BattleLeftMain.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {LeftPart} from './LeftPart/LeftPart'
import {RightPart} from './RightPart/RightPart'

export const BattleLeftMain = () => {
    return <div className={s.component}>
        <LeftPart/>
        <RightPart className={sC.baseBgColor}/>
    </div>
}