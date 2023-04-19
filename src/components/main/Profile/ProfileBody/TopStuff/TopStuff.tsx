import React, {FC} from 'react'
import s from './TopStuff.module.scss'
import {Stuff} from './Stuff/Stuff'
import sC from 'src/common/styles/Common.module.scss'
import {profileTopAgents, profileTopWeapons} from 'src/localData/localData'
import {useAppSelector} from "src/hooks/hooks"
import {ElementBlock} from "src/components/overlays/ElementBlock/ElementBlock"

export const TopStuff: FC<PropsType> = (props) => {
    const {isElementsBlocked} = useAppSelector(state => state.app.blockingOfElements)

    const {is600pxMode} = useAppSelector(state => state.app)

    const profileTopAgentsSorted = [...profileTopAgents].sort((a, b) => a.order - b.order)
    const profileTopWeaponsSorted = [...profileTopWeapons].sort((a, b) => a.order - b.order)

    return <div className={`${s.component} ${props.className}`}>
        {
            isElementsBlocked && <>
            <ElementBlock />
          </>
        }

        <div className={s.subContainer}>
            {(is600pxMode ? profileTopAgentsSorted : profileTopAgents).map(e => <Stuff
                    key={e.id}
                    order={e.order}
                    specification={e.specification}
                    name={e.name}
                    stuffType={e.stuffType}
                    ratio={e.ratio}
                    className={sC.baseBgColor}
                    picture={e.picture}
                />
            )
            }
        </div>
        <div className={s.subContainer}>
            {(is600pxMode ? profileTopWeaponsSorted : profileTopWeapons).map(e => <Stuff
                    key={e.id}
                    order={e.order}
                    specification={e.specification}
                    name={e.name}
                    stuffType={e.stuffType}
                    ratio={e.ratio}
                    className={sC.baseBgColor}
                    picture={e.picture}
                />
            )
            }
        </div>
    </div>
}

type PropsType = {
    className?: string
}

