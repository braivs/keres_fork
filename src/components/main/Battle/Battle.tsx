import React from 'react'
import {Info} from 'src/common/Info'
import s from './Battle.module.scss'
import {BattleLeft} from 'src/components/main/Battle/BattleLeft/BattleLeft'
import {BattleRight} from 'src/components/main/Battle/BattleRight/BattleRight'
import {useAppSelector} from "src/hooks/hooks"
import BattleAccordions from "src/components/main/Battle/BattleAccordions"

export const Battle = () => {
    const {is600pxMode} = useAppSelector(state => state.app)

    return <div className={s.component}>
        <div className={s.container}>
            {
                !is600pxMode
                    ? <>
                        <BattleLeft/>
                        <BattleRight/>
                    </>
                    : <>
                        <BattleAccordions/>
                    </>
            }
        </div>
        <Info/>
    </div>
}

