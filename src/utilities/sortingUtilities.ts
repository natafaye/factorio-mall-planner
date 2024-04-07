import { UniqueIdentifier } from "@dnd-kit/core";
import { Columns } from "../redux/assemblerSlice";

export const findContainer = (id: UniqueIdentifier, items: Record<UniqueIdentifier, UniqueIdentifier[]>) => {
    if (id in items) {
        return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id));
};

export const findColumnId = (id: string, columns: Columns) => {
    if(id in columns) return id
    return Object.keys(columns).find(columnId => columns[columnId].includes(id))
}