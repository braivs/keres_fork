import { Timestamp, FieldValue } from '@firebase/firestore-types'

export type StuffType = {
    id?: string
    order: number
    specification: string
    name: string
    stuffType: 'character' | 'weapon'
    ratio: number
    className?: string
    picture: string
}

export type InventoryElementType = {id: string, value: string}

// for typing array of fixed length https://github.com/microsoft/TypeScript/pull/40002
type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export type InventoryDataType = {
    id: string
    weapons: TupleOf<InventoryElementType, 5>,
    agents: TupleOf<InventoryElementType, 3>,
    sidekicks: TupleOf<InventoryElementType, 4>,
    gears: TupleOf<InventoryElementType, 4>,
    lands: TupleOf<InventoryElementType, 4>,
}

export type MessageModeType = 'text' | 'image'

export type MessageType = {
    id: string
    text: string
    from: string
    to: string
    createdAt: FieldValue | Timestamp
    mode: MessageModeType
    filename: string | null
}

export type StateType = 'online' | 'offline'

export type UserType = {
    id: string
    email: string
    name: string
    state: StateType
    last_changed: FieldValue | Timestamp
    userStatus: string | null
    isAdmin: boolean
}

export type PlayerType = {
    id: string
    ava: string
    map: {
        name: string
        score: {
            left: number
            right: number
        }
    }
    K: number
    D: number
    A: number
    ratingImg: string
    result: 'win' | 'lose'
}

export type PriceMarketTotalDataType = Array<{value1: string, value2: string}>
export type StakingInputDataType = {
    token: 'Keres' | 'Hydro'
    headerText: string
    priceMarketTotalData1: PriceMarketTotalDataType
    priceMarketTotalData2: PriceMarketTotalDataType
    chart: {
        conversionWay: string
        chartImg: string
    }
    blocksLeftLessRightBiggerData: Array<{
        id: string
        leftText: string
        rightNumber: number
    }>
}

export type MarketItemType = {
    id: string
    itemName: string
    secondHeader: string
    price: number
    mainImg: string
    secondImg?: string
    nftTier: NftTiersTypes
    type: 'agent' | 'weapon' | 'land' | 'blank'
}
export type LandType = {
    id: string
    plotNumber: number
    plotImg: string
    tokenId: string
    bullets: number
    ale: number
    nectar: number
}
export type NftTiersTypes = 'Xylium' | 'Xantor' | 'Weiznig' | 'Kralukur' | 'Trixaz' | 'Veintur'

export type FriendsMode = 'friendsOnlineOffline' | 'addFriend' | 'requests'

export type ImgUploadModeType = 'avatar' | 'chat' | 'anotherUserAva'

export type StringNullType = string | null

export type friendshipsType = {id: string, docData: friendshipDocDataType}
export type friendshipDocDataType = {[id: string]: boolean}

declare global {
    interface Window {
        usePreloadImagesData?: Record<string, unknown[]>;
    }
}

export type NftTiersDataType = {
    id: number
    tierImg: string
    tierName: NftTiersTypes
    skinDesign: number
    skinPerDesigns: string
    burnValue: number
}

export type LoginStatusType = 'noLoggedIn' | 'preLogin' | 'loggedIn' | 'checking' | 'Logging in...' | 'Logging out...' | 'Checking email'
export type RegisterStatusType = 'unknown' | 'registered' | 'not registered'