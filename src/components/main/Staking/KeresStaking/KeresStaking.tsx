import React, {useState} from 'react'
import s from './KeresStaking.module.scss'
import classNames from 'classnames'
import {stakingKeresData} from 'src/localData/localData'
import {StakingComponent} from 'src/components/main/Staking/common/StakingComponent/StakingComponent'
import {onClaim, onStake, onUnstake} from 'src/components/main/Staking/common/StakingFunctions'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const KeresStaking = (props: PropsType) => {
    const [stakingValue, setStakingValue] = useState('')
    const [unstakeValue, setUnstakeValue] = useState('')

    const token = 'KERES'

    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    return <div className={s.component}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }

        <StakingComponent
            inputData={stakingKeresData}
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

