import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AddEditOrderLayout({ to }: { to: string }) {
  return (
    <div>
      <Link to={to} className="back-button">{<ArrowLeft />} Back</Link>
      <Outlet />
    </div>
  )
}
