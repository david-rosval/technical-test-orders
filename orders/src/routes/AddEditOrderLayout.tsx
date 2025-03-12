import { Link, Outlet } from "react-router";

export default function AddEditOrderLayout() {
  return (
    <div>
      <Link to="/my-orders">{"<-"} Back</Link>
      <Outlet />
    </div>
  )
}
