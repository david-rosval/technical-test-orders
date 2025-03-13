import { Link } from "react-router";
import useProducts from "../hooks/useProducts";
import DeleteButton from "../components/DeleteButton";
import { deleteProduct } from "../utils/products.api";
import { ArrowLeft } from "lucide-react";
import LoaderComponent from "../components/LoaderComponent";

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
      <Link to={"/"} className="back-button inline-flex items-center gap-3 transition-colors duration-200 ease-in-out text-blue-500 hover:text-blue-600 mb-5">{<ArrowLeft />} Back</Link>
      <h1 className="text-4xl md:text-6xl font-bold mb-10">Products</h1>
      <Link className="p-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out inline-block bg-slate-400  dark:bg-slate-800  hover:bg-slate-400/80 dark:hover:bg-slate-800/80" to="/add-product">+ New Product</Link>
      {!loading ? !products.length ? (
        <p>Add Products to display</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto block mt-5 border-collapse">
            <thead className="h-12 bg-neutral-200 dark:bg-neutral-900 ">
              <tr>
                <th className="min-w-10 px-5">Id</th>
                <th className="min-w-36 px-5">Name</th>
                <th className="min-w-32 px-5">Unit Price</th>
                <th className="min-w-fit px-5">Options</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-neutral-100 dark:bg-neutral-800 h-20 border-y border-neutral-100 dark:border-neutral-600">
                  <td className="px-5 text-center">{product.id}</td>
                  <td className="px-5 text-center">{product.name}</td>
                  <td className="px-5 text-center">{product.unitPrice}</td>
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <Link className="rounded bg-blue-300 dark:bg-blue-500 px-3 py-2 cursor-pointer" to={`/add-product/${product.id}`}>Edit</Link>
                      <DeleteButton confirmationText="Do you want to delete this product?" onConfirm={() => deleteProd(product.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (
        <div className="w-full mt-10 h-fit">
          <LoaderComponent text="Loading products" />
        </div>
      )}
      
    </div>
  )
}
