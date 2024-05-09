import React from "react"
import { useSelectColumnToAssemblers, useSelectColumnOrder } from "./redux"
import AssemblerColumn from "./components/AssemblerColumn"
import SupplyColumn from "./components/SupplyColumn"
import SortingContext from "./components/SortingContext"
import RecipeListLoader from "./components/RecipeListLoader"
import Settings from "./components/Settings"
import NewColumnButton from "./NewColumnButton"

export default function App() {
  const columnIds = useSelectColumnOrder()
  const columnsToAssemblers = useSelectColumnToAssemblers()

  return (
      <SortingContext data={columnsToAssemblers}>
        <div className="flex flex-col min-h-screen">
          <div className="bg-stone-900 flex">
            <RecipeListLoader />
            <Settings />
          </div>
          <div className="flex flex-grow overflow-auto m-5 gap-5">
            <SupplyColumn index={0} />
            {columnIds.map((columnId, index) => (
              <React.Fragment key={index + 1}>
                <AssemblerColumn columnId={columnId} />
                <SupplyColumn index={index + 1} />
              </React.Fragment>
            ))}
            <NewColumnButton />
          </div>
        </div>
      </SortingContext>
  )
}
