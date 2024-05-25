import { MouseEvent, useState } from "react"
import { LIMIT_METHODS, generateBlueprint } from "./generateBlueprint"
import { useSelectItemsByType, useSelectMall } from "../../redux"
import { Button, CopyBlock, Input } from "../UI"
import { SimpleEntitySelector } from "../EntitySelector"

export default function BlueprintForm() {
    const [blueprintString, setBlueprintString] = useState<string>("")

    const mall = useSelectMall()
    const belts = useSelectItemsByType("transport-belt")
    const containers = useSelectItemsByType("container")
    const inserters = useSelectItemsByType("inserter")
    const assemblers = useSelectItemsByType("assembling-machine")
    const pipes = useSelectItemsByType("pipe")
    const poles = useSelectItemsByType("electric-pole")
    const lamps = useSelectItemsByType("lamp")
    //const modules = useSelectItemsByType("module")
    const logisticContainers = useSelectItemsByType("logistic-container")
    const roboports = useSelectItemsByType("roboport")

    const [values, setValues] = useState({
        limitMethod: "Restrict Slots",
        stackLimit: "1",
        belt: belts[1]?.name || "",
        container: containers[1]?.name || "",
        inserter: inserters[1]?.name || "",
        assembler: assemblers[1]?.name || "",
        pipe: pipes[0]?.name || "",
        pole: poles[1]?.name || "",
        lamp: "",
        roboport: "",
    })
    const handleSelectorChange = (property: string, value: string) =>
        setValues({ ...values, [property]: value })

    const handleLimitMethodChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            limitMethod: target.value,
            container: target.value !== "Logistics" ?
                containers[1]?.name || "" :
                logisticContainers[2]?.name || ""
        })
    }

    const handleGenerateClick = (event: MouseEvent) => {
        event.preventDefault()
        setBlueprintString(generateBlueprint({ 
            mall, 
            settings: { 
                types: { ...values }, 
                stackLimit: parseInt(values.stackLimit),
                limitMethod: values.limitMethod,
                circuitColor: "green"
            }, 
        }))
    }

    return (
        <div>
            <form>
                <div className="flex flex-wrap mb-3 ps-2 items-center">
                    <label className="p-2 ps-0 me-4">Limiting Method</label>
                    {LIMIT_METHODS.map(method => (
                        <label className="me-5" key={method}>
                            <input
                                type="radio"
                                name="limit-method"
                                className="me-2"
                                value={method}
                                checked={values.limitMethod === method}
                                onChange={handleLimitMethodChange}
                            />
                            {method}
                        </label>
                    ))}
                </div>
                <div className="flex flex-wrap mb-4">
                    <label className="p-2 me-4 w-36">Stack Limit</label>
                    <Input
                        type="number"
                        value={values.limitMethod === "None" ? "" : values.stackLimit}
                        disabled={values.limitMethod === "None"}
                        onChange={({ target }) => setValues({ ...values, stackLimit: target.value })}
                    />
                </div>
                <div className="flex flex-wrap">
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Belt Type</label>
                        <SimpleEntitySelector
                            value={values.belt}
                            onSelectChange={(value) => handleSelectorChange("belt", value)}
                            options={belts}
                            allowEmpty={false}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Container Type</label>
                        <SimpleEntitySelector
                            value={values.container}
                            onSelectChange={(value) => handleSelectorChange("container", value)}
                            options={values.limitMethod === "Logistics" ?
                                [...logisticContainers, ...containers] :
                                containers
                            }
                            allowEmpty={false}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Inserter Type</label>
                        <SimpleEntitySelector
                            value={values.inserter}
                            onSelectChange={(value) => handleSelectorChange("inserter", value)}
                            options={inserters}
                            allowEmpty={false}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Assembler Type</label>
                        <SimpleEntitySelector
                            value={values.assembler}
                            onSelectChange={(value) => handleSelectorChange("assembler", value)}
                            options={assemblers}
                            allowEmpty={false}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Electric Pole Type</label>
                        <SimpleEntitySelector
                            value={values.pole}
                            onSelectChange={(value) => handleSelectorChange("pole", value)}
                            options={poles}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Lamp Type</label>
                        <SimpleEntitySelector
                            value={values.lamp}
                            onSelectChange={(value) => handleSelectorChange("lamp", value)}
                            options={lamps}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Pipe Type</label>
                        <SimpleEntitySelector
                            value={values.pipe}
                            onSelectChange={(value) => handleSelectorChange("pipe", value)}
                            options={pipes}
                            allowEmpty={false}
                        />
                    </div>
                    <div className="flex mb-3 me-7 items-center">
                        <label className="p-2 me-4 w-36">Roboport Type</label>
                        <SimpleEntitySelector
                            value={values.roboport}
                            onSelectChange={(value) => handleSelectorChange("roboport", value)}
                            options={roboports}
                        />
                    </div>
                </div>
                <div className="flex justify-stretch">
                    <Button className="flex-grow" onClick={handleGenerateClick}>Generate</Button>
                </div>
            </form>
            <CopyBlock innerDivClassName="break-words h-28" value={blueprintString} />
        </div>
    )
}