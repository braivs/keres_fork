import React from 'react'
import s from './LandStakingRight.module.scss'
import sC from 'src/common/styles/Common.module.scss'
import classNames from 'classnames'
import GlassPyramid from 'src/assets/image/tabLand/Glass-pyramid.svg'
import BasePyramid from 'src/assets/image/tabLand/Base pyramid.svg'

export const LandStakingRight = () => {
    return <div className={s.component}>
        <div className={classNames(sC.baseBgColor, s.header)}>
            upgrade path
        </div>
        <div className={classNames(sC.baseBgColor, s.content)}>
            <div className={s.pyramid1}>
                <div className={s.left}>
                    <div className={s.mainText}>1. Crystal<br/>Pyramid</div>
                    <div className={s.subText}>stake 100 Hydro</div>
                    <div className={s.mainText}>2. Hydro makes<br/>Oxygen</div>
                    <div className={classNames(s.subText, s.noMargin)}>stake 100 Hydro</div>
                </div>
                <div className={s.right}>
                    <img src={GlassPyramid} alt="pyramid1"/>
                    <div className={s.left}></div>
                </div>
            </div>
            <div className={s.pyramid2}>
                <div className={s.left}>
                    <img src={BasePyramid} alt=""/>
                </div>
                <div className={s.right}>
                    <div className={s.mainText}>3. granite<br/>pyramid</div>
                    <div className={s.subText}>stake 100000 Keres</div>
                    <div className={s.mainText}>4. Factory</div>
                    <div className={s.subText}>stake 1000000</div>
                    <div className={s.mainText}>5. Lounge</div>
                    <div className={s.subText}>stake 100000 Keres</div>
                    <div className={s.mainText}>6.Brewery</div>
                    <div className={s.subText}>stake 1000000 Keres</div>
                </div>
            </div>
        </div>
    </div>
}

