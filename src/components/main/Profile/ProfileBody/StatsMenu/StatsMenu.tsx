import React, {FC} from 'react'
import s from './StatsMenu.module.scss'
import {Left} from './Left/Left'
import {Right} from './Right/Right'
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"
import {useAppSelector} from "src/hooks/hooks"

export const StatsMenu: FC<PropsType> = (props) => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={`${s.component} ${props.className}`}>
        <div className={s.container}>
            {
                isElementsBlocked && <>
                <ElementBlock />
              </>
            }
            <Left/>
            <Right />
        </div>
    </div>

}

type PropsType = {
    className?: string
}

