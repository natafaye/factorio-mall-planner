
export type BaseEntity = {
    name: string
    group: string
    subgroup: string
    order: string
}

export type Recipe = BaseEntity & {
    products: Array<{ name: string, amount: number }>
    ingredients: Array<{ name: string, amount: number }>
    category: string
}

export type Item = BaseEntity & {
    type: string
    stackSize?: number
    tileWidth?: number
    tileHeight?: number
}

export type Assembler = {
    id: string
    recipeName: string
    columnId: string
}

export type ColumnsToAssemblers = Record<string, Array<string>>

export type AssemblerWithRecipe = Assembler & {
    recipe: Recipe & {
        mainProduct: Item
    },
}

export type AssemblerFullData = Assembler & {
    recipe: undefined | Omit<Recipe, "ingredients"> & {
        ingredients: undefined | Array<{ 
            name: string, 
            amount: number, 
            satisfied: boolean 
        }>
    }
}