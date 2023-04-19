import React from 'react'
import s from './MarketOverlayBottom.module.scss'
import classNames from 'classnames'
import {BottomButton} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketOverlayBody/common/BottomButton/BottomButton'

export const MarketOverlayBottom = (props: PropsType) => {

    const onHydro = () => {
        alert('on Pay with Hydro')
    }

    const onKeresCredits = () => {
        alert('on Pay with KeresStaking Credits')
    }

    const onKeresToken = () => {
        alert('on Pay with KeresStaking Token')
    }


    return (
        <div className={s.component}>
            <div className={s.buttonContainer}>
                <BottomButton className={classNames(props.className, s.leftButtons)} buttonText={'Pay with KeresStaking Credits'} onClick={onKeresCredits} />
                <BottomButton className={classNames(props.className, s.leftButtons)} buttonText={'Pay with KeresStaking Token'} onClick={onKeresToken} />
            </div>
            <BottomButton className={props.className} buttonText={'Pay with Hydro'} onClick={onHydro} />
        </div>
    )
}

type PropsType = {
    className?: string
}
