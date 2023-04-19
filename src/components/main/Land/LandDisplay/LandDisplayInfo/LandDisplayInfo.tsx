import React, {FC} from 'react'
import s from './LandDisplayInfo.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import {LandDisplayLeft} from 'src/components/main/Land/LandDisplay/LandDisplayInfo/LandDisplayLeft/LandDisplayLeft'
import {LandDisplayRight} from 'src/components/main/Land/LandDisplay/LandDisplayInfo/LandDisplayRight/LandDisplayRight'
import Veintur from 'src/assets/image/nftTiers/6Veintur.svg'

export const LandDisplayInfo: FC<PropsType> = (props) => {
    return <div className={s.component}>
        <div className={classNames(s.plotHeader, sC.baseBgColor)}>
            {
                props.plotNumber !== 0
                    ? <>Veintur Plot #{props.plotNumber}</>
                    : <></>
            }

        </div>
        <div className={s.container}>
            <LandDisplayLeft className={sC.baseBgColor} plotImg={props.plotImg} leftTopImg={Veintur}/>
            <LandDisplayRight className={sC.baseBgColor} tokenID={props.tokenID}/>
        </div>
    </div>
}

type PropsType = {
    plotNumber: number
    plotImg: string
    tokenID: string
}
