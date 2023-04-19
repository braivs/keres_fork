import React, {useEffect, useState} from 'react'
import s from "./SearchContainer.module.scss"
import {setAddFriendOverlayUsers, userThunks} from "src/redux/userSlice"
import {useAppDispatch, useAppSelector} from "src/hooks/hooks"
import cn from 'classnames'

export const SearchContainer = (props: PropsType) => {
    const [searchValue, setSearchValue] = useState('')
    const [isClear, setIsClear] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const dispatch = useAppDispatch()

    const addFriendOverlayUsers = useAppSelector(state => state.user.addFriendOverlayUsers)
    const users = useAppSelector(state => state.user.users)

    const onSearch = () => {
        dispatch(userThunks.searchByName({userName: searchValue.trim().toLowerCase()}))
    }

    useEffect(() => { // button clear is active only if addFriendOverlayUsers set to 1 found user
        if (addFriendOverlayUsers?.length === 0 || addFriendOverlayUsers?.length === 1) setIsClear(true)
        else setIsClear(false)
    }, [addFriendOverlayUsers])

    useEffect(() => { // search button is active only if something inside of search field
        searchValue.trim() !== '' ? setIsSearch(true) : setIsSearch(false)
    }, [searchValue])

    const onClear = () => {
        if (isClear) {
            setSearchValue('')
            if (props.activeUserId && props.addFriendShow) {
                dispatch(setAddFriendOverlayUsers({users}))
            }
        }
    }

    return (
        <div className={s.searchContainer}>
            <input placeholder={'enter user name for search...'} value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }}/>
            <div className={s.buttonContainer}>
                <button className={cn(s.button, !isSearch && s.isDisabled)} onClick={onSearch}
                        disabled={!isSearch}>Search
                </button>
                <button className={cn(s.button, !isClear && s.isDisabled)} onClick={onClear} disabled={!isClear}>Clear
                </button>
            </div>
        </div>
    )
}

type PropsType = {
    activeUserId: string | null
    addFriendShow: boolean
}