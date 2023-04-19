import React, {FC} from 'react'
import s from './Achievements.module.scss'
import {AchievementsHeader} from './AchievementsHeader/AchievementsHeader'
import {AchievementsBody} from './AchievementsBody/AchievementsBody'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const Achievements: FC<PropsType> = (props) => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock />
          </>
        }
        <AchievementsHeader className={props.className}/>
        <AchievementsBody className={props.className}/>
    </div>

}

type PropsType = {
    className?: string
}

