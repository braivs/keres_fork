import React, {ReactNode} from 'react'
import Typography from "@mui/material/Typography"
import {styled} from "@mui/material/styles"
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion"
import MuiAccordionSummary, {AccordionSummaryProps} from "@mui/material/AccordionSummary"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordionDetails from "@mui/material/AccordionDetails"

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    backgroundColor: 'transparent',
    marginBottom: '5px'
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
}))
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: '0'
}))

export const AccordionMy = (props: PropsType) => {

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            props.setExpanded(newExpanded ? panel : false)
        }

    return (
        <Accordion expanded={props.expanded === props.techData.panel} onChange={handleChange(props.techData.panel)}
        >
            <AccordionSummary aria-controls={props.techData.panelContent} id={props.techData.panelHeader}>
                <Typography>{props.header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </Accordion>
    )
}

type PropsType = {
    expanded: string | false
    setExpanded: React.Dispatch<React.SetStateAction<string | false>>
    techData: {
        panel: string // should be panel1, panel2 and etc.
        panelContent: string // should be panel1d-content, panel2d-content and etc.
        panelHeader: string // should be panel1d-header, panel2d-header and etc
    }
    header: string
    children: ReactNode
}

