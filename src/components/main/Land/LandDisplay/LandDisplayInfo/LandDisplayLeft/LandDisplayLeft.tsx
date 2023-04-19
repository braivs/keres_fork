import React, {FC} from 'react'
import s from './LandDisplayLeft.module.scss'
import classNames from 'classnames'

export const LandDisplayLeft: FC<PropsType> = (props) => {
    return <div className={classNames(s.component, props.className)}>
        { props.plotImg !== ''
            ? <>
                <img className={s.plotImg} src={props.plotImg} alt="plot"/>
                <img className={s.leftTopImg} src={props.leftTopImg} alt="leftTopImg"/>
            </>
            : <></>
        }
    </div>
}

type PropsType = {
    plotImg: string
    leftTopImg: string
    className?: string
}
