import React from 'react'
import s from './BattleRight.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {LastMatchesBattles} from 'src/components/main/Battle/BattleRight/LastMatchesBattles/LastMatchesBattles'
import {BattleArea} from 'src/components/main/Battle/BattleRight/BattleArea/BattleArea'
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"
import {useAppSelector} from "src/hooks/hooks"

export const BattleRight = () => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }
        <LastMatchesBattles className={sC.baseBgColor}/>
        <BattleArea className={sC.baseBgColor}/>
    </div>
}