import { HTMLAttributes, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard, faClipboardCheck } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

type Props = HTMLAttributes<HTMLDivElement> & {
    value: string,
    innerDivClassName?: string
}

export default function CopyBlock({ value, className, innerDivClassName, ...props }: Props) {
    const [recentlyCopied, setRecentlyCopied] = useState(false)

    const copyBlueprint = () => {
        navigator.clipboard.writeText(value)
        setRecentlyCopied(true)
    }

    useEffect(() => {
        if (recentlyCopied) {
            const timeout = setTimeout(() => setRecentlyCopied(false), 3000)
            return () => clearTimeout(timeout)
        }
    }, [recentlyCopied])

    return (
        <div
            {...props}
            className={classNames("bg-stone-700 rounded m-1 flex items-top", className)}
        >
            <div className={classNames("flex-grow p-3 overflow-auto", innerDivClassName)}>
                {value}
            </div>
            <button
                onClick={copyBlueprint}
                className={classNames(
                    "p-3",
                    recentlyCopied && "text-green-300 animate-wiggle",
                )}
            >
                <FontAwesomeIcon
                    size="lg"
                    icon={recentlyCopied ? faClipboardCheck : faClipboard}
                />
            </button>
        </div>
    )
}