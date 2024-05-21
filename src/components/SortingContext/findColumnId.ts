import { ColumnsToAssemblers } from "../../shared/types";

export const findColumnId = (id: string, columns: ColumnsToAssemblers) => {
    if(id in columns) return id
    return Object.keys(columns).find(columnId => columns[columnId].includes(id))
}