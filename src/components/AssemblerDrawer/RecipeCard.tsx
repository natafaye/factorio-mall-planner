import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Recipe } from "../../redux"
import ItemBadge from "../ItemBadge"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

type Props = {
    recipe: Recipe
    onRemove: (recipeName: string) => void
}

export default function RecipeCard({ recipe, onRemove }: Props) {
    return (
        <div className="w-24 relative flex-shrink-0 bg-stone-700 rounded-lg p-2 group">
            <button className="absolute top-0 right-0 pe-1 text-stone-400
             hover:text-stone-300 hidden group-hover:block"
             onClick={() => onRemove(recipe.name)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <ItemBadge size="md" name={recipe.name} />
            <div className="flex flex-wrap gap-1 mt-1">
                {recipe.ingredients?.map((ingredient) => (
                    <ItemBadge
                        key={ingredient.name}
                        name={ingredient.name}
                        size="sm"
                    />
                ))}
            </div>
        </div>
    )
}