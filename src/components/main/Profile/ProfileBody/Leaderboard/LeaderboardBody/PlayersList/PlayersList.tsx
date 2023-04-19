import React from 'react'
import {Player} from './Player/Player'
import s from './PlayersList.module.scss'

const players: PlayersType = [
    {playerNumber: 1, playerName: 'Player'},
    {playerNumber: 2, playerName: 'Player'},
    {playerNumber: 3, playerName: 'Player'},
    {playerNumber: 4, playerName: 'Player'},
    {playerNumber: 5, playerName: 'Player'},
    {playerNumber: 6, playerName: 'Player'},
    {playerNumber: 7, playerName: 'Player'},
    {playerNumber: 8, playerName: 'Player'},
    {playerNumber: 9, playerName: 'Player'},
    {playerNumber: 10, playerName: 'Player'},
]


export const PlayersList = () => {
    return (
        <div className={s.componentExternal}>
            <div className={s.component}>
                {players.map(e => <Player key={e.playerNumber} number={e.playerNumber} name={e.playerName}/>)}

            </div>
            <div className={s.delimiter}></div>
            <Player key={5435} number={5435} name={'Ulviux'} className={s.lastPlayer}/>
        </div>
    )
}

type PlayersType = Array<{ playerNumber: number, playerName: string }>