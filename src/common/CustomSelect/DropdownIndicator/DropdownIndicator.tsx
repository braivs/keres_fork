import selectIcon from 'src/assets/image/selectIcon.svg'
import s from './DropdownIndicator.module.scss'
import React from 'react'

export const DropdownIndicator = () => {
    return <img src={selectIcon} alt="" className={s.dropdownIndicator}/>
}