import classNames from "classnames"
import ItemIcon from "../ItemIcon"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode, forwardRef, useEffect, useRef, useState } from "react"
import { v4 as uuid } from "uuid"
import { useClickOutside } from "./useClickOutside"

type Props<OptionType> = {
    options: Array<OptionType>
    value: string
    onSelectChange: (name: string) => void
    emptyText?: string
    renderOptionLabel?: (option: OptionType) => ReactNode
    allowEmpty?: boolean
    id?: string
    tabIndex?: number
    name?: string
}

interface WithForwardRefProps extends React.FC<Props<{ name: string }>> {
    <OptionType extends { name: string }>(props: Props<OptionType>): ReturnType<React.FC<Props<OptionType>>>
}

export const SimpleEntitySelector: WithForwardRefProps = forwardRef(({ 
    options, value, onSelectChange, 
    renderOptionLabel, 
    allowEmpty = true, emptyText = "None",
    id, name, tabIndex = 0
}, ref?: React.Ref<HTMLButtonElement>) => {
    const [expanded, setExpanded] = useState(false)

    const listId = useRef(id ? `list-${id}` : `list-${uuid()}`)
    const emptyOffset = allowEmpty ? 1 : 0

    const divRef = useRef<HTMLDivElement>(null)
    useClickOutside(divRef, () => setExpanded(false))

    // Handle focusing
    const listRef = useRef<HTMLUListElement>(null)
    const focusOption = (index: number) => {
        if (listRef.current && listRef.current.childNodes[index]) {
            (listRef.current.childNodes[index] as HTMLButtonElement).focus()
        }
    }
    useEffect(() => {
        if(expanded) {
            focusOption(0)
        }
    }, [expanded])
    
    // Allow navigating with up and down arrow keys and escaping
    const handleKeyDown = ({ key }: React.KeyboardEvent, index: number) => {
        if(key === "Escape") {
            setExpanded(false)
        } else if(key === "ArrowDown") {
            const nextIndex = (index + 1 - emptyOffset < options.length) ? index + 1 : 0
            focusOption(nextIndex)
            onSelectChange(allowEmpty ? 
                nextIndex === 0 ? "" : 
                    options[nextIndex - 1].name : 
                options[nextIndex].name
            )
        } else if(key === "ArrowUp") {
            const prevIndex = (index - 1 >= 0) ? index - 1 : options.length - 1 + emptyOffset
            focusOption(prevIndex)
            onSelectChange(allowEmpty ? 
                prevIndex === 0 ? "" : 
                    options[prevIndex - 1].name : 
                options[prevIndex].name
            )
        }
    }

    const handleClickSelect = (name: string) => {
        onSelectChange(name)
        setExpanded(false)
    }

    return (
        <div 
            ref={divRef}
            className="relative m-1"
        >
            <button
                type="button"
                ref={ref}
                id={id}
                name={name}
                role="combobox"
                tabIndex={tabIndex}
                aria-controls={listId.current}
                aria-haspopup="listbox"
                aria-expanded={expanded}
                disabled={options.length === 0}
                onClick={() => setExpanded(!expanded)}
                onKeyDown={(event) => handleKeyDown(
                    event, options.findIndex(o => o.name === value) + emptyOffset
                )}
                className={classNames(
                    "bg-stone-600 rounded-lg flex items-center gap-3",
                    value === "" ? "p-3" : "p-2",
                    options.length === 0 && "text-stone-400"
                )}
            >
                {value ? <ItemIcon name={value} size="md" /> : emptyText}
                <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} />
            </button>
            {expanded && (
                <ul
                    role="listbox"
                    id={listId.current}
                    ref={listRef}
                    className="bg-stone-700 -mt-2 flex flex-col max-h-96 overflow-y-auto
                    absolute shadow-lg shadow-black rounded-b-lg rounded-tr-lg z-10 overflow-x-hidden"
                >
                    { allowEmpty && (
                        <button
                            role="option"
                            aria-selected={value === ""}
                            onKeyDown={(event) => handleKeyDown(event, 0)}
                            onClick={() => handleClickSelect("")}
                            className={classNames(
                                "py-3 px-4 text-nowrap hover:bg-stone-600",
                                value === "" && "bg-green-800"
                            )}
                        >
                            {emptyText}
                        </button>
                    )}
                    {options.map((entity, index) => (
                        <button
                            key={entity.name}
                            role="option"
                            aria-selected={value === entity.name}
                            onKeyDown={(event) => handleKeyDown(event, allowEmpty ? index + 1 : index)}
                            onClick={() => handleClickSelect(entity.name)}
                            className={classNames(
                                "p-2 px-4 flex-shrink-0 flex justify-center items-center gap-1 hover:bg-stone-600",
                                value === entity.name && "bg-green-800" 
                            )}
                        >
                            { renderOptionLabel ? renderOptionLabel(entity) : (
                                <ItemIcon name={entity.name} size="md" />
                            )}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    )
})

export default SimpleEntitySelector