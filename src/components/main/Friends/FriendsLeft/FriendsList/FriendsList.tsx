import React, {FC, useEffect, useRef, useState} from 'react'
import s from './FriendsList.module.scss'
import classNames from 'classnames'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {FriendCard} from 'src/components/main/Friends/FriendsLeft/FriendsList/FriendCard/FriendCard'
import {FriendsMode, UserType} from 'src/common/types'
import {friendsThunks} from 'src/redux/friendsSlice'
import {BriLinearProgress} from 'src/common/BriLinearProgress/BriLinearProgress'
import {userThunks} from "src/redux/userSlice"
import {combinedThunks} from "src/redux/combinedSlice"

export const FriendsList: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()

    const onlineMenuCurrentValue = useAppSelector((state) => state.friends.onlineMenuCurrentValue)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const {users, activeAuthUser} = useAppSelector(state => state.user)
    const {friendships} = useAppSelector(state => state.friends)
    const {friendsOnline, friendsOffline, friendsRequests} = useAppSelector(state => state.friends.friendsLists)
    const {loginStatus} = useAppSelector(state => state.auth)

    const [friendsToShow, setFriendsToShow] = useState<null | Array<UserType>>(null)
    const [friendsMode, setFriendsMode] = useState<FriendsMode>('friendsOnlineOffline')

    useEffect(() => {
        if (activeAuthUser && loginStatus === 'loggedIn') {
            dispatch(friendsThunks.friendshipObserver({activeUserId: activeAuthUser.uid}))
            dispatch(userThunks.getAllUsersObserver({activeUserId: activeAuthUser.uid}))
        } else {
            if (!isMounted.current) {
                return
            }
            // clear all old user friends arrays on logout
            setFriendsToShow(null)
        }
    }, [activeAuthUser, dispatch, loginStatus])

    useEffect(() => {
        dispatch(combinedThunks.sortFriendsAndActiveFriend())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendships, users])


    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => { /*here we show online|offline|requests depend on onlineMenuCurrentValue*/
        switch (onlineMenuCurrentValue) {
            case 'online': {
                if (!isMounted.current) return
                setFriendsMode('friendsOnlineOffline')
                setFriendsToShow(friendsOnline)
                return
            }
            case 'offline': {
                if (!isMounted.current) return
                setFriendsMode('friendsOnlineOffline')
                setFriendsToShow(friendsOffline)
                return
            }
            case 'requests': {
                if (!isMounted.current) return
                setFriendsMode('requests')
                setFriendsToShow(friendsRequests)
                return
            }
            default: {
                return
            }
        }
    }, [onlineMenuCurrentValue, dispatch, friendsOnline, friendsOffline, friendsRequests])

    return <div className={s.component}>
        <div className={classNames(s.container, props.className)}>
            <BriLinearProgress show={appStatus === 'loading'}/>
            {activeAuthUser !== null
                ? loginStatus === 'loggedIn'
                    ? friendsToShow
                        ? <>
                            {friendsToShow.map((e) => <FriendCard
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                state={e.state}
                                className={props.className}
                                mode={friendsMode}
                                last_changed={e.last_changed}
                                email={e.email}
                                userStatus={e.userStatus}
                                isAdmin={e.isAdmin}
                            />)}
                        </>
                        : <>No Users</>
                    : <>Please confirm email</>
                : <div>Please login</div>}
        </div>
    </div>
}

type PropsType = {
    className?: string
}

