import { useParams } from "react-router"

export default function EditOrder() {
  const params = useParams()
  return (
    <div>
      <h1>Edit Order</h1>
      <p>{params.id}</p>
    </div>
  )
}
