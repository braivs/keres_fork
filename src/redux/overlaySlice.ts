import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ImgUploadModeType} from "src/common/types"

const initialState: OverlayStateType = {
    walletAndSettings: {
        show: false,
        currentValue: 'assets',
    },
    inventoryShow: false,
    addFriendShow: false,
    land: {
        show: false,
        version: 'none',
        tokenId: '',
        amountValue: '',
        bullets: 0,
        ale: 0,
        nectar: 0,
    },
    marketAgentWeapon: {
        show: false,
        selectedItemId: ''
    },
    nftTiersShow: false,
    createUserNameShow: false,
    confirmEmailShow: false,
    registerShow: false,
    loginShow: false,
    imgUpload: {
        imgUploadShow: false,
        imgUploadMode: 'avatar'
    },
    statusEditOverlayShow: false,
    helpOverlayShow: false
}

export const overlaySlice = createSlice({
    name: 'overlay',
    initialState: initialState,
    reducers: {
        setOverlayWalletAndSettingsShow(state, action: PayloadAction<{ show: boolean }>) {
            state.walletAndSettings.show = action.payload.show
        },
        setOverlayWalletAndSettingsCurrentValue(state, action: PayloadAction<{ currentValue: OverlayCurrentValueType }>) {
            state.walletAndSettings.currentValue = action.payload.currentValue
        },
        setOverlayInventoryShow(state, action: PayloadAction<{ inventoryShow: boolean }>) {
            state.inventoryShow = action.payload.inventoryShow
        },
        setOverlayLandConfirmOrClaimShow(state, action: PayloadAction<{
            show: boolean,
            version: OverlayVersionType,
            tokenId: string,
            amountValue: string,
            bullets: number,
            ale: number,
            nectar: number
        }>) {
            state.land = action.payload
        },
        setOverlayAgentWeaponShow(state, action: PayloadAction<{ show: boolean, selectedItemId: string }>) {
            state.marketAgentWeapon = action.payload
        },
        setOverlayNFTTiersShow(state, action: PayloadAction<{ nftTiersShow: boolean }>) {
            state.nftTiersShow = action.payload.nftTiersShow
        },
        setOverlayAddFriendShow(state, action: PayloadAction<{ addFriendShow: boolean }>) {
            state.addFriendShow = action.payload.addFriendShow
        },
        setCreateUserNameShow(state, action: PayloadAction<{ createUserNameShow: boolean }>) {
            state.createUserNameShow = action.payload.createUserNameShow
        },
        setConfirmEmailShow(state, action: PayloadAction<{ show: boolean }>) {
            state.confirmEmailShow = action.payload.show
        },
        setLoginShow(state, action: PayloadAction<boolean>) {
            state.loginShow = action.payload
        },
        setRegisterShow(state, action: PayloadAction<boolean>) {
            state.registerShow = action.payload
        },
        setImgUploadShow(state, action: PayloadAction<{show: boolean, mode: ImgUploadModeType}>) {
            state.imgUpload.imgUploadShow = action.payload.show
            state.imgUpload.imgUploadMode = action.payload.mode
        },
        setConfirmEmailOverlayShow(state, action: PayloadAction<boolean>) {
            state.statusEditOverlayShow = action.payload
        },
        setHelpOverlayShow(state, action: PayloadAction<boolean>) {
            state.helpOverlayShow = action.payload
        },
    },

})

export const overlayReducer = overlaySlice.reducer
export const {
    setOverlayWalletAndSettingsShow,
    setOverlayInventoryShow,
    setOverlayWalletAndSettingsCurrentValue,
    setOverlayLandConfirmOrClaimShow,
    setOverlayNFTTiersShow,
    setOverlayAgentWeaponShow,
    setOverlayAddFriendShow,
    setCreateUserNameShow,
    setConfirmEmailShow,
    setRegisterShow,
    setLoginShow,
    setImgUploadShow,
    setConfirmEmailOverlayShow,
    setHelpOverlayShow
} = overlaySlice.actions

// types
type OverlayCurrentValueType = 'assets' | 'settings'
export type OverlayVersionType = 'stake' | 'sacrifice' | 'rewards' | 'none'
export type OverlayLandType = {
    show: boolean
    version: OverlayVersionType
    tokenId: string
    amountValue: string
    bullets: number
    ale: number
    nectar: number
}
export type OverlayWalletAndSettingsType = {
    show: boolean
    currentValue: OverlayCurrentValueType
}
export type OverlayMarketAgentWeaponType = {
    show: boolean
    selectedItemId: string
}

export type ImageUploadType = {
    imgUploadShow: boolean
    imgUploadMode: ImgUploadModeType
}

export type OverlayStateType = {
    walletAndSettings: OverlayWalletAndSettingsType
    inventoryShow: boolean
    addFriendShow: boolean
    land: OverlayLandType
    marketAgentWeapon: OverlayMarketAgentWeaponType
    nftTiersShow: boolean
    createUserNameShow: boolean
    confirmEmailShow: boolean
    registerShow: boolean
    loginShow: boolean
    imgUpload: ImageUploadType
    statusEditOverlayShow: boolean
    helpOverlayShow: boolean
}

//todo: combine similar reducers with flag and case