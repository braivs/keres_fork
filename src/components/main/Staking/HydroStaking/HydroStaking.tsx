import React, {useState} from 'react'
import s from './HydroStaking.module.scss'
import classNames from 'classnames'
import {stakingHydroData} from 'src/localData/localData'
import {StakingComponent} from 'src/components/main/Staking/common/StakingComponent/StakingComponent'
import {onClaim, onStake, onUnstake} from 'src/components/main/Staking/common/StakingFunctions'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const HydroStaking = (props: PropsType) => {
    const [stakingValue, setStakingValue] = useState('')
    const [unstakeValue, setUnstakeValue] = useState('')

    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    const token = 'HYDRO'

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }

        <StakingComponent
            inputData={stakingHydroData}
            className={classNames(s.component, props.className)}

            stakingValue={stakingValue}
            setStakeValue={setStakingValue}

            unstakeValue={unstakeValue}
            setUnstakeValue={setUnstakeValue}

            onStake={() => onStake(stakingValue, token)}
            onUnstake={() => onUnstake(unstakeValue, token)}

            onClaim={() => onClaim(token)}
            claimOutputValue={31.5}
        />
    </div>
}

type PropsType = {
    className?: string
}

