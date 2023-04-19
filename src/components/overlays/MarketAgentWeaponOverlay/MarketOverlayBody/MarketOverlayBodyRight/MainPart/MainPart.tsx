import React from 'react'
import s from './MainPart.module.scss'
import classNames from 'classnames'
import {SubMainPart} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyRight/MainPart/SubMainPart/SubMainPart'
import {marketData} from 'src/localData/localData'
import {useAppSelector} from 'src/hooks/hooks'

export const MainPart = (props: PropsType) => {
    const selectedItemId = useAppSelector((state) => state.overlay.marketAgentWeapon.selectedItemId)

    const item = marketData.find(e => e.id === selectedItemId)

    return (
        <div className={classNames(props.className, s.component)}>
            {item && <>
                {item.type === 'agent' && <>
                    <SubMainPart header={'Ability 1'} className={props.className}/>
                    <SubMainPart header={'Ability 2'} className={props.className}/>
                    <SubMainPart header={'Ultimate'} className={props.className}/>
                </>
                }
                {item.type === 'weapon' && <>
                    <SubMainPart header={'Sound effect'} className={props.className}/>
                    <SubMainPart header={'Reload effect'} className={props.className}/>
                    <SubMainPart header={'Kill Effect'} className={props.className}/>
                </>
                }
            </>}

        </div>
    )


}

type PropsType = {
    className?: string
}
