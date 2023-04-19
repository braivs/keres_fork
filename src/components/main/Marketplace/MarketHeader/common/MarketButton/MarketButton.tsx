import React, {useState} from 'react'
import s from './MarketButton.module.scss'
import classNames from 'classnames'

export const MarketButton = (props: PropsType) => {
    const [isOn, setIsOn] = useState(false)

    const onClick = () => {
        isOn ? setIsOn(false) : setIsOn(true)
    }

    return <button type="submit" className={classNames(s.component, isOn ? s.isOn : s.isOff)} onClick={onClick}>
        {props.text}
    </button>
}

type PropsType = {
    text: string
}
