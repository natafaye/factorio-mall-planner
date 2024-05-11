import { getBaseName } from "../../shared";

const NON_USEFUL = [
    "loader", "fast-loader", "express-loader", 
    "dummy-steel-axe", "copy-paste-tool", "cut-paste-tool", 
    "blueprint", "deconstruction-planner", "upgrade-planner",
    "blueprint-book", "ironclad-cannon", "ironclad-mortar",
    "tank-cannon", "artillery-wagon-cannon", "player-port",
    "advanced-tank-laser-cannon", "advanced-tank-machine-gun",
    "tank-machine-gun", "vehicle-machine-gun", "se-big-turbine-internal",
    "se-space-elevator-maintenance", "se-spaceship-antimatter-engine-burn",
    "se-spaceship-ion-engine-burn", "se-spaceship-rocket-engine-burn",
    "kr-fusion", "se-gate-platform", "se-space-probe-rocket-deploy",
    "se-empty-barrel-reprocessing", "se-scrap-decontamination", "se-scrap-recycling",
    "se-matter-fusion-dirty", "hcraft-recipe", "mcraft-recipe", "se-iridium-piledriver",
    "se-train-gui-targeter", "coin", "kr-creep", "se-space-probe-rocket-deployed",
    "fluid-unknown", "se-decompressing-steam"
]

export type RecipeOrItem = {
    name: string
    group: string
    subgroup: string
    ingredients?: Array<{ name: string }>
}

export const filterOutNonUseful = <T extends RecipeOrItem>(
    list: Array<T>
) => {
    return list.filter(({ name, group, ingredients }) =>
        !(
            name.match(/^(empty|fill)-.*-barrel$/)
            || name.match(/(?<!empty)-barrel$/)
        ) && !(
            ingredients ? (
                ingredients.length === 0 ||
                ingredients.length === 1 && 
                    getBaseName(ingredients[0].name) === getBaseName(name)
            ) : false
        ) && !(
               group === "other"
            || group === "environment"
            || name.includes("delivery-cannon-pack")
            || name.includes("delivery-cannon-weapon-pack")
            || name.includes("delivery-cannon-artillery-")
            || name.includes("se-capsule-")
            || name.includes("reclaim-water")
            || name.startsWith("matter-to-")
            || name.endsWith("-to-matter")
            || name.endsWith("-to-parts")
            || name.endsWith("-to-particle-stream")
            || name.startsWith("se-gate-fragment")
            || name.startsWith("se-core-fragment")
            || name.startsWith("se-cargo-rocket-")
            || name.startsWith("se-arcosphere")
            || name.startsWith("spidertron-rocket-launcher")
            || name.startsWith("advanced-tank-cannon")
            || name.includes("dirty-water-filtration")
            || name.startsWith("kr-air-cleaning")
            || name.includes("dummy")
            || name.endsWith("-scrapping")
            || name.startsWith("se-recycle-")
            || name.startsWith("se-electric-boiling-")
            || NON_USEFUL.includes(name)
        ) && !(
            name.match(/^textplate-.*-.*-.*$/)
        )
    )
}