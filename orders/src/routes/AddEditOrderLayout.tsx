import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AddEditOrderLayout() {
  return (
    <div>
      <Link to="/my-orders" className="back-button">{<ArrowLeft />} Back</Link>
      <Outlet />
    </div>
  )
}
