import React from 'react';

export const OnboardingText1: React.FC<PropsType> = () => {

    return (
        <>
            <div>
                Hear ye, child of the void, for how low has humanity sunk..
            </div>
            <div>
                Let me initiate thee into the mysteries of the Keres so that you may gaze upon the realms of the other side.
            </div>
            <div>
                Sitra Ahra awaits...
            </div>
        </>
    )
}

type PropsType = {
    onClick?: (value: string) => void
}