import React from 'react'
import s from './AbilitiesOrSpecialEffects.module.scss'
import classNames from 'classnames'
import {marketData} from 'src/localData/localData'
import {useAppSelector} from 'src/hooks/hooks'

export const AbilitiesOrSpecialEffects = (props: PropsType) => {
    const selectedItemId = useAppSelector((state) => state.overlay.marketAgentWeapon.selectedItemId)

    const item = marketData.find(e => e.id === selectedItemId)

    return (
        <div className={classNames(props.className, s.component)}>
            {item &&
                <>
                    {item.type === 'agent' && <div>Abilities</div>}
                    {item.type === 'weapon' && <div>Special Effects</div>}
                </>
            }

        </div>
    )
}

type PropsType = {
    className?: string
}
