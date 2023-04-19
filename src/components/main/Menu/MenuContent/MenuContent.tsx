import React from 'react'
import {NavLink} from "react-router-dom"
import s from "./MenuContent.module.scss"
import cn from "classnames"

const setActive = (isActive: boolean) => isActive ? s.active : ''

export const MenuContent = (props: PropsType) => {
    return <div className={cn(s.menuContent, props.className)}>
        <div><NavLink to={'/onboarding'} className={({isActive}) => setActive(isActive)}>Onboarding</NavLink></div>
        <div><NavLink to={'/profile'} className={({isActive}) => setActive(isActive)}>Profile</NavLink></div>
        <div><NavLink to={'/friends'} className={({isActive}) => setActive(isActive)}>Friends</NavLink></div>
        <div><NavLink to={'/battle'} className={({isActive}) => setActive(isActive)}>Battle</NavLink></div>
        <div><NavLink to={'/staking'} className={({isActive}) => setActive(isActive)}>Staking</NavLink></div>
        <div><NavLink to={'/market'} className={({isActive}) => setActive(isActive)}>Market</NavLink></div>
        <div><NavLink to={'/land'} className={({isActive}) => setActive(isActive)}>Land</NavLink></div>
        <div><NavLink to={'/casino'} className={({isActive}) => setActive(isActive)}>Casino</NavLink></div>
    </div>
}

type PropsType = {
    className?: string
}
