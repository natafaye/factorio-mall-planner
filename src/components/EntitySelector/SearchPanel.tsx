import { ReactNode, useEffect, useRef, useState } from "react"
import { useSelectBySearch } from "../../redux"
import { Input } from "../UI"
import type { BaseEntity } from "../../shared/types"

type Props<Type> = { 
    type: "item" | "recipe"
    renderResult: (entity: Type) => ReactNode
    emptyText: string
}

export default function SearchPanel<Type extends BaseEntity>({ 
    type, renderResult, emptyText 
}: Props<Type>) {
    const [searchTerm, setSearchTerm] = useState("")
    const searchResults = useSelectBySearch(type, searchTerm) as Type[]

    // Focus the input on component load
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className="p-1">
            <Input
                ref={inputRef}
                type="text"
                className="w-full mt-2 mb-3"
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
            />
            { searchResults.length ? 
                searchResults.map(renderResult)
                : <p className="text-stone-400 text-center">
                    { emptyText }
                </p>
            }
        </div>
    )
}