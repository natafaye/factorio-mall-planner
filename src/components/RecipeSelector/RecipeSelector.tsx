import { useRef, useState } from "react";
import { useSelectRecipesInGroup, useSelectRecipeGroups } from "../../redux";
import type { Recipe } from "../../redux/types";
import { Button } from "../UI";
import ItemIcon from "../ItemIcon";
import styles from "./RecipeSelector.module.css"
import { useClickOutside } from "./useClickOutside";
import RecipeSearchPanel from "./RecipeSearchPanel";
import classNames from "classnames";

type RecipeSelectorProps = {
    onChange: (newValue: string) => void
    className?: string
    children: React.ReactNode
}

export default function RecipeSelector({ onChange, className, children }: RecipeSelectorProps) {
    const [showMenu, setShowMenu] = useState(false)

    const groups = useSelectRecipeGroups()
    const [selectedGroup, setSelectedGroup] = useState<string>(groups[0])
    const recipesInGroup = useSelectRecipesInGroup(selectedGroup)

    const divRef = useRef(null)
    useClickOutside(divRef, () => {
        setShowMenu(false)
    })

    const handleItemClick = (recipe: Recipe) => {
        onChange(recipe.name)
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