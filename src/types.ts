
export type Recipe = {
    name: string
    group: string
    subgroup: string
    time: number
    products: Array<{ name: string, amount: number }>
    ingredients: Array<{ name: string, amount: number }>
}

export type Item = {
    name: string
    group: string
    subgroup: string
    order: string
}

export type Assembler = {
    id: string
    recipeName: string
    columnId: string
}

export type ColumnsToAssemblers = Record<string, Array<string>>