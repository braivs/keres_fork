import React from 'react'
import s from "./UsersContainer.module.scss"
import {FriendCard} from "src/components/main/Friends/FriendsLeft/FriendsList/FriendCard/FriendCard"
import sC from "src/common/styles/Common.module.scss"
import {UserType} from "src/common/types"
import {useAppSelector} from "src/hooks/hooks"
import {CircularProgress} from "@mui/material"
import cn from 'classnames'

export const UsersContainer: React.FC<PropsType> = (props) => {
    const {usersStatus} = useAppSelector(state => state.user)

    return (
        <div className={cn(
            s.usersContainer,
            (usersStatus !== 'loading' && props.users?.length !== 0) && s.isScroll,
            usersStatus === "loading" && s.isHeight100
        )}>
            {
                usersStatus === 'loading'
                    ? <CircularProgress className={s.circular}/>
                    : <>{props.users !== null && props.users.length !== 0
                        ? <>{props.users.map((e) => <FriendCard
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            className={sC.baseBgColor}
                            mode={'addFriend'}
                            state={e.state}
                            email={e.email}
                            last_changed={e.last_changed}
                            userStatus={e.userStatus}
                            isAdmin={e.isAdmin}
                        />)}</>
                        : <>No users</>
                    } </>
            }
        </div>
    )
}

type PropsType = {
    users: Array<UserType> | null
}
