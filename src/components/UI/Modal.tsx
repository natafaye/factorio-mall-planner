import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent, ReactNode, useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
    isOpen: boolean
    children?: ReactNode
    title: string
    toggle: () => void
    closeOnOutsideClick?: boolean
}

export default function Modal({
    isOpen,
    children,
    title,
    toggle,
    closeOnOutsideClick = false
}: Props) {

    const modalRef = useRef<HTMLDivElement>(null)
    const onBackgroundClick = (event: MouseEvent) => {
        if (isOpen && closeOnOutsideClick && modalRef.current
            && !modalRef.current.contains(event.target as Element)) {
            toggle()
        }
    }

    return (
        isOpen && createPortal(
            <div onClick={onBackgroundClick} className="absolute top-0 bottom-0 left-0 right-0 
                bg-black bg-opacity-50 flex flex-col items-center">
                <div className="flex-shrink basis-10 min-h-4"></div>
                <div ref={modalRef} className="flex-shrink flex flex-col bg-stone-800 w-[40rem] max-w-[95%] rounded shadow-black shadow-lg">
                    <div className="flex w-full items-center text-stone-400">
                        <h4 className="flex-grow p-3 ps-4 text-lg ">{title}</h4>
                        <button className="p-3 pe-4 hover:text-white" onClick={toggle}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="p-4 pb-0 mb-3 overflow-y-auto max-h-[80vh]">
                        {children}
                    </div>
                </div>
                <div className="flex-shrink basis-16"></div>
            </div>,
            document.body
        )
    )
}