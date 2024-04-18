import { useState } from "react";
import Button from "../_ui_components/Button";
import styles from "./RecipeSelector.module.css"
import ItemIcon from "../ItemIcon";
import { useAppSelector } from "../../redux/reduxHooks";
import { Recipe } from "../../types";

type RecipeSelectorProps = {
    onChange: (newValue: string) => void
    children: React.ReactNode
}

export default function RecipeSelector({ onChange, children }: RecipeSelectorProps) {
    const [showMenu, setShowMenu] = useState(false)

    const groups = useAppSelector(state => [...new Set(state.recipes.recipeList.map(r => r.group))])
    const [selectedGroup, setSelectedGroup] = useState<string>(groups[0])

    const recipesInGroup = useAppSelector(state => state.recipes.recipeList
        .filter(r => r.group === selectedGroup)
        .sort((a, b) => a.subgroup.localeCompare(b.subgroup))
    )

    const handleItemClick = (recipe: Recipe) => {
        onChange(recipe.name)
        setShowMenu(false)
    }

    return (
        <div className="relative">
            <Button onClick={() => setShowMenu(!showMenu)}>{ children }</Button>
            {showMenu && (
                <div className="absolute bg-stone-700 shadow-sm -mt-3 ms-3 p-4 rounded-md">
                    <div className="flex">
                        {groups.map(groupName => (
                            <button 
                                key={groupName}
                                onClick={() => setSelectedGroup(groupName)}
                                className={`p-3 pb-2 ${ 
                                    selectedGroup === groupName ? "bg-[orange]" : "bg-stone-600"
                                }`}
                            >
                                <ItemIcon className={styles.groupIcon} name={groupName}/>
                            </button>
                        ))}

                    </div>
                    <div className="mt-2">
                        {recipesInGroup.map(r => (
                            <button 
                                key={r.name}
                                onClick={() => handleItemClick(r)}
                                className="p-1 pb-0 hover:bg-stone-600"
                            >
                                <ItemIcon key={r.name} name={r.name}/>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}