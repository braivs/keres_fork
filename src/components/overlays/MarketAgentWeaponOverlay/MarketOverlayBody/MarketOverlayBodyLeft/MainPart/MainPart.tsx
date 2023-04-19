import React from 'react'
import s from './MainPart.module.scss'
import classNames from 'classnames'
import {marketData} from 'src/localData/localData'
import {Stats} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/MarketOverlayBodyLeft/MainPart/Stats/Stats'
import {useAppSelector} from 'src/hooks/hooks'

export const MainPart = (props: PropsType) => {
    const selectedItemId = useAppSelector((state) => state.overlay.marketAgentWeapon.selectedItemId)

    const item = marketData.find(e => e.id === selectedItemId)

    return (
        <div className={classNames(props.className, s.component)}>
            {item && <>
                <div className={classNames(props.className, s.imgContainer)}>
                    <img className={s.mainImg} src={item.mainImg} alt="mainImg"/>
                    {item.secondImg && <img className={classNames(s.mainImg, s.secondImg)} src={item.secondImg} alt="mainImg"/>}
                </div>
                <Stats className={props.className} value1={'null'} value2={item.secondHeader} value3={'edition'} value4={'333'} />
                {
                    item.type === 'agent' && <Stats className={props.className} value1={'null'} value2={'null'} value3={''} value4={'5'} />
                }
                {
                    item.type === 'weapon' && <Stats className={props.className} value1={'null'} value2={'null'} value3={'Burn Value'} value4={'1000'} />
                }

            </>
            }
        </div>
    )


}

type PropsType = {
    className?: string
}
