import type { Item } from "../types";

export const defaultItems: Array<Item> = [
    { name: "wooden-chest", order: "a[items]-a[wooden-chest]", subgroup: "a", group: "logistics" },
    { name: "iron-chest", order: "a[items]-b[iron-chest]", subgroup: "a", group: "logistics" },
    { name: "steel-chest", order: "a[items]-c[steel-chest]", subgroup: "a", group: "logistics" },
    { name: "storage-tank", order: "b[fluid]-a[storage-tank]", subgroup: "a", group: "logistics" },
    { name: "transport-belt", order: "a[transport-belt]-a[transport-belt]", subgroup: "b", group: "logistics" },
    { name: "fast-transport-belt", order: "a[transport-belt]-b[fast-transport-belt]", subgroup: "b", group: "logistics" },
    { name: "express-transport-belt", order: "a[transport-belt]-c[express-transport-belt]", subgroup: "b", group: "logistics" },
    { name: "underground-belt", order: "b[underground-belt]-a[underground-belt]", subgroup: "b", group: "logistics" },
    { name: "fast-underground-belt", order: "b[underground-belt]-b[fast-underground-belt]", subgroup: "b", group: "logistics" },
    { name: "express-underground-belt", order: "b[underground-belt]-c[express-underground-belt]", subgroup: "b", group: "logistics" },
    { name: "splitter", order: "c[splitter]-a[splitter]", subgroup: "b", group: "logistics" },
    { name: "fast-splitter", order: "c[splitter]-b[fast-splitter]", subgroup: "b", group: "logistics" },
    { name: "express-splitter", order: "c[splitter]-c[express-splitter]", subgroup: "b", group: "logistics" },
    { name: "burner-inserter", order: "a[burner-inserter]", subgroup: "c", group: "logistics" },
    { name: "inserter", order: "b[inserter]", subgroup: "c", group: "logistics" },
    { name: "long-handed-inserter", order: "c[long-handed-inserter]", subgroup: "c", group: "logistics" },
    { name: "fast-inserter", order: "d[fast-inserter]", subgroup: "c", group: "logistics" },
    { name: "filter-inserter", order: "e[filter-inserter]", subgroup: "c", group: "logistics" },
    { name: "stack-inserter", order: "f[stack-inserter]", subgroup: "c", group: "logistics" },
    { name: "stack-filter-inserter", order: "g[stack-filter-inserter]", subgroup: "c", group: "logistics" },
    { name: "small-electric-pole", order: "a[energy]-a[small-electric-pole]", subgroup: "d", group: "logistics" },
    { name: "medium-electric-pole", order: "a[energy]-b[medium-electric-pole]", subgroup: "d", group: "logistics" },
    { name: "big-electric-pole", order: "a[energy]-c[big-electric-pole]", subgroup: "d", group: "logistics" },
    { name: "substation", order: "a[energy]-d[substation]", subgroup: "d", group: "logistics" },
    { name: "pipe", order: "a[pipe]-a[pipe]", subgroup: "d", group: "logistics" },
    { name: "pipe-to-ground", order: "a[pipe]-b[pipe-to-ground]", subgroup: "d", group: "logistics" },
    { name: "pump", order: "b[pipe]-c[pump]", subgroup: "d", group: "logistics" },
    { name: "rail", order: "a[train-system]-a[rail]", subgroup: "e", group: "logistics" },
    { name: "train-stop", order: "a[train-system]-c[train-stop]", subgroup: "e", group: "logistics" },
    { name: "rail-signal", order: "a[train-system]-d[rail-signal]", subgroup: "e", group: "logistics" },
    { name: "rail-chain-signal", order: "a[train-system]-e[rail-signal-chain]", subgroup: "e", group: "logistics" },
    { name: "locomotive", order: "a[train-system]-f[locomotive]", subgroup: "e", group: "logistics" },
    { name: "cargo-wagon", order: "a[train-system]-g[cargo-wagon]", subgroup: "e", group: "logistics" },
    { name: "fluid-wagon", order: "a[train-system]-h[fluid-wagon]", subgroup: "e", group: "logistics" },
    { name: "artillery-wagon", order: "a[train-system]-i[artillery-wagon]", subgroup: "e", group: "logistics" },
    { name: "car", order: "b[personal-transport]-a[car]", subgroup: "f", group: "logistics" },
    { name: "tank", order: "b[personal-transport]-b[tank]", subgroup: "f", group: "logistics" },
    { name: "spidertron", order: "b[personal-transport]-c[spidertron]-a[spider]", subgroup: "f", group: "logistics" },
    { name: "spidertron-remote", order: "b[personal-transport]-c[spidertron]-b[remote]", subgroup: "f", group: "logistics" },
    { name: "logistic-robot", order: "a[robot]-a[logistic-robot]", subgroup: "g", group: "logistics" },
    { name: "construction-robot", order: "a[robot]-b[construction-robot]", subgroup: "g", group: "logistics" },
    { name: "logistic-chest-active-provider", order: "b[storage]-c[logistic-chest-active-provider]", subgroup: "g", group: "logistics" },
    { name: "logistic-chest-passive-provider", order: "b[storage]-c[logistic-chest-passive-provider]", subgroup: "g", group: "logistics" },
    { name: "logistic-chest-storage", order: "b[storage]-c[logistic-chest-storage]", subgroup: "g", group: "logistics" },
    { name: "logistic-chest-buffer", order: "b[storage]-d[logistic-chest-buffer]", subgroup: "g", group: "logistics" },
    { name: "logistic-chest-requester", order: "b[storage]-e[logistic-chest-requester]", subgroup: "g", group: "logistics" },
    { name: "roboport", order: "c[signal]-a[roboport]", subgroup: "g", group: "logistics" },
    { name: "small-lamp", order: "a[light]-a[small-lamp]", subgroup: "h", group: "logistics" },
    { name: "red-wire", order: "b[wires]-a[red-wire]", subgroup: "h", group: "logistics" },
    { name: "green-wire", order: "b[wires]-b[green-wire]", subgroup: "h", group: "logistics" },
    { name: "arithmetic-combinator", order: "c[combinators]-a[arithmetic-combinator]", subgroup: "h", group: "logistics" },
    { name: "decider-combinator", order: "c[combinators]-b[decider-combinator]", subgroup: "h", group: "logistics" },
    { name: "constant-combinator", order: "c[combinators]-c[constant-combinator]", subgroup: "h", group: "logistics" },
    { name: "power-switch", order: "d[other]-a[power-switch]", subgroup: "h", group: "logistics" },
    { name: "programmable-speaker", order: "d[other]-b[programmable-speaker]", subgroup: "h", group: "logistics" },
    { name: "stone-brick", order: "a[stone-brick]", subgroup: "i", group: "logistics" },
    { name: "concrete", order: "b[concrete]-a[plain]", subgroup: "i", group: "logistics" },
    { name: "hazard-concrete", order: "b[concrete]-b[hazard]", subgroup: "i", group: "logistics" },
    { name: "refined-concrete", order: "b[concrete]-c[refined]", subgroup: "i", group: "logistics" },
    { name: "refined-hazard-concrete", order: "b[concrete]-d[refined-hazard]", subgroup: "i", group: "logistics" },
    { name: "landfill", order: "c[landfill]-a[dirt]", subgroup: "i", group: "logistics" },
    { name: "cliff-explosives", order: "d[cliff-explosives]", subgroup: "i", group: "logistics" },
    { name: "repair-pack", order: "b[repair]-a[repair-pack]", subgroup: "a", group: "production" },
    { name: "boiler", order: "b[steam-power]-a[boiler]", subgroup: "b", group: "production" },
    { name: "steam-engine", order: "b[steam-power]-b[steam-engine]", subgroup: "b", group: "production" },
    { name: "solar-panel", order: "d[solar-panel]-a[solar-panel]", subgroup: "b", group: "production" },
    { name: "accumulator", order: "e[accumulator]-a[accumulator]", subgroup: "b", group: "production" },
    { name: "nuclear-reactor", order: "f[nuclear-energy]-a[reactor]", subgroup: "b", group: "production" },
    { name: "heat-pipe", order: "f[nuclear-energy]-b[heat-pipe]", subgroup: "b", group: "production" },
    { name: "heat-exchanger", order: "f[nuclear-energy]-c[heat-exchanger]", subgroup: "b", group: "production" },
    { name: "steam-turbine", order: "f[nuclear-energy]-d[steam-turbine]", subgroup: "b", group: "production" },
    { name: "burner-mining-drill", order: "a[items]-a[burner-mining-drill]", subgroup: "c", group: "production" },
    { name: "electric-mining-drill", order: "a[items]-b[electric-mining-drill]", subgroup: "c", group: "production" },
    { name: "offshore-pump", order: "b[fluids]-a[offshore-pump]", subgroup: "c", group: "production" },
    { name: "pumpjack", order: "b[fluids]-b[pumpjack]", subgroup: "c", group: "production" },
    { name: "stone-furnace", order: "a[stone-furnace]", subgroup: "d", group: "production" },
    { name: "steel-furnace", order: "b[steel-furnace]", subgroup: "d", group: "production" },
    { name: "electric-furnace", order: "c[electric-furnace]", subgroup: "d", group: "production" },
    { name: "assembling-machine-1", order: "a[assembling-machine-1]", subgroup: "e", group: "production" },
    { name: "assembling-machine-2", order: "b[assembling-machine-2]", subgroup: "e", group: "production" },
    { name: "assembling-machine-3", order: "c[assembling-machine-3]", subgroup: "e", group: "production" },
    { name: "oil-refinery", order: "d[refinery]", subgroup: "e", group: "production" },
    { name: "chemical-plant", order: "e[chemical-plant]", subgroup: "e", group: "production" },
    { name: "centrifuge", order: "g[centrifuge]", subgroup: "e", group: "production" },
    { name: "lab", order: "g[lab]", subgroup: "e", group: "production" },
    { name: "beacon", order: "a[beacon]", subgroup: "f", group: "production" },
    { name: "speed-module", order: "a[speed]-a[speed-module-1]", subgroup: "f", group: "production" },
    { name: "speed-module-2", order: "a[speed]-b[speed-module-2]", subgroup: "f", group: "production" },
    { name: "speed-module-3", order: "a[speed]-c[speed-module-3]", subgroup: "f", group: "production" },
    { name: "effectivity-module", order: "c[effectivity]-a[effectivity-module-1]", subgroup: "f", group: "production" },
    { name: "effectivity-module-2", order: "c[effectivity]-b[effectivity-module-2]", subgroup: "f", group: "production" },
    { name: "effectivity-module-3", order: "c[effectivity]-c[effectivity-module-3]", subgroup: "f", group: "production" },
    { name: "productivity-module", order: "c[productivity]-a[productivity-module-1]", subgroup: "f", group: "production" },
    { name: "productivity-module-2", order: "c[productivity]-b[productivity-module-2]", subgroup: "f", group: "production" },
    { name: "productivity-module-3", order: "c[productivity]-c[productivity-module-3]", subgroup: "f", group: "production" },
    { name: "rocket-silo", order: "e[rocket-silo]", subgroup: "g", group: "production" },
    { name: "satellite", order: "m[satellite]", subgroup: "g", group: "production" },
    { name: "wood", order: "a[wood]", subgroup: "b", group: "intermediate-products" },
    { name: "coal", order: "b[coal]", subgroup: "b", group: "intermediate-products" },
    { name: "stone", order: "d[stone]", subgroup: "b", group: "intermediate-products" },
    { name: "iron-ore", order: "e[iron-ore]", subgroup: "b", group: "intermediate-products" },
    { name: "copper-ore", order: "f[copper-ore]", subgroup: "b", group: "intermediate-products" },
    { name: "uranium-ore", order: "g[uranium-ore]", subgroup: "b", group: "intermediate-products" },
    { name: "raw-fish", order: "h[raw-fish]", subgroup: "b", group: "intermediate-products" },
    { name: "iron-plate", order: "b[iron-plate]", subgroup: "c", group: "intermediate-products" },
    { name: "copper-plate", order: "c[copper-plate]", subgroup: "c", group: "intermediate-products" },
    { name: "solid-fuel", order: "c[solid-fuel]", subgroup: "c", group: "intermediate-products" },
    { name: "steel-plate", order: "d[steel-plate]", subgroup: "c", group: "intermediate-products" },
    { name: "plastic-bar", order: "f[plastic-bar]", subgroup: "c", group: "intermediate-products" },
    { name: "sulfur", order: "g[sulfur]", subgroup: "c", group: "intermediate-products" },
    { name: "battery", order: "h[battery]", subgroup: "c", group: "intermediate-products" },
    { name: "explosives", order: "j[explosives]", subgroup: "c", group: "intermediate-products" },
    { name: "copper-cable", order: "a[copper-cable]", subgroup: "g", group: "intermediate-products" },
    { name: "iron-stick", order: "b[iron-stick]", subgroup: "g", group: "intermediate-products" },
    { name: "iron-gear-wheel", order: "c[iron-gear-wheel]", subgroup: "g", group: "intermediate-products" },
    { name: "empty-barrel", order: "d[empty-barrel]", subgroup: "g", group: "intermediate-products" },
    { name: "electronic-circuit", order: "e[electronic-circuit]", subgroup: "g", group: "intermediate-products" },
    { name: "advanced-circuit", order: "f[advanced-circuit]", subgroup: "g", group: "intermediate-products" },
    { name: "processing-unit", order: "g[processing-unit]", subgroup: "g", group: "intermediate-products" },
    { name: "engine-unit", order: "h[engine-unit]", subgroup: "g", group: "intermediate-products" },
    { name: "electric-engine-unit", order: "i[electric-engine-unit]", subgroup: "g", group: "intermediate-products" },
    { name: "flying-robot-frame", order: "l[flying-robot-frame]", subgroup: "g", group: "intermediate-products" },
    { name: "rocket-control-unit", order: "n[rocket-control-unit]", subgroup: "g", group: "intermediate-products" },
    { name: "low-density-structure", order: "o[low-density-structure]", subgroup: "g", group: "intermediate-products" },
    { name: "rocket-fuel", order: "p[rocket-fuel]", subgroup: "g", group: "intermediate-products" },
    { name: "rocket-part", order: "q[rocket-part]", subgroup: "g", group: "intermediate-products" },
    { name: "nuclear-fuel", order: "q[uranium-rocket-fuel]", subgroup: "g", group: "intermediate-products" },
    { name: "uranium-235", order: "r[uranium-235]", subgroup: "g", group: "intermediate-products" },
    { name: "uranium-238", order: "r[uranium-238]", subgroup: "g", group: "intermediate-products" },
    { name: "uranium-fuel-cell", order: "r[uranium-processing]-a[uranium-fuel-cell]", subgroup: "g", group: "intermediate-products" },
    { name: "used-up-uranium-fuel-cell", order: "r[used-up-uranium-fuel-cell]", subgroup: "g", group: "intermediate-products" },
    { name: "automation-science-pack", order: "a[automation-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "logistic-science-pack", order: "b[logistic-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "military-science-pack", order: "c[military-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "chemical-science-pack", order: "d[chemical-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "production-science-pack", order: "e[production-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "utility-science-pack", order: "f[utility-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "space-science-pack", order: "g[space-science-pack]", subgroup: "h", group: "intermediate-products" },
    { name: "pistol", order: "a[basic-clips]-a[pistol]", subgroup: "a", group: "combat" },
    { name: "submachine-gun", order: "a[basic-clips]-b[submachine-gun]", subgroup: "a", group: "combat" },
    { name: "shotgun", order: "b[shotgun]-a[basic]", subgroup: "a", group: "combat" },
    { name: "combat-shotgun", order: "b[shotgun]-a[combat]", subgroup: "a", group: "combat" },
    { name: "rocket-launcher", order: "d[rocket-launcher]", subgroup: "a", group: "combat" },
    { name: "flamethrower", order: "e[flamethrower]", subgroup: "a", group: "combat" },
    { name: "land-mine", order: "f[land-mine]", subgroup: "a", group: "combat" },
    { name: "firearm-magazine", order: "a[basic-clips]-a[firearm-magazine]", subgroup: "b", group: "combat" },
    { name: "piercing-rounds-magazine", order: "a[basic-clips]-b[piercing-rounds-magazine]", subgroup: "b", group: "combat" },
    { name: "uranium-rounds-magazine", order: "a[basic-clips]-c[uranium-rounds-magazine]", subgroup: "b", group: "combat" },
    { name: "shotgun-shell", order: "b[shotgun]-a[basic]", subgroup: "b", group: "combat" },
    { name: "piercing-shotgun-shell", order: "b[shotgun]-b[piercing]", subgroup: "b", group: "combat" },
    { name: "cannon-shell", order: "d[cannon-shell]-a[basic]", subgroup: "b", group: "combat" },
    { name: "explosive-cannon-shell", order: "d[cannon-shell]-c[explosive]", subgroup: "b", group: "combat" },
    { name: "uranium-cannon-shell", order: "d[cannon-shell]-c[uranium]", subgroup: "b", group: "combat" },
    { name: "explosive-uranium-cannon-shell", order: "d[explosive-cannon-shell]-c[uranium]", subgroup: "b", group: "combat" },
    { name: "artillery-shell", order: "d[explosive-cannon-shell]-d[artillery]", subgroup: "b", group: "combat" },
    { name: "rocket", order: "d[rocket-launcher]-a[basic]", subgroup: "b", group: "combat" },
    { name: "explosive-rocket", order: "d[rocket-launcher]-b[explosive]", subgroup: "b", group: "combat" },
    { name: "atomic-bomb", order: "d[rocket-launcher]-c[atomic-bomb]", subgroup: "b", group: "combat" },
    { name: "flamethrower-ammo", order: "e[flamethrower]", subgroup: "b", group: "combat" },
    { name: "grenade", order: "a[grenade]-a[normal]", subgroup: "c", group: "combat" },
    { name: "cluster-grenade", order: "a[grenade]-b[cluster]", subgroup: "c", group: "combat" },
    { name: "poison-capsule", order: "b[poison-capsule]", subgroup: "c", group: "combat" },
    { name: "slowdown-capsule", order: "c[slowdown-capsule]", subgroup: "c", group: "combat" },
    { name: "defender-capsule", order: "d[defender-capsule]", subgroup: "c", group: "combat" },
    { name: "distractor-capsule", order: "e[defender-capsule]", subgroup: "c", group: "combat" },
    { name: "destroyer-capsule", order: "f[destroyer-capsule]", subgroup: "c", group: "combat" },
    { name: "light-armor", order: "a[light-armor]", subgroup: "d", group: "combat" },
    { name: "heavy-armor", order: "b[heavy-armor]", subgroup: "d", group: "combat" },
    { name: "modular-armor", order: "c[modular-armor]", subgroup: "d", group: "combat" },
    { name: "power-armor", order: "d[power-armor]", subgroup: "d", group: "combat" },
    { name: "power-armor-mk2", order: "e[power-armor-mk2]", subgroup: "d", group: "combat" },
    { name: "solar-panel-equipment", order: "a[energy-source]-a[solar-panel]", subgroup: "e", group: "combat" },
    { name: "fusion-reactor-equipment", order: "a[energy-source]-b[fusion-reactor]", subgroup: "e", group: "combat" },
    { name: "battery-equipment", order: "b[battery]-a[battery-equipment]", subgroup: "e", group: "combat" },
    { name: "battery-mk2-equipment", order: "b[battery]-b[battery-equipment-mk2]", subgroup: "e", group: "combat" },
    { name: "belt-immunity-equipment", order: "c[belt-immunity]-a[belt-immunity]", subgroup: "e", group: "combat" },
    { name: "exoskeleton-equipment", order: "d[exoskeleton]-a[exoskeleton-equipment]", subgroup: "e", group: "combat" },
    { name: "personal-roboport-equipment", order: "e[robotics]-a[personal-roboport-equipment]", subgroup: "e", group: "combat" },
    { name: "personal-roboport-mk2-equipment", order: "e[robotics]-b[personal-roboport-mk2-equipment]", subgroup: "e", group: "combat" },
    { name: "night-vision-equipment", order: "f[night-vision]-a[night-vision-equipment]", subgroup: "e", group: "combat" },
    { name: "energy-shield-equipment", order: "a[shield]-a[energy-shield-equipment]", subgroup: "f", group: "combat" },
    { name: "energy-shield-mk2-equipment", order: "a[shield]-b[energy-shield-equipment-mk2]", subgroup: "f", group: "combat" },
    { name: "personal-laser-defense-equipment", order: "b[active-defense]-a[personal-laser-defense-equipment]", subgroup: "f", group: "combat" },
    { name: "discharge-defense-equipment", order: "b[active-defense]-b[discharge-defense-equipment]-a[equipment]", subgroup: "f", group: "combat" },
    { name: "discharge-defense-remote", order: "b[active-defense]-b[discharge-defense-equipment]-b[remote]", subgroup: "f", group: "combat" },
    { name: "stone-wall", order: "a[stone-wall]-a[stone-wall]", subgroup: "g", group: "combat" },
    { name: "gate", order: "a[wall]-b[gate]", subgroup: "g", group: "combat" },
    { name: "gun-turret", order: "b[turret]-a[gun-turret]", subgroup: "g", group: "combat" },
    { name: "laser-turret", order: "b[turret]-b[laser-turret]", subgroup: "g", group: "combat" },
    { name: "flamethrower-turret", order: "b[turret]-c[flamethrower-turret]", subgroup: "g", group: "combat" },
    { name: "artillery-turret", order: "b[turret]-d[artillery-turret]-a[turret]", subgroup: "g", group: "combat" },
    { name: "artillery-targeting-remote", order: "b[turret]-d[artillery-turret]-b[remote]", subgroup: "g", group: "combat" },
    { name: "radar", order: "d[radar]-a[radar]", subgroup: "g", group: "combat" },
]