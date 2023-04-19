import * as React from 'react'
import {AccordionMy} from "src/common/AccordionMy"
import {BattleLeft} from "src/components/main/Battle/BattleLeft/BattleLeft"
import {BattleRight} from "src/components/main/Battle/BattleRight/BattleRight"
import {PlzSelectSection} from "src/common/PlzSelectSection/PlzSelectSection"

export default function BattleAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('')
    return (
        <div>
            {expanded === '' && <PlzSelectSection />}
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel1', panelContent: 'panel1d-content', panelHeader: 'panel1d-header'}}
                header={'Battle Arena'}
            >
                <BattleLeft />
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel2', panelContent: 'panel2d-content', panelHeader: 'panel2d-header'}}
                header={'Last Match'}
            >
                <BattleRight />
            </AccordionMy>
        </div>
    )
}