
export default function ConfirmButton({
  children,
  condition
}: {
  children: React.ReactNode
  condition?: boolean
}) {
  return (
    <button className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-flex bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5 cursor-pointer disabled:opacity-30 disabled:pointer-events-none relative items-center" disabled={condition ? true : false} type="submit">
      {children}
    </button>
  )
}
