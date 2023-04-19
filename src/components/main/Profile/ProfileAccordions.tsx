import * as React from 'react'
import {AccordionMy} from "src/common/AccordionMy"
import {Leaderboard} from "src/components/main/Profile/ProfileBody/Leaderboard/Leaderboard"
import {Achievements} from "src/components/main/Profile/ProfileBody/Achievements/Achievements"
import {StatsMenu} from "src/components/main/Profile/ProfileBody/StatsMenu/StatsMenu"
import {TopStuff} from "src/components/main/Profile/ProfileBody/TopStuff/TopStuff"
import {InventoryData} from "src/localData/localData"
import {Inventory} from "src/components/main/Profile/Inventory/Inventory"
import sC from 'src/common/styles/Common.module.scss'
import {PlzSelectSection} from "src/common/PlzSelectSection/PlzSelectSection"

export default function ProfileAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('')
    return (
        <div>
            {expanded === '' && <PlzSelectSection />}
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel1', panelContent: 'panel1d-content', panelHeader: 'panel1d-header'}}
                header={'Leaderboard'}
            >
                <Leaderboard className={sC.baseBgColor}/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel2', panelContent: 'panel2d-content', panelHeader: 'panel2d-header'}}
                header={'Achievements'}
            >
                <Achievements className={sC.baseBgColor}/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel3', panelContent: 'panel3d-content', panelHeader: 'panel3d-header'}}
                header={'Statistics'}
            >
                <StatsMenu className={sC.baseBgColor}/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel4', panelContent: 'panel4d-content', panelHeader: 'panel4d-header'}}
                header={'Top Stuff'}
            >
                <TopStuff/>
            </AccordionMy>
            <AccordionMy
                expanded={expanded}
                setExpanded={setExpanded}
                techData={{panel: 'panel5', panelContent: 'panel5d-content', panelHeader: 'panel5d-header'}}
                header={'Inventory'}
            >
                <Inventory version={'main'} inputData={InventoryData} className={sC.baseBgColor}/>
            </AccordionMy>
        </div>
    )
}