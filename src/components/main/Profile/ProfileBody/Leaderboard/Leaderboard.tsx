import React, {FC} from 'react'
import s from './Leaderboard.module.scss'
import {LeaderboardHeader} from './LeaderboardHeader/LeaderboardHeader'
import {LeaderboardBody} from './LeaderboardBody/LeaderboardBody'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const Leaderboard: FC<PropsType> = (props) => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock />
          </>
        }
        <LeaderboardHeader className={props.className}/>
        <LeaderboardBody className={props.className}/>
    </div>
}

type PropsType = {
    className?: string
}
