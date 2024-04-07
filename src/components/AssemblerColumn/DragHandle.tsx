import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

const DragHandle = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${className} w-full text-center text-stone-500`}
                {...props}
            >
                <FontAwesomeIcon icon={faGripLines} />
            </button>
        )
    }
)

export default DragHandle