import React from 'react'
import s from './AssetsContent.module.scss'

export const AssetsContent = () => {
    return <div className={s.component}>
        <div className={s.tokensAndCredits}>
            <div className={s.assetElement}>
                <div>Keres Tokens</div><div>132443.020</div>
            </div>
            <div className={s.assetElement}>
                <div>Keres Credits</div><div>20000.020</div>
            </div>
            <div className={s.assetElement}>
                <div>Hydro Tokens</div><div>33333.020</div>
            </div>
        </div>
        <div className={s.buttons}>
            <button>BUY</button>
            <button>SEND</button>
        </div>

    </div>



}