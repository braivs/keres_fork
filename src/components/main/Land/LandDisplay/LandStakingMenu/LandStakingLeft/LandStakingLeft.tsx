import React, {useState} from 'react'
import s from './LandStakingLeft.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import cn from 'classnames'
import {LandGridRow} from 'src/components/main/Land/LandDisplay/LandStakingMenu/LandStakingLeft/LandGridRow/LandGridRow'
import {useDispatch} from 'react-redux'
import {setOverlayLandConfirmOrClaimShow} from 'src/redux/overlaySlice'

export const LandStakingLeft = (props: PropsType) => {
    const dispatch = useDispatch()

    const [stakeValue, setStakeValue] = useState('')
    const [sacrificeValue, setSacrificeValue] = useState('')
    const [unstakeValue, setUnstakeValue] = useState('')

    const onStake = () => {
        stakeValue !== ''
            ? dispatch(setOverlayLandConfirmOrClaimShow({
                show: true,
                version: 'stake',
                tokenId: props.tokenID,
                amountValue: stakeValue,
                bullets: 0,
                ale: 0,
                nectar: 0
            }))
            : alert('Please enter amount')

    }
    const onUnstake = (value: string) => {
        value !== ''
            ? alert('onUnstake ' + value)
            : alert('Please enter amount')
    }
    const onSacrifice = () => {
        sacrificeValue !== ''
            ? dispatch(setOverlayLandConfirmOrClaimShow({
                show: true,
                version: 'sacrifice',
                tokenId: props.tokenID,
                amountValue: sacrificeValue,
                bullets: 0,
                ale: 0,
                nectar: 0
            }))
            : alert('Please enter amount')
    }

    return <div className={s.component}>
        <div className={s.containerLevel1}>
            <div className={cn(sC.baseBgColor, s.header)}>Land plot #{props.plotNumber} level 1 Upgrades</div>
            <LandGridRow
                firstValue={'stake Hydro'}
                secondValue={'input amount'}
                thirdValueType={'button'}
                thirdValue={'Stake'}
                onClickButton={onStake}
                inputValue={stakeValue}
                setInputValue={setStakeValue}
            />
            <LandGridRow
                firstValue={'Total staked'}
                secondValue={'Total amount of Hydro staked'}
                thirdValueType={'button'}
                thirdValue={'Unstake'}
                onClickButton={() => onUnstake(unstakeValue)}
                inputValue={unstakeValue}
                setInputValue={setUnstakeValue}
            />
            <LandGridRow firstValue={'Upgrade 1'} secondValue={'Protective Crystal Pyramid'} thirdValueType={'complete'}
                         thirdValue={'Complete'} onClickButton={() => {
            }}/>
            <LandGridRow firstValue={'Upgrade 2'} secondValue={'Hydro makes Oxygen'} thirdValueType={'complete'}
                         thirdValue={'Complete'} onClickButton={() => {
            }}/>
        </div>
        <div className={s.containerLevel2}>
            <div className={cn(sC.baseBgColor, s.header)}>Land plot #{props.plotNumber} level 2 Upgrades</div>
            <LandGridRow
                firstValue={'Sacrifice Keres'}
                secondValue={'input amount'}
                thirdValueType={'button'}
                thirdValue={'Sacrifice '}
                onClickButton={onSacrifice}
                inputValue={sacrificeValue}
                setInputValue={setSacrificeValue}
            />
            <LandGridRow firstValue={'sacrificed'} secondValue={'Total amount of keres sacrificed'}
                         thirdValueType={'none'} thirdValue={''} onClickButton={() => {
            }}/>
            <LandGridRow firstValue={'Upgrade 3'} secondValue={'Granite Pyramid'} thirdValueType={'complete'}
                         thirdValue={'Complete'} onClickButton={() => {
            }}/>
            <LandGridRow firstValue={'Upgrade 4'} secondValue={'Factory'} thirdValueType={'in progress'}
                         thirdValue={'In progress'} onClickButton={() => {
            }}/>
            <LandGridRow firstValue={'Upgrade 5'} secondValue={'Lounge'} thirdValueType={'in progress'}
                         thirdValue={'In progress'} onClickButton={() => {
            }}/>
            <LandGridRow firstValue={'Upgrade 6'} secondValue={'Brewery'} thirdValueType={'in progress'}
                         thirdValue={'In progress'} onClickButton={() => {
            }}/>
        </div>
    </div>
}

type PropsType = {
    plotNumber: number
    tokenID: string
}

