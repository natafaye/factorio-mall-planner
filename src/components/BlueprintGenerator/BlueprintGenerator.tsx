import { useState } from "react"
import { Button } from "../UI"
import Modal from "../UI/Modal"
import BlueprintForm from "./BlueprintForm"

export default function BlueprintGenerator() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Generate Blueprint</Button>
            <Modal isOpen={open} title="Generate Blueprint" toggle={() => setOpen(!open)}>
                <BlueprintForm/>
            </Modal>
        </div>
    )
}