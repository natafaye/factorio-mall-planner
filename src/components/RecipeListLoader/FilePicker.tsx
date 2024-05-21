import { MouseEvent } from "react"
import { useDropzone } from "react-dropzone"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import styles from "./FilePicker.module.css"

type Props = {
    file: File | null
    onPick: (file: File | null) => void
}

export default function FilePicker({ onPick, file }: Props) {

    const {
        getRootProps, getInputProps,
        isDragAccept, isDragReject,
        fileRejections,
    } = useDropzone({
        accept: { 'application/json': ['.json'] },
        onDrop: (acceptedFiles: File[]) => {
            if(acceptedFiles[0])
                onPick(acceptedFiles[0])
        }
    })

    const handleClearFile = (event: MouseEvent) => {
        console.log(event)
        event.stopPropagation()
        onPick(null)
    }

    return (
        <div className="flex">
            <div {...getRootProps({ className: "flex-grow"})}>
                <input {...getInputProps()} />
                <div
                    className={classNames(
                        styles.borderLongDash,
                        "p-3 rounded border-stone-500 text-lg",
                        isDragAccept ? 
                            "bg-green-800" : 
                        isDragReject ?
                            "bg-red-800" :
                            "bg-stone-700"
                    )} 
                    style={{ 
                        // eslint-disable-next-line
                        ["--border-dash-color" as any]: 
                            isDragAccept || file ? 
                                "#22c55e" : // green-500
                            isDragReject ?
                                "#ef4444" : // red-500
                                "#78716c" // stone-500
                     }} 
                >
                    {
                        isDragAccept ?
                            <p>That looks good! Drop it right here.</p> :
                        isDragReject ?
                            <p>Uh oh, that looks like the wrong file type.</p>:
                        file ?
                            <p className="p-2 bg-stone-900 rounded w-fit relative z-10">
                                {file.name}
                                <button className="ms-2 hover:text-stone-400" onClick={handleClearFile}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </p> :
                        fileRejections.length ?
                            <p>Drag and drop the <span className="font-bold text-red-300">factorio-data.json</span> file here</p> :
                            <p>Drag and drop the <span className="font-bold">factorio-data.json</span> file here</p>
                    }
                </div>
            </div>
        </div>
    )
}