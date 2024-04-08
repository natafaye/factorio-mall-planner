import { Columns } from "../redux/assemblerSlice";

export const findColumnId = (id: string, columns: Columns) => {
    if(id in columns) return id
    return Object.keys(columns).find(columnId => columns[columnId].includes(id))
}