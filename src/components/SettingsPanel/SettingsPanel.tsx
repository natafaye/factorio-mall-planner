import { setSettings, useAppDispatch, useSelectSettings } from "../../redux"


export default function SettingsPanel() {
    const settings = useSelectSettings()
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-wrap p-3 gap-5 gap-y-3">
            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    className="bg-stone-400 accent-blue-400"
                    checked={settings?.showAaiIcons}
                    onChange={({ target }) => dispatch(setSettings({ showAaiIcons: target.checked }))}
                />
                AAI icons
            </label>
            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    className="bg-stone-400"
                    checked={settings?.showKrIcons}
                    onChange={({ target }) => dispatch(setSettings({ showKrIcons: target.checked }))}
                />
                Krastorio 2 icons
            </label>
            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    className="bg-stone-400 "
                    checked={settings?.showSeIcons}
                    onChange={({ target }) => dispatch(setSettings({ showSeIcons: target.checked }))}
                />
                Space Exploration icons
            </label>
        </div>
    )
}