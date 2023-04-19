import {friendshipsType, NftTiersTypes} from "src/common/types"
import Xylium from "src/assets/image/nftTiers/1Xylium.svg"
import Xantor from "src/assets/image/nftTiers/2Xantor.svg"
import Weiznig from "src/assets/image/nftTiers/3Weiznig.svg"
import Kralukur from "src/assets/image/nftTiers/4Kralukur.svg"
import Trixaz from "src/assets/image/nftTiers/5Trixaz.svg"
import Veintur from "src/assets/image/nftTiers/6Veintur.svg"

export const getFileNameWithoutExtension = (filename: string) => filename.substring(0, filename.lastIndexOf('.'))
export const NftTiersImgs = (rating: NftTiersTypes) => {
    switch (rating) {
        case 'Xylium':
            return Xylium
        case 'Xantor':
            return Xantor
        case 'Weiznig':
            return Weiznig
        case 'Kralukur':
            return Kralukur
        case 'Trixaz':
            return Trixaz
        case 'Veintur':
            return Veintur
        default:
            return ''
    }
}
// this is alternative of type number checker that check is string contain only numbers
export const numberChecker = (value: string, callback: (value: string) => void) => {
    if (!isFinite(+value)) return
    else callback(value.trim())
}
//analog of @mixin mainColorOpacity + mainBackgroundColorOpacity for selector
export const mainColorOpacity = (opacity: number) => {
    return `rgba(255, 255, 255, ${opacity})`
}
//return combinedId for ChatId Messages and Friendship
export const combinedId = (user1: string, user2: string) => {
    if (user1 > user2) return user1 + user2
    else return user2 + user1
}
export const filterIdsArrayExceptActiveUserId = (array: Array<friendshipsType>, activeUserId: string) => {
    return array.reduce((acc: Array<string>, el: friendshipsType) => { /*return array of ids, except active userId*/
        const ids = Object.keys(el.docData)
        const filteredIds = ids.filter((id) => id !== activeUserId)
        return [...acc, ...filteredIds]
    }, [])
}

export function onlyLettersAndNumbers(str: string) {
    return /^[A-Za-z0-9]*$/.test(str)
}

export function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            resolve(img)
        }
        img.onerror = img.onabort = function () {
            reject(src)
        }
        img.src = src
    })
}