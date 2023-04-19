import Select, {GroupBase, Options, PropsValue, StylesConfig} from 'react-select'
import {DropdownIndicator} from 'src/common/CustomSelect/DropdownIndicator/DropdownIndicator'

export const CustomSelect = (props: CustomSelectProps) => {

    const onChange = (option: PropsValue<OptionType | OptionType[]>) => {
        props.setState((option as OptionType).label)
    }

    return (
        <Select
            className={props.className}
            name={'select'}
            defaultValue={props.defaultValue}
            onChange={onChange}
            placeholder={props.placeholder}
            options={props.options}
            styles={props.styles}
            components={
                {
                    IndicatorSeparator: () => null, /* disable indicator separator */
                    DropdownIndicator /* custom dropdown indicator */
                }
            }
            menuPlacement={props.menuPlacement}
        />
    )
}

export type OptionType = {
    label: string
    value: string
}

type CustomSelectProps = {
    options: Options<OptionType>
    className?: string
    placeholder?: string
    setState: (value: string) => void
    defaultValue?: OptionType
    styles: StylesConfig<OptionType, false, GroupBase<OptionType>>
    menuPlacement?: "bottom" | "auto" | "top"
}



