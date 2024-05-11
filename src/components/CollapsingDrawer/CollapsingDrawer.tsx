import { HTMLAttributes, ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"

type Props = HTMLAttributes<HTMLDivElement> & {
    direction: "up" | "down"
    initiallyExpanded?: boolean
    children: ReactNode
}

export default function CollapsingDrawer({ direction, initiallyExpanded = true, children, ...props }: Props) {
    const [expanded, setExpanded] = useState(initiallyExpanded)
    return (
        <div className="bg-stone-900 flex flex-col">
            {direction === "up" && expanded && (
                <div {...props}>{children}</div>
            )}
            <button className="w-full hover:text-stone-400" onClick={() => setExpanded(!expanded)}>
                <FontAwesomeIcon icon={
                    expanded && direction === "up" || !expanded && direction === "down" ?
                        faAngleUp : faAngleDown
                } />
            </button>
            {direction === "down" && expanded && (
                <div {...props}>{children}</div>
            )}
        </div>
    )
}