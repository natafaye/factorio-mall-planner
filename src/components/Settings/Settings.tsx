import { useSetSettings, useSettings } from "./SettingsContext"

type Props = {}

export default function Settings({ }: Props) {
    const settings = useSettings()
    const setSettings = useSetSettings()

    return (
        <div className="flex gap-5 p-3">
            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    className="bg-stone-400"
                    checked={settings?.showAaiIcons}
                    onChange={({ target }) => setSettings({ showAaiIcons: target.checked })}
                />
                AAI icons
            </label>
            <label className="flex gap-2 items-center">
                <input 
                type="checkbox" 
                className="bg-stone-400" 
                checked={settings?.showKrIcons}
                onChange={({ target }) => setSettings({ showKrIcons: target.checked })}
                />
                Krastorio 2 icons
            </label>
            <label className="flex gap-2 items-center">
                <input 
                type="checkbox" 
                className="bg-stone-400 " 
                checked={settings?.showSeIcons}
                onChange={({ target }) => setSettings({ showSeIcons: target.checked })}
                />
                Space Exploration icons
            </label>
        </div>
    )
}