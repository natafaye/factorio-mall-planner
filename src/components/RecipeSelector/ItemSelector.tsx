import { useRef, useState } from "react";
import classNames from "classnames";
import { useSelectItemsInGroup, useSelectItemGroups } from "../../redux";
import type { Item } from "../../types";
import { Button } from "../UI";
import ItemIcon from "../ItemIcon";
import { useClickOutside } from "./useClickOutside";
import styles from "./RecipeSelector.module.css"

type ItemSelectorProps = {
    onChange: (newValue: string) => void
    className?: string
    children: React.ReactNode
}

export function ItemSelector({ onChange, className, children }: ItemSelectorProps) {
    const [showMenu, setShowMenu] = useState(false)

    const groups = useSelectItemGroups()
    const [selectedGroup, setSelectedGroup] = useState<string>(groups[0])
    const itemsInGroup = useSelectItemsInGroup(selectedGroup)

    const divRef = useRef(null)
    useClickOutside(divRef, () => {
        setShowMenu(false)
    })

    const handleItemClick = (item: Item) => {
        onChange(item.name)
        setShowMenu(false)
    }

    return (
        <div className={classNames("relative", className)} ref={divRef}>
            <Button onClick={() => setShowMenu(!showMenu)} className="flex-grow">
                {children}
            </Button>
            {showMenu && (
                <div className="absolute bg-stone-700 shadow-xl p-4 -mt-2 rounded-md z-10">
                    <div className="flex">
                        {["search", ...groups].map(groupName => (
                            <button
                                key={groupName}
                                onClick={() => setSelectedGroup(groupName)}
                                className={classNames(
                                    "p-3 pb-2",
                                    selectedGroup === groupName ? "bg-[orange]" : "bg-stone-600"
                                )}
                            >
                                <ItemIcon className={styles.groupIcon} name={groupName} />
                            </button>
                        ))}

                    </div>
                    <div className="mt-2">
                        {selectedGroup === "search" ?
                            // <RecipeSearchPanel>
                            //     {i => (
                            //         <button
                            //             key={r.name}
                            //             onClick={() => handleItemClick(i)}
                            //             className="p-1 pb-0 hover:bg-stone-600"
                            //         >
                            //             <ItemIcon key={r.name} name={r.name} />
                            //         </button>
                            //     )}
                            // </RecipeSearchPanel>
                            <div/>
                            : itemsInGroup.map(r => (
                                <button
                                    key={r.name}
                                    onClick={() => handleItemClick(r)}
                                    className="p-1 pb-0 hover:bg-stone-600"
                                >
                                    <ItemIcon key={r.name} name={r.name} />
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}