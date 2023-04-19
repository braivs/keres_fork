import React, {FC} from 'react'
import s from './Stuff.module.scss'
import cn from 'classnames'
import {StuffType} from 'src/common/types'

export const Stuff: FC<StuffType> = (props) => {
    return <div className={s.component}>
        <div className={cn(props.className, s.container,
            props.stuffType === 'character' ? s.agent : s.weapon)}>
            <div className={cn(s.header,
                props.stuffType === 'character' ? s.agentHeader : s.weaponHeader)}>
                <div className={s.specification}>{props.specification}</div>
                <div className={s.name}>{props.name}</div>
            </div>
            <div className={cn(s.ratio,
                props.stuffType === 'character' ? s.agentRatio : s.weaponRatio)}>
                <div className={s.ratioText}>
                    {props.stuffType === 'character' ? <>WIN RATIO</> : <>KILL RATIO</>}
                </div>
                <div className={s.ratioValue}>{props.ratio}%</div>
            </div>
            <div className={props.stuffType === 'character'
                ? s.agentImgContainer : s.weaponImgContainer}>
                <img className={props.stuffType === 'character'
                    ? s.imgAgent : s.imgWeapon} src={props.picture} alt="img"/>
            </div>
        </div>

        {/*{props.stuffType === 'character' ? <div className={s.winKillText}>WIN RATION</div> :
            <div className={s.winKillText}>KILL RATIO</div>}
        <div className={s.ratio}>{props.ratio}%</div>*/}
    </div>
}