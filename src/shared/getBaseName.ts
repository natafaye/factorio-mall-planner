
const PREFIXES = ["kr-", "vc-", "se-", "Arci-", "rare-metal-", "aai-"]
const SUFFIXES = ["-alt", "-alternate", "-stone", "-holmium"]

const cache = new Map<string, string>()

export const getBaseName = (name: string) => {
    // Check the cache
    if(cache.has(name))
        return cache.get(name) as string
    let baseName = name
    
    // Strip off all prefixes
    let prefix = PREFIXES.find(p => baseName.startsWith(p))
    while (prefix) {
        baseName = baseName.substring(prefix.length)
        prefix = PREFIXES.find(p => baseName.startsWith(p))
    }

    // Strip off all suffixes
    let suffix = SUFFIXES.find(s => baseName.endsWith(s))
    while(suffix) {
        baseName = baseName.substring(0, baseName.length - suffix.length)
        suffix = SUFFIXES.find(s => baseName.endsWith(s))
    }

    // Save to cache
    cache.set(name, baseName)

    return baseName
}