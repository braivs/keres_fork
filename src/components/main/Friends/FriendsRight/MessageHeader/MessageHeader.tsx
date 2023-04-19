import React from 'react'
import s from './MessageHeader.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import cn from 'classnames'
import {OnlineOfflineIcon} from 'src/common/OnlineOfflineIcon'
import play from 'src/assets/image/tabfriends/play.svg'
import elements from 'src/assets/image/tabfriends/elements.svg'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {friendsThunks, setActiveFriend, setActiveFriendIsFriend} from "src/redux/friendsSlice"
import {setMessageHeaderFriendStatus} from "src/redux/appSlice"
import {CircularProgress, LinearProgress, Tooltip} from "@mui/material"
import back from 'src/assets/image/tabfriends/back.png'

export const MessageHeader = (props: PropsType) => {
    const {activeFriend} = useAppSelector((state) => state.friends)
    const {activeFriendStatus, is1200pxMode, messageHeaderFriendStatus} = useAppSelector(state => state.app)
    const {messageHeaderButtonsDisabled} = useAppSelector(state => state.app.buttonsState)

    const dispatch = useAppDispatch()

    const onChangeFriendship = async () => {
        dispatch(setMessageHeaderFriendStatus('loading'))
        if (activeFriend && activeFriend.friendshipId) { // if friend selected
            const friendshipStatus = await dispatch(friendsThunks.changeFriendship({friendshipId: activeFriend.friendshipId})).unwrap()
            if (friendshipStatus !== null) dispatch(setActiveFriendIsFriend(friendshipStatus))
        }
        dispatch(setMessageHeaderFriendStatus('succeeded'))
    }

    const onGoToFriendsList = () => {
        dispatch(setActiveFriend({userData: null, isFriend: false, friendshipId: null}))
    }

    return <div className={cn(s.component)}>
        {is1200pxMode &&
          <div className={cn(s.goToFriends, props.className)}>
            <img src={back} alt="back" onClick={onGoToFriendsList} className={s.backImg}/>
          </div>}
        <div
            className={cn(s.mainContainer, activeFriendStatus !== 'loading' && s.mainContainerMobile, props.className)}>
            {activeFriendStatus === 'loading'
                ? <div className={s.loadingContainer}>
                    <div>Loading</div>
                    <LinearProgress/>
                </div>
                : activeFriend.userData === null
                    ? <div className={s.plzSelectFriend}>Plz select friend to chat with</div>
                    : <>
                        <OnlineOfflineIcon state={activeFriend.userData.state}
                                           className={s.onlineOfflineIcon}/>
                        <div className={s.nameWrapper}>
                            <div
                                className={s.selectedFriendName}>{activeFriend.userData && activeFriend.userData.name}</div>
                        </div>
                        <div className={s.icons}>
                            {
                                messageHeaderFriendStatus === 'loading'
                                    ? <div className={s.circularContainer}>
                                        <CircularProgress className={s.circular} size={23}/>
                                    </div>
                                    : <Tooltip
                                        title={activeFriend.isFriend ? 'Remove friend' : 'Add friend'}
                                        placement="top">
                                        <div
                                            className={cn(
                                                activeFriend.isFriend ? sC.arrowUpIcon : sC.arrowRightIcon,
                                                messageHeaderButtonsDisabled ? sC.dis : sC.act)}
                                            onClick={messageHeaderButtonsDisabled ? () => {
                                            } : () => onChangeFriendship()}
                                        />
                                    </Tooltip>
                            }
                            <img src={play} alt="play" className={s.gameIcon}/>
                            <img src={elements} alt="elements"/>
                        </div>
                    </>
            }
        </div>
    </div>
}

type PropsType = {
    className?: string
}