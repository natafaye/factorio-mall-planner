import React from "react"
import { useSelectColumnToAssemblers, useSelectColumnOrder } from "./redux"
import AssemblerColumn, { NewColumnButton } from "./components/AssemblerColumn"
import SupplyColumn from "./components/SupplyColumn"
import SortingContext from "./components/SortingContext"
import RecipeListLoader from "./components/RecipeListLoader"
import SettingsPanel from "./components/SettingsPanel"
import AssemblerDrawer from "./components/AssemblerDrawer"
import CollapsingDrawer from "./components/CollapsingDrawer"

export default function App() {
  const columnIds = useSelectColumnOrder()
  const columnsToAssemblers = useSelectColumnToAssemblers()

  return (
      <SortingContext data={columnsToAssemblers}>
        <div className="flex flex-col h-screen">
          <AssemblerDrawer/>
          <div className="flex flex-grow m-5 gap-5 overflow-auto">
            <SupplyColumn index={0} />
            {columnIds.map((columnId, index) => (
              <React.Fragment key={index + 1}>
                <AssemblerColumn columnId={columnId} />
                <SupplyColumn index={index + 1} />
              </React.Fragment>
            ))}
            <NewColumnButton />
          </div>
          <CollapsingDrawer direction="down" className="bg-stone-900 flex">
            <RecipeListLoader />
            <SettingsPanel />
          </CollapsingDrawer>
        </div>
      </SortingContext>
  )
}
