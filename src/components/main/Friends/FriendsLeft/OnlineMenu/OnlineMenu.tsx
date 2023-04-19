import React, {FC} from 'react'
import s from './OnlineMenu.module.scss'
import classNames from 'classnames'
import {useDispatch} from 'react-redux'
import {setOnlineMenuCurrentValue} from 'src/redux/friendsSlice'
import {useAppSelector} from 'src/hooks/hooks'
import cn from 'classnames'

export const OnlineMenu: FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const onlineMenuCurrentValue = useAppSelector((state) => state.friends.onlineMenuCurrentValue)
    const countOnline = useAppSelector(state => state.friends.counters.online)
    const countRequests = useAppSelector(state => state.friends.counters.requests)
    const countOffline = useAppSelector(state => state.friends.counters.offline)

    const onClickOnline = () => {
        dispatch(setOnlineMenuCurrentValue({onlineMenuCurrentValue: 'online'}))
    }
    const onClickOffline = () => {
        dispatch(setOnlineMenuCurrentValue({onlineMenuCurrentValue: 'offline'}))
    }
    const onClickRequests = () => {
        dispatch(setOnlineMenuCurrentValue({onlineMenuCurrentValue: 'requests'}))

    }

    const Naming = (status: 'online' | 'requests' | 'offline') => {
        switch (status) {
            case 'online':
                return onlineMenuCurrentValue === 'online' ? s.active : ''
            case 'requests':
                return onlineMenuCurrentValue === 'requests' ? s.active : ''
            case 'offline':
                return onlineMenuCurrentValue === 'offline' ? s.active : ''
            default:
                return ''
        }
    }

    return <div className={classNames(s.component, props.className)}>
        <div onClick={onClickOnline} className={s.element}>
            <div className={cn(s.subElement, Naming('online'))}>Online</div>
            <div className={cn(s.subElement, s.count, Naming('online'))}>{countOnline && countOnline}</div>
        </div>
        <div onClick={onClickRequests} className={s.element}>
            <div className={cn(s.subElement, Naming('requests'))}>Requests</div>
            <div className={cn(s.subElement, s.count, Naming('requests'))}>{countRequests && countRequests}</div>
        </div>
        <div onClick={onClickOffline} className={s.element}>
            <div className={cn(s.subElement, Naming('offline'))}>Offline</div>
            <div className={cn(s.subElement, s.count, Naming('offline'))}>{countOffline && countOffline}</div>
        </div>
    </div>
}

type PropsType = {
    className?: string
}

