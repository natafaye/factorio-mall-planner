
const PREFIXES = [
    "kr-", "vc-", "se-", "Arci-", "rare-metal-", "aai-", 
    "matter-fusion-", "steam-to-", "cryonite-to-", "bio-methane-to-"
]
const SUFFIXES = [
    "-alt", "-alternate", "-cryonite", 
    "-fast", "-normal", "-slow", "-lithium", "-iridium", 
    "-cleaning", "-cleaning-space", "-from-fish", "-fish", "-from-wood", "-coal",
    "-se-holmium-ore", "-se-iridium-ore", "-se-beryllium-ore", "-se-scrap", 
    "-with-sand", "-sand", "-copper-ore", "-iron-ore", "-raw-imersite", "-raw-rare-metals",
    "-fixed", "-no-vulcanite", "-vulcanite", "-from-stone", "-methane", "-from-biomass", 
    "-decontamination", "-from-vitamelange", "-crude-oil", "-with-ammonia", 
    "-with-hydrogen-chloride", "-with-water", "-plus", "-growing",
    "-from-atmosphere", "-with-nutrients", "-from-solid-fuel", "-chemical",
    "-multispectral-1", "-multispectral-2", "-multispectral-3", "-ir", "-ho"
]

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