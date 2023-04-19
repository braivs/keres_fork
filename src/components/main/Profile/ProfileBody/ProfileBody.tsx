import React from 'react'
import s from './ProfileBody.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {ProfileBanner} from './ProfileBanner/ProfileBanner'
import {StatsMenu} from './StatsMenu/StatsMenu'
import {TopStuff} from './TopStuff/TopStuff'
import {Leaderboard} from './Leaderboard/Leaderboard'
import {Achievements} from './Achievements/Achievements'
import {useAppSelector} from "src/hooks/hooks"
import ProfileAccordions from "src/components/main/Profile/ProfileAccordions"

export const ProfileBody = () => {
    const {is600pxMode} = useAppSelector(state => state.app)

    return <div className={s.component}>
        <ProfileBanner className={sC.baseBgColor}/>
        {
            !is600pxMode
                ? <>
                    <StatsMenu className={sC.baseBgColor}/>
                    <TopStuff/>
                    <Leaderboard className={sC.baseBgColor}/>
                    <Achievements className={sC.baseBgColor}/>
                </>
                : <ProfileAccordions/>
        }
    </div>

}

