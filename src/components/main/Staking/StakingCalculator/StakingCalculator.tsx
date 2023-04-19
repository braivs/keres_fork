import React, {useState} from 'react'
import s from './StakingCalculator.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import cn from 'classnames'
import {CalculatorHeader} from 'src/components/main/Staking/StakingCalculator/CalculatorHeader/CalculatorHeader'
import {StakingButton} from 'src/common/StakingButton/StakingButton'
import {CalculatorSelect} from 'src/components/main/Staking/StakingCalculator/CalculatorSelect/CalculatorSelect'
import {OptionType} from 'src/common/CustomSelect/CustomSelect'
import {numberChecker} from "src/common/helpers"
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const StakingCalculator = (props: PropsType) => {

    const [calculatorValue, setCalculatorValue] = useState('')
    const [timeSelect, setTimeSelect] = useState('')
    const [currencySelect, setCurrencySelect] = useState('')
    const [compoundSelect, setCompoundSelect] = useState('')

    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    const onClick = () => {
        alert(`Selected Time=${timeSelect} \nCurrency=${currencySelect} \nCompound=${compoundSelect} \nAmount=${calculatorValue}`)
    }

    const optionsTimeSelect: Array<OptionType> = [
        {value: 'Now', label: 'Now'},
        {value: 'InOctober', label: 'In October'},
        {value: 'NextMonth', label: 'Next Month'},
    ]

    const optionsCurrencySelect: Array<OptionType> = [
        {value: 'Hydro', label: 'Hydro'},
        {value: 'Keres', label: 'Keres'},
        {value: 'USDT', label: 'USDT'},
        {value: 'Bitcoin', label: 'Bitcoin'},
    ]

    const optionsCompoundSelect: Array<OptionType> = [
        {value: 'Compound1', label: 'Compound1'},
        {value: 'Compound2', label: 'Compound2'},
        {value: 'Compound3', label: 'Compound3'},
    ]

    return <div className={cn(s.component, props.className)}>
        {
            isElementsBlocked && <>
            <ElementBlock/>
          </>
        }

        <CalculatorHeader className={sC.chartBgColor}/>
        <div className={s.container}>
            <CalculatorSelect options={optionsTimeSelect} setCurrentValue={setTimeSelect} placeholder={'time'}/>
            <input value={calculatorValue} placeholder={'Input amount'}
                   onChange={e => numberChecker(e.target.value, setCalculatorValue)}
                   className={cn(sC.chartBgColor, s.inputAmount)}/>
            <CalculatorSelect options={optionsCurrencySelect} setCurrentValue={setCurrencySelect}
                              placeholder={'Currency'}/>
            <CalculatorSelect options={optionsCompoundSelect} setCurrentValue={setCompoundSelect}
                              placeholder={'Compound'}/>
            <StakingButton buttonText={'Calculate'} onClick={onClick} className={s.button}/>
        </div>
    </div>
}

type PropsType = {
    className?: string
}
