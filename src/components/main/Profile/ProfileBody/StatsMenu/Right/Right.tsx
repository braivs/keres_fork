import React, {FC} from 'react'
import s from './Right.module.scss'
import {RightElement} from './RightElement/RightElement'
import {v1} from 'uuid'

const stats = [
    {id: v1(), firstText: 'kills', secondText: '14423'},
    {id: v1(), firstText: 'Deaths', secondText: '7334'},
    {id: v1(), firstText: 'kills/round', secondText: '1.2'},
    {id: v1(), firstText: 'most kills', secondText: '35'},
    {id: v1(), firstText: 'Headshots', secondText: '8532'},
    {id: v1(), firstText: 'Knife kills', secondText: '3'},
    {id: v1(), firstText: 'Win Ratio', secondText: '56%'},
    {id: v1(), firstText: 'K/D Ratio', secondText: '1.8'},
    {id: v1(), firstText: 'DMG/round', secondText: '122'},
    {id: v1(), firstText: 'Hours Played', secondText: '326h 45m'},
]

export const Right: FC<PropsType> = (props) => {
    return <div className={`${s.component} ${props.className}`}>
        {stats.map(e =>
            <RightElement key={e.id} firstText={e.firstText} secondText={e.secondText} />
        )}

    </div>

}

type PropsType = {
    className?: string
}

