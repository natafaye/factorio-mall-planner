import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectRecipesInGroup, selectGroups } from "../../redux";
import type { Recipe } from "../../types";
import { Button } from "../UI";
import ItemIcon from "../ItemIcon";
import styles from "./RecipeSelector.module.css"
import { useClickOutside } from "./useClickOutside";
import RecipeSearchPanel from "./RecipeSearchPanel";

type RecipeSelectorProps = {
    onChange: (newValue: string) => void
    children: React.ReactNode
}

export default function RecipeSelector({ onChange, children }: RecipeSelectorProps) {
    const [showMenu, setShowMenu] = useState(false)

    const groups = useSelector(selectGroups)
    const [selectedGroup, setSelectedGroup] = useState<string>(groups[0])

    const recipesInGroup = useSelector(makeSelectRecipesInGroup(selectedGroup))

    const divRef = useRef(null)
    useClickOutside(divRef, () => {
        setShowMenu(false)
    })

    const handleItemClick = (recipe: Recipe) => {
        onChange(recipe.name)
        setShowMenu(false)
    }

    return (
        <div className="relative" ref={divRef}>
            <Button onClick={() => setShowMenu(!showMenu)}>{children}</Button>
            {showMenu && (
                <div className="absolute bg-stone-700 shadow-xl -mt-3 ms-3 p-4 rounded-md">
                    <div className="flex">
                        {["search", ...groups].map(groupName => (
                            <button
                                key={groupName}
                                onClick={() => setSelectedGroup(groupName)}
                                className={`p-3 pb-2 ${selectedGroup === groupName ? "bg-[orange]" : "bg-stone-600"
                                    }`}
                            >
                                <ItemIcon className={styles.groupIcon} name={groupName} />
                            </button>
                        ))}

                    </div>
                    <div className="mt-2">
                        {selectedGroup === "search" ?
                            <RecipeSearchPanel>
                                {r => (
                                    <button
                                        key={r.name}
                                        onClick={() => handleItemClick(r)}
                                        className="p-1 pb-0 hover:bg-stone-600"
                                    >
                                        <ItemIcon key={r.name} name={r.name} />
                                    </button>
                                )}
                            </RecipeSearchPanel>
                            : recipesInGroup.map(r => (
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