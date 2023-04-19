import React, {useEffect} from 'react'
import s from './AddFriendOverlay.module.scss'
import {setOverlayAddFriendShow} from 'src/redux/overlaySlice'
import {useAppDispatch, useAppSelector} from 'src/hooks/hooks'
import {SearchContainer} from "src/components/overlays/AddFriendOverlay/SearchContainer/SearchContainer"
import {UsersContainer} from "src/components/overlays/AddFriendOverlay/UsersContainer/UsersContainer"
import {setAddFriendOverlayUsers} from "src/redux/userSlice"
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"

export const AddFriendOverlay = () => {
    const dispatch = useAppDispatch()
    const addFriendShow = useAppSelector((state) => state.overlay.addFriendShow)
    const {activeAuthUser, users, addFriendOverlayUsers} = useAppSelector(state => state.user)

    const onClickOverlay = () => {
        dispatch(setOverlayAddFriendShow({addFriendShow: false}))
    }

    useEffect(() => {
        if (users) {
            dispatch(setAddFriendOverlayUsers({users}))
        }
    }, [users, dispatch, addFriendShow])

    if (!addFriendShow) return null
    return (
        <CommonOverlay onCloseClick={onClickOverlay} overlayContainerClass={s.container}>
            {activeAuthUser && activeAuthUser.uid
                ? <>
                    <SearchContainer activeUserId={activeAuthUser.uid} addFriendShow={addFriendShow}/>
                    <UsersContainer users={addFriendOverlayUsers}/>
                </>
                : <div>
                    Please login
                </div>
            }
        </CommonOverlay>

    )
}