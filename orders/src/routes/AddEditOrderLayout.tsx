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
