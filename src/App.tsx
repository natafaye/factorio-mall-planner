import React from "react"
import { useSelector } from "react-redux"
import AssemblerColumn from "./components/AssemblerColumn"
import SupplyColumn from "./components/SupplyColumn"
import SortingContext from "./components/SortingContext"
import RecipeListLoader from "./components/RecipeListLoader"
import { selectColumnOrder, selectColumnToAssemblers } from "./redux"
import NewColumnButton from "./NewColumnButton"
import Settings, { SettingsContext, useSettingsContextData } from "./components/Settings"

export default function App() {
  const settingsData = useSettingsContextData()
  const columnIds = useSelector(selectColumnOrder)
  const columnsToAssemblers = useSelector(selectColumnToAssemblers)

  return (
    <SettingsContext.Provider value={settingsData}>
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
    </SettingsContext.Provider>
  )
}
