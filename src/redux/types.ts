
export type BaseEntity = {
    name: string
    group: string
    subgroup: string
}

export type Recipe = BaseEntity & {
    products: Array<{ name: string, amount: number }>
    ingredients: Array<{ name: string, amount: number }>
}

export type Item = BaseEntity & {
    order: string
}

export type Assembler = {
    id: string
    recipeName: string
    columnId: string
}

export type ColumnsToAssemblers = Record<string, Array<string>>

export type AssemblerFullData = Assembler & {
    recipe: undefined | Omit<Recipe, "ingredients"> & {
        ingredients: undefined | Array<{ 
            name: string, 
            amount: number, 
            satisfied: boolean 
        }>
    }
}