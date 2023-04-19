import React from 'react'
import s from './LandStakingMenu.module.scss'
import {LandStakingLeft} from 'src/components/main/Land/LandDisplay/LandStakingMenu/LandStakingLeft/LandStakingLeft'
import {LandStakingRight} from 'src/components/main/Land/LandDisplay/LandStakingMenu/LandStakingRight/LandStakingRight'
import {LandStakingBottom} from 'src/components/main/Land/LandDisplay/LandStakingMenu/LandStakingBottom/LandStakingBottom'
import classNames from 'classnames'
import {LandType} from 'src/common/types'

export const LandStakingMenu = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        {
            props.plotNumber !== 0
                ? <>
                    <LandStakingLeft plotNumber={props.plotNumber} tokenID={props.tokenId}/>
                    <LandStakingRight/>
                    <LandStakingBottom onClaimClick={props.onClaim} bullets={props.bullets} ale={props.ale} nectar={props.nectar}/>
                </>
                : <></>
        }
    </div>
}

type PropsType = Omit<LandType, 'id' | 'plotImg'> & {
    className?: string
    onClaim: () => void
}

