import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatchType, RootStateType} from 'src/redux/store'
import {useEffect, useState} from "react"
import {preloadImage} from "src/common/helpers"

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export default function useImagePreloader(imageList: string[]) {
    const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false)

    useEffect(() => {
        let isCancelled = false

        async function effect() {

            if (isCancelled) {
                return
            }

            const imagesPromiseList: Promise<any>[] = []
            for (const i of imageList) {
                imagesPromiseList.push(preloadImage(i))
            }

            await Promise.all(imagesPromiseList)

            if (isCancelled) {
                return
            }

            setImagesPreloaded(true)
        }

        effect()

        return () => {
            isCancelled = true
        }
    }, [imageList])

    return { imagesPreloaded }
}