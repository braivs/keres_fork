import React from 'react'
import s from './Left.module.scss'
import {LeftElement} from './LeftElement/LeftElement'
import Ellipse from '../../../../../../assets/image/Ellipse 82.png'

export const Left = () => {
    return <div className={s.component}>
        <LeftElement className={s.logoStyling}>
            <div>Rating</div>
            <img src={Ellipse} alt="Ellipse"/>
            <div>Weiznig</div>
        </LeftElement>
        <LeftElement className={s.winAndLostStyling}>
            <div>300</div>
            <div>WINS</div>
        </LeftElement>
        <LeftElement className={s.winAndLostStyling}>
            <div>150</div>
            <div>lost</div>
        </LeftElement>
    </div>

}

