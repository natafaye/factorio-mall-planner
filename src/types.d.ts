type Recipe = {
    name: string
    time: number
    group: string
    subgroup: string
    products: Array<{ name: string, amount: number }>
    ingredients: Array<{ name: string, amount: number }>
}

type Assembler = {
    id: string
    recipeName: string
    columnId: string
}