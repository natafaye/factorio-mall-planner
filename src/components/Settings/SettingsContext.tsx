import { createContext, useContext, useState } from "react";

const defaultSettings = {
    showAaiIcons: true,
    showKrIcons: false,
    showSeIcons: false
}

export type SettingsData = typeof defaultSettings

type SettingsState = [typeof defaultSettings, React.Dispatch<React.SetStateAction<SettingsData>>]

export const SettingsContext = createContext<SettingsState | null>(null)

export const useSettingsContextData = (): SettingsState => {
    return useState(defaultSettings)
}

export const useSettings = () => {
    const [settings] = useContext(SettingsContext) || []
    return settings
}

export const useSetSettings = () => {
    const [, setter] = useContext(SettingsContext) || []
    return (toSet: Partial<SettingsData>) => setter && 
        setter(oldSettings => ({ ...oldSettings, ...toSet }))
}
