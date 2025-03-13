import { Link } from "react-router";
import useProducts from "../hooks/useProducts";
import DeleteButton from "../components/DeleteButton";
import { deleteProduct } from "../utils/products.api";

export default function Products() {
  const { products, setProducts, loading } = useProducts()

  const deleteProd = async (id: number | undefined) => {
    try {
      const result = await deleteProduct(id)
      console.log(result)
      
      setProducts(prev => prev.filter(prod => prod.id !== id))
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <Link to="/add-product">+ New Product</Link>
      {!loading ? !products.length ? (
        <p>Add Products to display</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.unitPrice}</td>
                <td>
                  <div>
                    <Link className="edit-button" to={`/add-product/${product.id}`}>Edit</Link>
                    <DeleteButton confirmationText="Do you want to delete this product?" onConfirm={() => deleteProd(product.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>Loading orders...</p>}
      
    </div>
  )
}
