import {GroupBase, StylesConfig} from 'react-select'
import {OptionType} from 'src/common/CustomSelect/CustomSelect'

const dropdownMenuColor = 'rgba(0, 0, 0, 0.3)'

export const CommonSelectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (base) => ({
        ...base,
        border: 'none', /* border around main element*/
        borderRadius: 0,
        boxShadow: 'none', /* outline for same */
        textAlign: 'center',
        caretColor: "rgba(0, 0, 0, 0)", /* remove cursor */
        cursor: 'pointer'
    }),
    option: (base, {isSelected, isFocused}) => ({
        ...base,
        ':hover': { /* mouse selecting styles */
            ...base[':hover'],
            backgroundColor: 'rgb(86,89,89)',
        },
        backgroundColor: isSelected
            ? 'rgb(31,30,30)' /* current selected value in dropdown menu */
            : isFocused
                ? 'lightgrey' /* select by keyboard arrow */
                : dropdownMenuColor, /* dropdown menu front layer */
        textAlign: 'center',
        cursor: 'pointer'
    }),
    placeholder: base => ({
        ...base
    }),
    singleValue: base => ({
        ...base,
        color: 'white' /* selected value of main element */
    }),
    menuList: base => ({
        ...base,
        backgroundColor: dropdownMenuColor, /*dropdown menu under layer*/ /* rgba not works also here, so done same grey color */
    }),
    menu: base => ({
        ...base,
        backgroundColor: dropdownMenuColor,
    })
}