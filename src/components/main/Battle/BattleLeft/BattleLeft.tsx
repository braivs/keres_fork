import React from 'react'
import s from './BattleLeft.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {BattleLeftHeader} from './BattleLeftHeader/BattleLeftHeader';
import {BattleLeftMain} from './BattleLeftMain/BattleLeftMain'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const BattleLeft = () => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <BattleLeftHeader className={sC.baseBgColor}/>
        <BattleLeftMain />
    </div>
}