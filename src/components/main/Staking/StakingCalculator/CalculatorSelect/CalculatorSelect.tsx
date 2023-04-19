import React from 'react'
import {CustomSelect, OptionType} from 'src/common/CustomSelect/CustomSelect'
import {
    CalculatorSelectStyles
} from 'src/components/main/Staking/StakingCalculator/CalculatorSelect/CalculatorSelectStyles'

export const CalculatorSelect = (props: PropsType) => {

    return <CustomSelect options={props.options} setState={props.setCurrentValue} placeholder={props.placeholder}
                         styles={CalculatorSelectStyles} menuPlacement={'top'}/>
}

type PropsType = {
    options: Array<OptionType>
    setCurrentValue: (value: string) => void
    placeholder: string
}
