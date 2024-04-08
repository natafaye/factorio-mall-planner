import AssemblerColumn from "./components/AssemblerColumn/AssemblerColumn";
import SupplyColumn from "./components/SupplyColumn/SupplyColumn";
import SortingContext from "./components/SortingContext/SortingContext";
import { useMemo } from "react";
import { useAppSelector } from "./redux/reduxHooks";

export default function App() {
  const columns = useAppSelector(state => state.assemblers.columns)
  const columnIds = useMemo(() => Object.keys(columns), [columns])

  return (
    <SortingContext data={columns}>
      <div className="flex flex-col min-h-screen">
        <div className="bg-stone-900">
          
        </div>
        <div className="flex flex-grow overflow-auto m-5 gap-5">
          <SupplyColumn index={0} />
          {columnIds.map((columnId, index) => (
            <>
              <AssemblerColumn key={columnId} columnId={columnId} />
              <SupplyColumn index={index + 1} />
            </>
          ))}
        </div>
      </div>
    </SortingContext>
  )
}
