import React from 'react'
import s from './Staking.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {HydroStaking} from 'src/components/main/Staking/HydroStaking/HydroStaking'
import {KeresStaking} from 'src/components/main/Staking/KeresStaking/KeresStaking'
import {StakingCalculator} from 'src/components/main/Staking/StakingCalculator/StakingCalculator'
import {useAppSelector} from "src/hooks/hooks"
import StakingAccordions from "src/components/main/Staking/StakingAccordions"

export const Staking = () => {
    const {is600pxMode} = useAppSelector(state => state.app)

    return <div className={s.component}>
        {
            !is600pxMode
                ? <>
                    <KeresStaking className={sC.baseBgColor}/>
                    <HydroStaking className={sC.baseBgColor}/>
                    <StakingCalculator className={sC.baseBgColor}/>
                </>
                : <>
                    <StakingAccordions/>
                </>
        }
    </div>
}