import * as React from 'react'
import {AccordionMy} from "src/common/AccordionMy"
import sC from 'src/common/styles/Common.module.scss'
import {KeresStaking} from "src/components/main/Staking/KeresStaking/KeresStaking"
import {HydroStaking} from "src/components/main/Staking/HydroStaking/HydroStaking"
import {StakingCalculator} from "src/components/main/Staking/StakingCalculator/StakingCalculator"
import {PlzSelectSection} from "src/common/PlzSelectSection/PlzSelectSection"

export default function StakingAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('')
    return (
        <div>
            {expanded === '' && <PlzSelectSection />}
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel1', panelContent: 'panel1d-content', panelHeader: 'panel1d-header'}}
                header={'Keres Staking'}
            >
                <KeresStaking className={sC.baseBgColor}/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel2', panelContent: 'panel2d-content', panelHeader: 'panel2d-header'}}
                header={'Hydro Staking'}
            >
                <HydroStaking className={sC.baseBgColor}/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel3', panelContent: 'panel3d-content', panelHeader: 'panel3d-header'}}
                header={'Staking Calculator'}
            >
                <StakingCalculator className={sC.baseBgColor}/>
            </AccordionMy>
        </div>
    )
}