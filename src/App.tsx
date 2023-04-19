import React from 'react'
import './App.module.scss'
import {Header} from './components/header/Header'
import {Main} from './components/main/Main'
import s from './App.module.scss'
import {WalletAndSettingsOverlay} from './components/overlays/WalletAndSettingsOverlay/WalletAndSettingsOverlay'
import {InventoryOverlay} from './components/overlays/InventoryOverlay/InventoryOverlay'
import {AddFriendOverlay} from 'src/components/overlays/AddFriendOverlay/AddFriendOverlay'
import {LandOverlay} from 'src/components/overlays/LandOverlay/LandOverlay'
import {MarketAgentWeaponOverlay} from 'src/components/overlays/MarketAgentWeaponOverlay/MarketAgentWeaponOverlay'
import {NFTTiersOverlay} from 'src/components/overlays/NFTTiersOverlay/NFTTiersOverlay'
import {CreateUserNameOverlay} from 'src/components/overlays/CreateUserNameOverlay/CreateUserNameOverlay'
import {ConfirmEmailOverlay} from "src/components/overlays/ConfirmEmailOverlay/ConfirmEmailOverlay"
import {RegisterOverlay} from "src/components/overlays/RegisterOverlay/RegisterOverlay"
import {LoginOverlay} from "src/components/overlays/LoginOverlay/LoginOverlay"
import {ImgUploadOverlay} from "src/components/overlays/ImgUploadOverlay/ImgUploadOverlay"
import {StatusEditOverlay} from "src/components/overlays/StatusEditOverlay/StatusEditOverlay"
import {HelpOverlay} from "src/components/overlays/HelpOverlay/HelpOverlay"

const App = () => {
    return (
        <div className={s.app}>
            <div className={s.content}>
                <Header/>
                <Main/>
                <WalletAndSettingsOverlay/>
                <InventoryOverlay/>
                <AddFriendOverlay/>
                <LandOverlay/>
                <MarketAgentWeaponOverlay/>
                <NFTTiersOverlay/>
                <RegisterOverlay />
                <LoginOverlay />
                <CreateUserNameOverlay/>
                <ConfirmEmailOverlay />
                <ImgUploadOverlay/>
                <StatusEditOverlay/>
                <HelpOverlay />
            </div>
        </div>
    )
}

export default App