import React, {useEffect, useState} from 'react'
import s from './ElementBlock.module.scss'
import lock from 'src/assets/image/lock.png'
import cn from 'classnames'
import {useAppSelector} from "src/hooks/hooks"

export const ElementBlock = (props: PropsType) => {
    const {reason} = useAppSelector(state => state.app.blockingOfElements)
    const [blockText, setBlockText] = useState('')
    const {loginStatus} = useAppSelector(state => state.auth)

    useEffect(() => {
        switch (reason) {
            case 'Connecting to database...':
            case 'Checking username...':
            case 'Logging in...':
            case "Logging out...":
                setBlockText(reason)
                return
            case 'Please login':
            case 'create user name':
                setBlockText(`Please ${reason} to see this content`)
                return
            default:
                setBlockText('')
                return
        }

    }, [reason, loginStatus])
    // todo: maybe combine reason and loginStatus

    return (
      <div className={cn(s.component, props.is600pxMode ? s.is600px : '')} onClick={e => e.stopPropagation()}>
            <div className={cn(s.text, props.is600pxMode ? s.text600px : '')}>{blockText}</div>
            <img className={cn(s.lock, props.is600pxMode ? s.lock600px : '')} src={lock} alt="lock"/>
        </div>
    )
}

type PropsType = {
    is600pxMode?: boolean
}
