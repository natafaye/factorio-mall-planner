import { useEffect, useState } from "react"

const cache = new Map<string, { width: number, height: number, path: string }>()

type UseImageProps = {
    imageName: string, 
    fallbackName: string, 
    folderPath: string,
    defaultSize: { width: number, height: number }
}

export const useImage = ({imageName, fallbackName, folderPath}: UseImageProps) => {
    // Initial state is the info from the cache, 
    // or the fallback (which will be overwritten if the image exists)
    const [imageDetails, setImageDetails] = useState(() => cache.get(imageName) || {
        width: 64,
        height: 64,
        path: folderPath + fallbackName + ".png"
    })
    
    useEffect(() => {
        // If this image is already in the cache, then the image details were already set
        if(cache.has(imageName)) return
        // Load in the image to measure its size and make sure it exists
        const image = new Image()
        image.onload = () => {
            const loadedDetails = {
                width: image.width,
                height: image.height,
                path: image.src
            }
            // Overwrite the image details with the loaded details and set the cache
            setImageDetails(loadedDetails)
            cache.set(imageName, loadedDetails)
        }
        // Set the image path to start the loading in
        image.src = folderPath + imageName + ".png"
    }, [imageName, folderPath])

    return imageDetails
}