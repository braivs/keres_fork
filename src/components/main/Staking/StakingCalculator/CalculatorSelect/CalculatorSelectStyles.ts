import {GroupBase, StylesConfig} from 'react-select'
import {OptionType} from 'src/common/CustomSelect/CustomSelect'
import {CommonSelectStyles} from 'src/common/CustomSelect/CommonSelectStyles'
import {mainColorOpacity} from "src/common/helpers"

const fontSize = '18px';

export const CalculatorSelectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    ...CommonSelectStyles,
    control: (base, state) => {
        const commonControl = CommonSelectStyles.control
            ? CommonSelectStyles.control(base, state)
            : ''
        return {
            ...commonControl,
            fontSize: fontSize, /* fz for main element */
            backgroundColor: mainColorOpacity(0.15),
            height: '100%'
        }
    },
    option: (base, state) => {
        const commonOption = CommonSelectStyles.option
            ? CommonSelectStyles.option(base, state)
            : ''
        return {
            ...commonOption,
            fontSize: fontSize, /* fz for dropdown menu */
        }
    },
    placeholder: (base, state) => {
        const commonPlaceholder = CommonSelectStyles.placeholder
            ? CommonSelectStyles.placeholder(base, state)
            : "";

        return {
            ...commonPlaceholder,
            color: mainColorOpacity(0.5)
        }
    }
}