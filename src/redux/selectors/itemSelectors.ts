import { createAppSelector } from "./createAppSelector"
import { createAppSelectorHook } from "./createAppSelectorHook"
import { selectAllItems } from "./basicSelectors"

export const useSelectItemGroups = createAppSelectorHook(state => state.recipes.itemGroups)

export const useSelectItemsInGroup = createAppSelectorHook(createAppSelector(
    [
        selectAllItems,
        (_, selectedGroup: string) => selectedGroup
    ],
    (allItems, selectedGroup) => allItems
        .filter(i => i.group === selectedGroup)
        .sort(sortBySubgroupThenOrder)
))

const sortBySubgroupThenOrder = (a: { subgroup: string, order: string }, b: { subgroup: string, order: string }) => {
    const subGroupValue = a.subgroup.localeCompare(b.subgroup)
    if (subGroupValue !== 0) return subGroupValue
    return a.order.localeCompare(b.order)
}