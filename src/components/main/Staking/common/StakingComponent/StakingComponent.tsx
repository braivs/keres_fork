import React from 'react'
import s from './StakingComponent.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import {Header} from 'src/components/main/Staking/common/header/Header'
import {PriceMarketTotal} from 'src/components/main/Staking/common/PriceMarketTotal/PriceMarketTotal'
import classNames from 'classnames'
import chartImg from 'src/assets/image/tabStaking/KeresChartGroup.svg'
import {Chart} from 'src/components/main/Staking/common/Сhart/Сhart'
import {BlocksLeftLessRightBigger} from 'src/components/main/Staking/common/BlocksLeftLessRightBigger/BlocksLeftLessRightBigger'
import {StakingInputDataType} from 'src/common/types'
import {InputAndButton} from 'src/components/main/Staking/common/InputAndButton/InputAndButton'
import {DivAndButton} from 'src/components/main/Staking/common/DivAndButton/DivAndButton'

export const StakingComponent = (props: PropsType) => {
    return <div className={classNames(s.component, props.className)}>
        <Header text={props.inputData.headerText} className={sC.chartBgColor}/>
        <PriceMarketTotal inputData={props.inputData.priceMarketTotalData1} className={sC.chartBgColor}/>
        <PriceMarketTotal inputData={props.inputData.priceMarketTotalData2} className={sC.chartBgColor}/>
        <Chart className={sC.chartBgColor} conversionWay={props.inputData.chart.conversionWay} chartImg={chartImg} token={props.inputData.token}/>
        {props.inputData.blocksLeftLessRightBiggerData.map(e => <BlocksLeftLessRightBigger key={e.id} leftText={e.leftText} rightNumber={e.rightNumber}/>)}
        <InputAndButton buttonText={'stake'} onClick={props.onStake} inputValue={props.stakingValue} setInputValue={props.setStakeValue}/>
        <InputAndButton buttonText={'unstake'} onClick={props.onUnstake} inputValue={props.unstakeValue} setInputValue={props.setUnstakeValue}/>
        <DivAndButton onClick={props.onClaim} outputValue={props.claimOutputValue} token={props.inputData.token} />
    </div>
}

type PropsType = {
    className?: string
    inputData: StakingInputDataType
    stakingValue: string
    setStakeValue: (value: string) => void
    unstakeValue: string
    setUnstakeValue: (value: string) => void
    onStake: () => void
    onUnstake: () => void

    onClaim: () => void
    claimOutputValue: number

}

