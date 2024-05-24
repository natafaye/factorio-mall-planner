import Blueprint from "factorio-blueprint"
import { Assembler } from "../../shared/types"
import { AssemblerWithRecipe } from "../../shared/types"

export const LIMIT_METHODS = ["Logistics", "Circuits", "Restrict Slots", "None"] as const

type GenerateBlueprintProps = {
    mall: {
        supplyLines: string[][]
        assemblerLines: AssemblerWithRecipe[][]
    }
    settings: {
        /**
         * Set to -1 for no limit
         */
        stackLimit: number
        limitMethod: string
        circuitColor: "red" | "green"
        types: {
            belt: string
            assembler: string
            inserter: string
            container: string
        }
    }
}

export const generateBlueprint = ({ mall, settings }: GenerateBlueprintProps) => {
    const blueprint = new Blueprint()
    const { height } = getDimensions(mall)
    const { types } = settings

    // Supply lines
    let x = 0
    mall.supplyLines.forEach((line) => {
        for (let i = 0; i < line.length; i += 2) {
            // Label lines with filter inserter
            const filterInserter = blueprint.createEntity('filter-inserter', { x, y: 0 })
            filterInserter.filters = line.length > i + 1 ? [line[i], line[i + 1]] : [line[i]]
            for (let y = 1; y < height; y++)
                blueprint.createEntity(types.belt, { x, y }, Blueprint.DOWN)
            x++
        }
        x += 5
    })

    // Assemblers
    x = 2
    mall.assemblerLines.forEach((line) => {
        let y = 1;
        for (let i = 0; i < line.length; i += 2) {
            createAssembler({ 
                assembler: line[i], 
                position: { x, y },
                direction: Blueprint.UP,
                blueprint, settings,  
            })
            if (i + 1 < line.length) {
                createAssembler({ 
                    assembler: line[i + 1],
                    position: { x, y: y + 5 },
                    direction: Blueprint.DOWN,
                    blueprint, settings, 
                })
            }
            y += 8
        }
        x += 7
    })

    return blueprint.encode()
}

const OFFSETS = {
    [Blueprint.UP]: {
        inserter: { x: 1, y: 3 },
        container: { x: 1, y: 4 }
    },
    [Blueprint.DOWN]: {
        inserter: { x: 0, y: -1 },
        container: { x: 0, y: -2 }
    }
}

type Coordinate = { x: number, y: number}
const addCoordinates = (a: Coordinate, b: Coordinate) => ({ x: a.x + b.x, y: a.y + b.y})

const createAssembler = ({ 
    assembler, direction, position, blueprint, 
    settings: { types, limitMethod, stackLimit, circuitColor } 
}: {
    assembler: AssemblerWithRecipe,
    direction: number,
    position: { x: number, y: number },
    blueprint: Blueprint,
    settings: GenerateBlueprintProps["settings"],
}) => {
    const assemblerBP = blueprint.createEntity(types.assembler, position)
    assemblerBP.recipe = assembler.recipeName
    const inserterBP = blueprint.createEntity(
        types.inserter, 
        addCoordinates(position, OFFSETS[direction].inserter), 
        direction
    )
    const containerBP = blueprint.createEntity(
        types.container, 
        addCoordinates(position, OFFSETS[direction].container)
    )
    
    if(stackLimit === -1) return
    if (limitMethod === "Restrict Slots") {
        containerBP.setBar(stackLimit)
    } else if((
        limitMethod === "Circuits" || limitMethod === "Logistics") 
        && assembler.recipe.mainProduct.stackSize
    ) {
        containerBP.connect(inserterBP, undefined, undefined, circuitColor)
        inserterBP.setCondition({ 
            left: assembler.recipe.mainProduct.name, 
            operator: "<",
            right: assembler.recipe.mainProduct.stackSize * stackLimit,
            type: limitMethod === "Logistics" ? "logistic" : "circuit"
        })
        containerBP.setRequestFilter(
            1, 
            assembler.recipe.mainProduct.name, 
            assembler.recipe.mainProduct.stackSize * containerBP.INVENTORY_SIZE
        )
    }
}

const getDimensions = ({ supplyLines, assemblerLines }: {
    supplyLines: string[][]
    assemblerLines: Assembler[][]
}) => {
    const longestAssemblerLineLength = assemblerLines.reduce(
        (longest, line) => Math.max(longest, line.length),
        0
    )
    const totalSupplyLines = supplyLines.reduce((total, line) => total + line.length, 0)
    const width = (assemblerLines.length * 5) + totalSupplyLines
    // TODO: Handle grabbing from neighbor
    const height = (longestAssemblerLineLength * 8 / 2)
    return { width, height }
}