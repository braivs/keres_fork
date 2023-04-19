import React from 'react'
import s from './AddNewFriend.module.scss'
import classNames from 'classnames'
import add from 'src/assets/image/tabfriends/add.svg'
import {CommonButton} from 'src/common/CommonButton/CommonButton'
import {useDispatch} from 'react-redux'
import {setOverlayAddFriendShow} from 'src/redux/overlaySlice'
import {useAppSelector} from "src/hooks/hooks"

export const AddNewFriend = (props: PropsType) => {
    const dispatch = useDispatch()

    const {addFriendButtonDisabled} = useAppSelector(state => state.app.buttonsState)

    const onClickHandler = () => {
        dispatch(setOverlayAddFriendShow({addFriendShow: true}))
    }

    return <div className={classNames(s.component, props.className)}>
        <CommonButton
            className={s.additionalButtonSettings}
            onClick={onClickHandler}
            tooltipText={"Add new friends"}
            isDisabled={addFriendButtonDisabled}
        >
            <img src={add} alt="add"/>
        </CommonButton>
    </div>
}

type PropsType = {
    className?: string
}

