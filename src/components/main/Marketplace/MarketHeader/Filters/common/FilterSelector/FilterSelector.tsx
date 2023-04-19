import React, {useState} from 'react'
import s from './FilterSelector.module.scss'

export const FilterSelector = (props: PropsType) => {
    const [value, setValue] = useState<'none' | 'first' | 'second'>('none')

    const onSelect1 = () => {
        if (value === 'none' || value === 'second') { setValue('first') }
    }

    const onSelect2 = () => {
        if (value === 'none' || value === 'first') { setValue('second') }
    }

    return (<div className={s.component}>
        <div className={value === 'first' ? s.selected : s.notSelected} onClick={onSelect1}>{props.text1}</div>
        <div className={value === 'second' ? s.selected : s.notSelected} onClick={onSelect2}>{props.text2}</div>
    </div>)
}

type PropsType = {
    className?: string
    text1: string
    text2: string
}
