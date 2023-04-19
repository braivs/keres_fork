import React from 'react';
import s from './MenuDesktop.module.scss'
import {MenuContent} from "../MenuContent/MenuContent";

export const MenuDesktop = () => {
    return (
        <MenuContent className={s.menu} />
    )
}

