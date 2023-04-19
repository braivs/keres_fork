import React, {FC, useEffect, useRef, useState} from 'react'
import s from './FriendCard.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import cn from 'classnames'
import defaultAva from 'src/assets/image/tabfriends/defaultAva.svg'
import isUnreadMessages from 'src/assets/image/tabfriends/isUnreadMessages.png'
import {friendsThunks} from 'src/redux/friendsSlice'
import {OnlineOfflineIcon} from 'src/common/OnlineOfflineIcon'
import {FriendsMode, UserType} from 'src/common/types'
import {CircularProgress, Tooltip} from '@mui/material'
import {RequestStatusType} from 'src/redux/appSlice'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {firebaseAPI} from "src/api/firebaseAPI"
import {combinedId} from "src/common/helpers"
import {setChatMessages} from "src/redux/messagesSlice"
import play from 'src/assets/image/tabfriends/play.svg'

export const FriendCard: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const [activeUserToFriendFriendship, setActiveUserToFriendFriendship] = useState(false)
    const [localStatus, setLocalStatus] = useState<RequestStatusType>('idle')
    const [unreadStatus, setUnreadStatus] = useState(false)
    const [userAva, setUserAva] = useState<null | string>(null)
    const [isAvaFetching, setIsAvaFetching] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(true)

    const {activeAuthUser} = useAppSelector(state => state.user)
    const {activeFriend} = useAppSelector((state) => state.friends)
    const {is600pxMode} = useAppSelector(state => state.app)
    const {friendCardButtonsDisabled} = useAppSelector(state => state.app.buttonsState)

    const activeUserId = activeAuthUser?.uid ? activeAuthUser.uid : null

    // combined friendshipID, to be the same for from/to
    const friendshipID = (activeUserId && props.id) ? combinedId(activeUserId, props.id) : null

    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        const fetchRequestUnreadStatus = async () => {
            try {
                if (isMounted.current) setLocalStatus('loading')
                const requestStatus = await dispatch(friendsThunks.fetchRequestUnreadStatus({
                    collection: 'friendship',
                    userId: activeUserId ? activeUserId : '',
                    friendshipId: friendshipID ? friendshipID : ''
                })).unwrap()
                if (requestStatus) {
                    if (!isMounted.current) return
                    setActiveUserToFriendFriendship(requestStatus)
                }
            } catch {
                console.error('fetchRequestUnreadStatus error')
            } finally {
                if (isMounted.current) setLocalStatus('succeeded')
            }
        }
        fetchRequestUnreadStatus()
            .then()
        if (!isMounted.current) return
        dispatch(friendsThunks.requestUnreadStatusObserver({
            collection: 'unread',
            friendshipId: friendshipID ? friendshipID : '',
            userId: props.id,
            activeUserToFriendFriendshipCallback: setActiveUserToFriendFriendship,
            unreadStatusCallback: setUnreadStatus
        }))
    }, [activeUserId, dispatch, friendshipID, props.id]) // check for friendshipStatus on component mount

    useEffect(() => {
        const fetchGetAva = async () => {
            let userAva
            if (activeUserId) {
                try {
                    if (!isMounted.current) return
                    setIsAvaFetching(true)
                    userAva = await firebaseAPI.getDownloadImgUrl('anotherUserAva', null, props.id) // todo: move to thunk
                    if (userAva) {
                        if (!isMounted.current) return
                        setUserAva(userAva)
                    }
                } catch (e) {
                } finally {
                    if (isMounted.current) setIsAvaFetching(false)
                }
            }
        }
        if (props.id) {
            fetchGetAva()
                .then()
        }
    }, [activeUserId, props.id])


    const onChangeFriendship = async () => {
        if (activeUserId && friendshipID) {
            dispatch(friendsThunks.changeFriendshipCard({
                activeUserId, activeFriend, friendshipID, isMounted, setLocalStatusCallback: setLocalStatus,
                setActiveUserToFriendFriendshipCallback: setActiveUserToFriendFriendship
            }))
        }
    }

    const onChat = async () => {
        dispatch(setChatMessages({messages: null}))
        dispatch(friendsThunks.selectFriendChat({
            friendId: props.id,
            friendshipId: friendshipID,
            isFriend: activeUserToFriendFriendship,
        }))
    }

    const imgOnLoad = () => {
        if (!isMounted.current) return
        setIsImgLoading(false)
    }

    return <div className={classNames(s.component, props.className)}>
        <OnlineOfflineIcon state={props.state} className={s.isOnline}/>
        <>
            {
                isAvaFetching
                    ? <div className={s.circularProgress}><CircularProgress size={is600pxMode ? 20 : 40}/></div>
                    : <>
                        {isImgLoading &&
                          <div className={s.circularProgress}><CircularProgress size={is600pxMode ? 20 : 40}/></div>}
                        <img src={userAva ? userAva : defaultAva} alt="defaultAva"
                             className={cn(cn(s.ava, isImgLoading ? sC.hiddenImg : ''))} onLoad={imgOnLoad}/>
                    </>
            }
        </>
        <div className={s.nameAndStatusMessage}>
            <div className={s.nameWrapper}>
                <div className={s.name}>{props.name}</div>
            </div>
            <div className={s.statusWrapper}>
                <div className={s.statusMessage}>{props.userStatus}</div>
            </div>
        </div>

        <div className={s.icons}>
            {unreadStatus && <img className={s.isUnreadMessages} src={isUnreadMessages} alt="isUnreadMessages"
                                  onClick={() => onChat()}/>}
            {localStatus === 'loading' &&

                <CircularProgress size={23}/>
            }
            {
                localStatus === 'succeeded' &&
              <Tooltip
                title={friendCardButtonsDisabled ? '' : activeUserToFriendFriendship ? 'Remove friend' : 'Add friend'}
                placement="top">
                <div
                    className={cn(
                        activeUserToFriendFriendship ? sC.arrowUpIcon : sC.arrowRightIcon,
                        friendCardButtonsDisabled ? sC.dis : sC.act)}
                    onClick={friendCardButtonsDisabled ? () => {} : () => onChangeFriendship()}
                />
              </Tooltip>
            }
            {
                props.mode === 'friendsOnlineOffline' && <>
                <img src={play} alt="play" className={s.gameIcon}/>
                <Tooltip title={friendCardButtonsDisabled ? '' : "Chat"} placement="top">
                  <div
                    onClick={friendCardButtonsDisabled ? () => {
                    } : () => onChat()}
                    className={cn(s.chatIcon, friendCardButtonsDisabled ? sC.dis : sC.act)}
                  />
                </Tooltip>
              </>
            }
        </div>
    </div>
}

type PropsType = UserType & {
    className?: string
    mode: FriendsMode
}