import React, {FC} from 'react'
import s from './ProfileBanner.module.scss'
import {useAppSelector} from 'src/hooks/hooks'
import {BriLinearProgress} from 'src/common/BriLinearProgress/BriLinearProgress'
import {CircularProgress} from "@mui/material"
import {AvaImg} from "src/common/AvaImg/AvaImg"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const ProfileBanner: FC<PropsType> = (props) => {
    const {avaDownloadStatus, appStatus, is600pxMode} = useAppSelector(state => state.app)
    const {activeAuthUser, activeFirebaseUser} = useAppSelector(state => state.user)
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={`${s.component} ${props.className}`}>
        {
            isElementsBlocked && <>
            <ElementBlock is600pxMode={is600pxMode}/>
          </>
        }
        {activeAuthUser !== null
            ? <>
                {avaDownloadStatus === "loading" || appStatus === 'loading' || !activeFirebaseUser?.name
                    ? <div className={s.circularWrapper}><CircularProgress className={s.circular}/></div>
                    : <AvaImg className={s.ava}/>}
                <div className={s.NameAndProfession}>
                    {appStatus === 'loading' || !activeFirebaseUser?.name
                        ? <div className={s.loadingContainer}>
                            <div className={s.loader}>Loading...</div>
                            <BriLinearProgress show={appStatus === 'loading' || !activeFirebaseUser?.name}/>
                        </div>
                        : <div className={s.nameWrapper}>
                            <div className={s.name}>
                                {activeFirebaseUser?.name ? activeFirebaseUser?.name : ''}
                            </div>
                        </div>
                    }
                    {(avaDownloadStatus !== "loading" && appStatus !== 'loading' && activeAuthUser !== undefined && activeFirebaseUser?.name)
                        && <div className={s.status}>
                        Grand Magus
                      </div>
                    }
                </div>
            </>
            : <div className={s.noLogin}>Please login</div>}
    </div>

}

type PropsType = {
    className?: string
}
