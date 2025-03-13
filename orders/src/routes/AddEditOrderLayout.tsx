import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AddEditOrderLayout({ to }: { to: string }) {
  return (
    <div>
      <Link to={to} className="back-button inline-flex items-center gap-3 transition-colors duration-200 ease-in-out text-blue-500 hover:text-blue-600 mb-5">{<ArrowLeft />} Back</Link>
      <Outlet />
    </div>
  )
}

/* 
p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-flex bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5 cursor-pointer

p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-flex bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit mt-5 cursor-pointer disabled:opacity-30 disabled:pointer-events-none relative items-center

p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-flex bg-green-400  dark:bg-green-600  hover:bg-green-500/80 dark:hover:bg-green-600/80 font-semibold w-fit disabled:opacity-40 disabled:pointer-events-none cursor-pointer items-center
*/