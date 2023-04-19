import React from 'react'
import s from './Main.module.scss'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Onboarding} from './Onboarding/Onboarding'
import {Profile} from './Profile/Profile'
import {Friends} from './Friends/Friends'
import {Battle} from 'src/components/main/Battle/Battle'
import {Staking} from 'src/components/main/Staking/Staking'
import {Marketplace} from 'src/components/main/Marketplace/Marketplace'
import {Land} from 'src/components/main/Land/Land'
import {Casino} from 'src/components/main/Casino/Casino'

export const Main = () => {
    return (
        <div className={s.main}>
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/onboarding'} element={<Onboarding/>}/>
                <Route path={'/friends'} element={<Friends/>}/>
                <Route path={'/battle'} element={<Battle/>}/>
                <Route path={'/staking'} element={<Staking/>}/>
                <Route path={'/market'} element={<Marketplace />}/>
                <Route path={'/land'} element={<Land />}/>
                <Route path={'/casino'} element={<Casino />}/>
                <Route path="/" element={<Navigate replace to="/onboarding"/>}/>
            </Routes>

        </div>
    )
}