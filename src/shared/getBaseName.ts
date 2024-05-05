import type { SettingsData } from "../components/Settings"
import { ICON_ALTERNATES } from "./iconAlternates"

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
const previousSettings = null

export const getBaseName = (name: string, settings?: SettingsData) => {
    // Check the cache
    const cacheName = optionallyAddAlternateIconSuffix(name, settings)
    if(previousSettings === settings && cache.has(cacheName))
        return cache.get(cacheName) as string

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

    baseName = optionallyAddAlternateIconSuffix(baseName, settings)

    console.log(baseName)

    // Save to cache
    cache.set(name, baseName)

    return baseName
}

const optionallyAddAlternateIconSuffix = (name: string, settings?: SettingsData) => {
    // SE trumps KR which trumps AAI
    console.log(settings)
    console.log(ICON_ALTERNATES.aai.includes(name))
    if(settings?.showSeIcons && ICON_ALTERNATES.se.includes(name))
        return name + "-se"
    else if(settings?.showKrIcons && ICON_ALTERNATES.kr.includes(name))
        return name + "-kr"
    else if(settings?.showAaiIcons && ICON_ALTERNATES.aai.includes(name))
        return name + "-aai"
    return name
}