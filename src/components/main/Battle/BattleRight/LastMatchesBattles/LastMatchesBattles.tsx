import React, {FC} from 'react'
import s from './LastMatchesBattles.module.scss'
import classNames from 'classnames'
import {PlayerCard} from 'src/components/main/Battle/BattleRight/LastMatchesBattles/PlayerCard/PlayerCard'
import playerAva from 'src/assets/image/tabBattle/playerAva.png'
import playerRating from 'src/assets/image/tabBattle/playerRating.png'
import {localPlayers} from 'src/localData/localData'

export const LastMatchesBattles:FC<PropsType> = (props) => {
    return <div className={classNames(s.component, props.className)}>
        <div className={s.headerContainer}>
            <h1>Last Match</h1>
            <div className={s.viewAll}>
                <div>view</div>
                <div>all matches</div>
            </div>
        </div>
        <div className={s.delimiter}/>
        <div className={s.playerList}>
            {localPlayers.map(e =>
                <PlayerCard key={e.id} id={e.id} ava={e.ava} map={e.map} K={e.K} D={e.D} A={e.A} ratingImg={e.ratingImg} result={e.result} />
            )}
            <PlayerCard id={'111'} ava={playerAva} map={{name: 'Map name', score: {left: 11, right: 13}}} K={11} D={17} A={11} ratingImg={playerRating} result={'win'}/>
        </div>
    </div>
}

type PropsType = {
    className?: string
}