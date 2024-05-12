import classNames from "classnames"
import ItemIcon from "../ItemIcon"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props = {
    options: Array<{ name: string, count: number }>
    value: string
    onChange: (newValue: string) => void
}

export default function IngredientFilter({ options, value, onChange }: Props) {
    const [expanded, setExpanded] = useState(false)

    const handleSelect = (name: string) => {
        onChange(name)
        setExpanded(false)
    }

    return (
        <div className="relative m-1">
            <button
                disabled={options.length === 0}
                className={classNames(
                    "bg-stone-600 rounded-lg flex items-center gap-3",
                    value === "" ? "p-3" : "p-2",
                    options.length === 0 && "text-stone-400"
                )}
                onClick={() => setExpanded(!expanded)}
            >
                {value ? <ItemIcon name={value} size="md" /> : "No Filter"}
                <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} />
            </button>
            {expanded && (
                <div
                    className="bg-stone-700 -mt-2 flex flex-col max-h-96 overflow-y-auto
                    absolute shadow-lg shadow-black rounded-b-lg rounded-tr-lg z-10 overflow-x-hidden"
                >
                    <button
                        onClick={() => handleSelect("")}
                        className={classNames(
                            "py-3 px-4 text-nowrap hover:bg-stone-600",
                            value === "" && "bg-green-800"
                        )}
                    >
                        No Filter
                    </button>
                    {options.map(ingredient => (
                        <button
                            key={ingredient.name}
                            onClick={() => handleSelect(ingredient.name)}
                            className={classNames(
                                "p-2 px-4 flex-shrink-0 flex justify-center items-center gap-1 hover:bg-stone-600",
                                value === ingredient.name && "bg-green-800" 
                            )}
                        >
                            <ItemIcon name={ingredient.name} size="md" />
                            {ingredient.count}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}