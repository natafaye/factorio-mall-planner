import classNames from "classnames";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={classNames(
                    className,
                    "bg-stone-200 border-stone-400 border-1 text-stone-800 rounded-md p-2",
                    "disabled:bg-stone-400 disabled:text-stone-600"
                )}
                {...props}
            />
        )
    }
)

export default Input