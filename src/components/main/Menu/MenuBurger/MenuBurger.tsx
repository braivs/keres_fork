import React, {useState} from 'react'
import s from './MenuBurger.module.scss'
import burger from 'src/assets/image/burger_white.png'
import close_white from 'src/assets/image/close_white.png'
import {MenuContent} from "src/components/main/Menu/MenuContent/MenuContent"
import cn from 'classnames'
import {Tooltip} from "@mui/material"

export const MenuBurger = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const onBurgerBtnClick = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    return (
        <div className={s.component}>
            <MenuContent className={cn(s.burgerNavItems, menuIsOpen ? s.show : '')}/>
            <Tooltip title={!menuIsOpen ? 'Show menu' : ''} placement="top">
                <img className={s.burger} src={menuIsOpen ? close_white : burger} alt="hamburger"
                     onClick={onBurgerBtnClick}/>
            </Tooltip>

        </div>
    )
}

