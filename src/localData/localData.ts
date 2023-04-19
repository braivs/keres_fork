import {v1} from 'uuid'
import {
    InventoryDataType,
    LandType,
    MarketItemType,
    PlayerType,
    StakingInputDataType,
    StuffType, NftTiersDataType
} from 'src/common/types'
import playerAva from 'src/assets/image/tabBattle/playerAva.png'
import playerRating from 'src/assets/image/tabBattle/playerRating.png'
import chartImg from 'src/assets/image/tabStaking/KeresChartGroup.svg'

import Vox from 'src/assets/image/agents/Vox.png'
import vox from 'src/assets/image/agents/Vox.png'
import Zerah from 'src/assets/image/agents/Zerah.png'
import zerah from 'src/assets/image/agents/Zerah.png'
import Zerah_back from 'src/assets/image/agents/Zerah_back.png'
import ElonsoAurelio from 'src/assets/image/agents/ElonsoAurelio.png'
import Devorator2_single2 from 'src/assets/image/weapons/Devorator2_single2.png'
import Devorator1_single2 from 'src/assets/image/weapons/Devorator1_single2.png'
import bone_pistol_12 from 'src/assets/image/weapons/bone_pistol_12.png'
import bone_pistol_10 from 'src/assets/image/weapons/bone_pistol_10.png'
import AR2_single1 from 'src/assets/image/weapons/AR2_single1.png'
import w0005 from 'src/assets/image/weapons/w0005.png'
import BoneKnife4 from 'src/assets/image/weapons/BoneKnife4.png'
import Devorator_bone13 from 'src/assets/image/weapons/Devorator_bone13.png'
import image_removebg_2 from 'src/assets/image/lands/image_removebg_2.png'
import image_removebg_3 from 'src/assets/image/lands/image_removebg_3.png'
import {NftTiersImgs} from "src/common/helpers"

export const profileTopAgents: Array<StuffType> = [
    {id: v1(), order: 1, specification: 'Top Agent', name: 'Serah', stuffType: 'character', ratio: 58, picture: zerah},
    {id: v1(), order: 3, specification: '3rd Agent', name: 'Serah', stuffType: 'character', ratio: 46, picture: zerah},
    {id: v1(), order: 2, specification: '2nd Agent', name: 'Vox', stuffType: 'character', ratio: 52, picture: vox},
    {id: v1(), order: 4, specification: '4th Agent', name: 'Serah', stuffType: 'character', ratio: 42, picture: zerah},
]

export const profileTopWeapons: Array<StuffType> = [
    {
        id: v1(),
        order: 1,
        specification: 'Top Weapon',
        name: 'Devorator',
        stuffType: 'weapon',
        ratio: 58,
        picture: Devorator1_single2
    },
    {
        id: v1(),
        order: 3,
        specification: '3rd weapon',
        name: 'Magnum',
        stuffType: 'weapon',
        ratio: 43,
        picture: bone_pistol_12
    },
    {
        id: v1(),
        order: 2,
        specification: '2nd Weapon',
        name: 'AR-2',
        stuffType: 'weapon',
        ratio: 49,
        picture: AR2_single1
    },
    {id: v1(), order: 4, specification: '4th Weapon', name: 'Pistol', stuffType: 'weapon', ratio: 41, picture: w0005},
]

export const blankInventoryElement: Omit<InventoryDataType, 'id'> = {
    weapons: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {
        id: v1(),
        value: ''
    }],
    agents: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}],
    sidekicks: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}],
    gears: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}],
    lands: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}]
}

export const InventoryData: Array<InventoryDataType> = [
    {
        id: v1(),
        weapons: [{id: v1(), value: Devorator2_single2}, {id: v1(), value: Devorator1_single2}, {
            id: v1(),
            value: AR2_single1
        }, {id: v1(), value: bone_pistol_12}, {id: v1(), value: ''}],
        agents: [{id: v1(), value: vox}, {id: v1(), value: zerah}, {id: v1(), value: ''}],
        sidekicks: [{id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}],
        gears: [{id: v1(), value: BoneKnife4}, {id: v1(), value: ''}, {id: v1(), value: ''}, {id: v1(), value: ''}],
        lands: [{id: v1(), value: image_removebg_2}, {id: v1(), value: ''}, {id: v1(), value: ''}, {
            id: v1(),
            value: ''
        }]
    },
    {id: v1(), ...blankInventoryElement},
    {id: v1(), ...blankInventoryElement},
    {id: v1(), ...blankInventoryElement},
    {id: v1(), ...blankInventoryElement},

]

export const marketData: Array<MarketItemType> = [
    {
        id: v1(),
        itemName: 'Vox Tauxor',
        secondHeader: 'Guardian',
        mainImg: Vox,
        price: 5000.00,
        nftTier: 'Veintur',
        type: 'agent'
    },
    {
        id: v1(),
        itemName: 'Devorator',
        secondHeader: 'Sanguiem',
        mainImg: Devorator2_single2,
        price: 34.65,
        nftTier: 'Xantor',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'AR-2',
        secondHeader: 'Yellow',
        mainImg: AR2_single1,
        price: 12.35,
        nftTier: 'Xylium',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Serah Egilsdottir',
        secondHeader: 'Guardian',
        mainImg: Zerah,
        price: 52.45,
        nftTier: 'Xylium',
        type: 'agent',
        secondImg: Zerah_back
    },
    {
        id: v1(),
        itemName: 'Knife',
        secondHeader: 'Keresian Bone',
        mainImg: BoneKnife4,
        price: 207.89,
        nftTier: 'Xantor',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Devorator',
        secondHeader: 'Blue',
        mainImg: Devorator1_single2,
        price: 14.80,
        nftTier: 'Xylium',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Magnum',
        secondHeader: 'bone',
        mainImg: bone_pistol_10,
        price: 10.00,
        nftTier: 'Xantor',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Elonso Aurelio',
        secondHeader: 'Mercenary',
        mainImg: ElonsoAurelio,
        price: 50.00,
        nftTier: 'Xylium',
        type: 'agent'
    },
    {
        id: v1(),
        itemName: 'Devorator',
        secondHeader: 'Keresian  Bone',
        mainImg: Devorator_bone13,
        price: 300.00,
        nftTier: 'Weiznig',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Pistol',
        secondHeader: 'Blood-letting',
        mainImg: w0005,
        price: 5.55,
        nftTier: 'Xylium',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Magnum',
        secondHeader: 'Keresian Bone',
        mainImg: bone_pistol_12,
        price: 72.80,
        nftTier: 'Weiznig',
        type: 'weapon'
    },
    {
        id: v1(),
        itemName: 'Land plot',
        secondHeader: 'Veintur',
        mainImg: image_removebg_2,
        price: 7000.00,
        nftTier: 'Veintur',
        type: 'land'
    },
]

export const localPlayers: Array<PlayerType> = [
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 11, right: 13}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'win'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 13, right: 8}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'lose'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 11, right: 13}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'win'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 13, right: 8}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'lose'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 11, right: 13}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'win'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 11, right: 13}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'win'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 13, right: 8}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'lose'
    },
    {
        id: v1(),
        ava: playerAva,
        map: {name: 'Map name', score: {left: 11, right: 13}},
        K: 11,
        D: 17,
        A: 11,
        ratingImg: playerRating,
        result: 'win'
    },
]

export const stakingKeresData: StakingInputDataType = {
    token: 'Keres',
    headerText: 'Keres Staking',
    priceMarketTotalData1: [
        {value1: 'Total Staked', value2: '335,532,123'},
        {value1: 'Total Liquid', value2: '359,934,434'},
        {value1: 'Volume 24h', value2: '$267,655'},
    ],
    priceMarketTotalData2: [
        {value1: 'Total Staked', value2: '335,532,123'},
        {value1: 'Total Liquid', value2: '359,934,434'},
        {value1: 'Volume 24h', value2: '$267,655'},
    ],
    chart: {
        conversionWay: 'KRS - Hydro',
        chartImg: chartImg,
    },
    blocksLeftLessRightBiggerData: [
        {id: v1(), leftText: 'Liquid KeresStaking', rightNumber: 3333.392},
        {id: v1(), leftText: 'Staked KeresStaking', rightNumber: 33234.98},
        {id: v1(), leftText: 'KeresStaking Balance', rightNumber: 33568.372},
    ],
}

export const stakingHydroData: StakingInputDataType = {
    token: 'Hydro',
    headerText: 'Hydro Staking',
    priceMarketTotalData1: [
        {value1: 'Total Staked', value2: '335,532,123'},
        {value1: 'Total Liquid', value2: '359,934,434'},
        {value1: 'Volume 24h', value2: '$267,655'},
    ],
    priceMarketTotalData2: [
        {value1: 'Total Staked', value2: '335,532,123'},
        {value1: 'Total Liquid', value2: '359,934,434'},
        {value1: 'Volume 24h', value2: '$267,655'},
    ],
    chart: {
        conversionWay: 'Hydro - USDT',
        chartImg: chartImg,
    },
    blocksLeftLessRightBiggerData: [
        {id: v1(), leftText: 'Liquid Hydro', rightNumber: 3333.392},
        {id: v1(), leftText: 'Staked Hydro', rightNumber: 33234.98},
        {id: v1(), leftText: 'Hydro Balance', rightNumber: 33568.372},
    ],
}

export const lands: Array<LandType> = [
    {id: v1(), plotNumber: 313, plotImg: image_removebg_2, tokenId: '922b8EC71', bullets: 3, ale: 0.3, nectar: 0.3},
    {id: v1(), plotNumber: 416, plotImg: image_removebg_3, tokenId: '155c8EC71', bullets: 3, ale: 0.9, nectar: 0.9},
]

export const nftTiersData: Array<NftTiersDataType> = [
    {
        id: 1,
        tierImg: NftTiersImgs('Xylium'),
        tierName: 'Xylium',
        skinDesign: 20,
        skinPerDesigns: '1,000,000',
        burnValue: 1
    },
    {
        id: 2,
        tierImg: NftTiersImgs('Xantor'),
        tierName: 'Xantor',
        skinDesign: 15,
        skinPerDesigns: '500,000',
        burnValue: 5
    },
    {
        id: 3,
        tierImg: NftTiersImgs('Weiznig'),
        tierName: 'Weiznig',
        skinDesign: 12,
        skinPerDesigns: '100,000',
        burnValue: 10
    },
    {
        id: 4,
        tierImg: NftTiersImgs('Kralukur'),
        tierName: 'Kralukur',
        skinDesign: 8,
        skinPerDesigns: '10,000',
        burnValue: 100
    },
    {
        id: 5,
        tierImg: NftTiersImgs('Trixaz'),
        tierName: 'Trixaz',
        skinDesign: 5,
        skinPerDesigns: '1,000',
        burnValue: 1000
    },
    {
        id: 6,
        tierImg: NftTiersImgs('Veintur'),
        tierName: 'Veintur',
        skinDesign: 3,
        skinPerDesigns: '100',
        burnValue: 10000
    }
]