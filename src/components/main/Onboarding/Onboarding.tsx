import React, {useState} from 'react'
import {texts} from './OnboardingText/texts'
import yaldavazin from 'src/assets/image/yaldavazin.png'
import s from './Onboarding.module.scss'
import {StyledMuiButton} from 'src/common/StyledMuiButton'

export const Onboarding: React.FC<PropsType> = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const changeTextIndex = () => {
        currentIndex === 8 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    }

    return (
        <>
            <div className={s.container}>
                <img src={yaldavazin} alt="yaldavazin" className={s.yaldavazin}/>

                <div className={s.textRectangle}>
                    <div className={s.rectangleContainer}>
                        <div className={s.text}>
                            {texts[currentIndex]} {/* Current index of OnboardingText */}
                        </div>
                        <StyledMuiButton className={s.button} fullWidth={true} onClick={changeTextIndex}>Next</StyledMuiButton>
                    </div>
                </div>
            </div>
        </>
    )
}

type PropsType = {
    onClick?: () => {}
}

