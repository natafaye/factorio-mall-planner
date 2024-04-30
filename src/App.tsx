import React from "react"
import { useSelector } from "react-redux"
import AssemblerColumn from "./components/AssemblerColumn"
import SupplyColumn from "./components/SupplyColumn"
import SortingContext from "./components/SortingContext"
import RecipeListLoader from "./components/RecipeListLoader"
import { selectColumnOrder, selectColumnToAssemblers } from "./redux"

export default function App() {
  const columnIds = useSelector(selectColumnOrder)
  const columnsToAssemblers = useSelector(selectColumnToAssemblers)

  return (
    <SortingContext data={columnsToAssemblers}>
      <div className="flex flex-col min-h-screen">
        <div className="bg-stone-900">
          <RecipeListLoader/>
        </div>
        <div className="flex flex-grow overflow-auto m-5 gap-5">
          <SupplyColumn index={0} />
          {columnIds.map((columnId, index) => (
            <React.Fragment key={index + 1}>
              <AssemblerColumn columnId={columnId} />
              <SupplyColumn index={index + 1} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </SortingContext>
  )
}
