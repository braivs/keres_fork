import React from 'react'
import s from "./AvaNameChain.module.scss"
import {useAppSelector} from "src/hooks/hooks"
import {AvaImg} from "src/common/AvaImg/AvaImg"

export const AvaNameChain = () => {
    const {activeFirebaseUser} = useAppSelector(state => state.user)

    return (
        <div className={s.component}>
            <AvaImg/>
            <div className={s.container}>
                <div className={s.nameWrapper}>
                    <div className={s.name}>{activeFirebaseUser?.name}</div>
                </div>
                <div className={s.status}>
                    <span>status:</span>
                    <div className={s.statusWrapper}>
                        {activeFirebaseUser?.userStatus ? activeFirebaseUser?.userStatus : 'none'}
                    </div>
                </div>
                <div className={s.selectedChain}>POLYGON</div>
                <div className={s.address}>0x03rF....2D1eH</div>
            </div>
        </div>
    )
}