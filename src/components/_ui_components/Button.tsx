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

export function FileInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={className + " file:bg-stone-600 file:text-stone-200 "
        + "file:m-2 file:p-2 file:rounded-md file:border-0 "
        + "hover:file:bg-stone-700 hover:file:p-3 hover:file:m-1 file:transition-all"}
      type="file"
      {...props}
    />
  )
}