import { ReactNode, useEffect, useRef, useState } from "react"
import { useSelectRecipesBySearch } from "../../redux"
import { Recipe } from "../../types"
import { Input } from "../UI"

export default function RecipeSearchPanel({ children }: { children: (r: Recipe) => ReactNode }) {
    const [searchTerm, setSearchTerm] = useState("")
    const recipesInSearch = useSelectRecipesBySearch(searchTerm)

    // Focus the input on component load
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div>
            <Input
                ref={inputRef}
                type="text"
                className="w-full mt-2 mb-3"
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
            />
            { recipesInSearch.length ? 
                recipesInSearch.map(children)
                : <p className="text-stone-400 text-center">
                    Search by recipe name, or use "i:" to search by ingredient
                </p>
            }
        </div>
    )
}