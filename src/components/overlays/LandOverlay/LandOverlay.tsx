import React, {useState} from 'react'
import s from './LandOverlay.module.scss'
import {useDispatch} from 'react-redux'
import {setOverlayLandConfirmOrClaimShow} from 'src/redux/overlaySlice'
import KeresLogo from 'src/assets/image/tokens/keres.svg'
import HydroLogo from 'src/assets/image/tokens/hydro.svg'
import cn from 'classnames'
import {CustomSelect, OptionType} from 'src/common/CustomSelect/CustomSelect'
import {LandSelectStyles} from 'src/components/overlays/LandOverlay/LandSelectStyles'
import {useAppSelector} from 'src/hooks/hooks'
import {CommonOverlay} from "src/common/CommonOverlay/CommonOverlay"


export const LandOverlay = () => {
    const dispatch = useDispatch()
    const {show, version, tokenId, amountValue, bullets, ale, nectar} = useAppSelector((state) => state.overlay.land)

    const onCloseOverlay = () => {
        dispatch(setOverlayLandConfirmOrClaimShow({
                show: false,
                version: 'none',
                tokenId: '',
                amountValue: '',
                bullets: 0,
                ale: 0,
                nectar: 0
            }
        ))
    }

    const headerSelector = () => {
        switch (version) {
            case 'stake':
                return 'Confirm the amount you wish to stake.'
            case 'sacrifice':
                return 'Confirm the amount you wish to sacrifice.'
            case 'rewards':
                return 'Claim Rewards'
            default:
                return ''
        }
    }

    const buttonTextSelector = () => {
        switch (version) {
            case 'stake':
                return 'Confirm stake'
            case 'sacrifice':
                return 'Confirm sacrifice'
            case 'rewards':
                return 'Claim Rewards'
            default:
                return ''
        }
    }

    const tokenNameSelector = () => {
        switch (version) {
            case 'stake':
                return 'HYDRO'
            case 'sacrifice':
                return 'KERES'
            case 'rewards':
                return ''
            default:
                return ''
        }
    }

    const options: Array<OptionType> = [ /* for select */
        {value: 'GranitePyramid', label: 'Granite Pyramid'},
        {value: 'Factory', label: 'Factory'},
        {value: 'Lounge', label: 'Lounge'},
        {value: 'Brewery', label: 'Brewery'},
    ]

    const [currentBuild, setCurrentBuild] = useState(options[0].label)

    if (!show) return null


    return (
        <CommonOverlay onCloseClick={onCloseOverlay} overlayContainerClass={s.overlayContainer}>
            {version !== 'none' &&
              <img className={s.tokenLogo} src={version === 'stake' ? HydroLogo : KeresLogo} alt="token logo"/>}
            <div className={s.header}>{headerSelector()}</div>
            {
                (version === 'stake' || version === 'sacrifice') && <>
                <div className={s.subHeader}>token id</div>
                <div className={cn(s.output, s.outputSmall)}>{tokenId}</div>
                <div className={s.subHeader}>Amount</div>
                <div className={cn(s.output, s.outputSmall)}>{amountValue} <span
                  className={s.tokenName}>{tokenNameSelector()}</span></div>
              </>
            }
            {
                version === 'stake' && <>
                <div className={s.subHeader}>Use resources for</div>
                <CustomSelect options={options} setState={setCurrentBuild} placeholder={'Select build'}
                              defaultValue={options[0]} styles={LandSelectStyles}/>
              </>
            }
            {
                version === 'rewards' && <>
                <div className={s.subHeader}>Bullets</div>
                <div className={cn(s.output, s.outputSmall)}>{bullets}</div>
                <div className={s.subHeader}>Ale</div>
                <div className={cn(s.output, s.outputSmall)}>{ale}L</div>
                <div className={s.subHeader}>Nectar</div>
                <div className={cn(s.output, s.outputSmall)}>{nectar}L</div>
              </>
            }
            <div className={s.subHeader}>This will</div>
            <div className={cn(s.output, s.outputBig)}>
                {
                    (version === 'stake') && <>
                    <div>
                      Stake {amountValue} {tokenNameSelector()}s towards constructing a {currentBuild}.
                    </div>
                    <div>
                      The hydro tokens will be staked indefinitely
                    </div>
                  </>
                }
                {
                    version === 'sacrifice' && <>
                    <div>
                      Sacrifice {amountValue} {tokenNameSelector()} towards forging bullets for the battle arena.
                    </div>
                    <div>
                      The aproximate yield per day is 1 bullet.
                    </div>
                    <div>
                      The keres tokens sacrificed will be burned.
                    </div>
                  </>
                }
                {
                    version === 'rewards' && <>
                    <div>
                      Once claimed the rewards will be liquid in your account and ready to be spent.
                    </div>
                  </>
                }
            </div>
            <button>{buttonTextSelector()}</button>
        </CommonOverlay>
    )
}

