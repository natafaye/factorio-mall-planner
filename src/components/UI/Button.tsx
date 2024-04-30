export default function Button({ children = "", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={className + " bg-stone-600 text-stone-200 p-3 m-3 rounded-md "
        + "hover:bg-stone-700 hover:p-4 hover:m-2 transition-all"}
      {...props}
    >
      {children}
    </button>
  )
}

