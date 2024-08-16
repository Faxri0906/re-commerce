import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const TABLE_HEADERS = [
  "Product Name",
  "Product Image",
  "Product Price",
  "Actions",
];
function ProductsPage() {
  const [products,setProducts] = useState(null);
  const fetchProducts = async () => {
    await axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDeleteProduct = async (id) => {
    await axios.delete("http://localhost:3000/products/" + id).then((res) => {
      if (res.status === 200){
        toast.success("Succesfully deleted product!");
        fetchProducts();
      }
    });
  };
  return (
    <div className="container mt-12">
      <h1 className="text-4xl font-semibold text-slate-600">Products Panel</h1>
      <table className="w-full border mt-12">
        <tr className="border">
          {TABLE_HEADERS.map((header) => <th key={header} className="border">{header}</th>)}
        </tr>
        {products?.map((product) => (
          <tr className="[&>td]:text-center divide-x border-b">
            <td>{product.title.slice(0,32).concat('...')}</td>
            <td className="flex items-center justify-center">
              <img src={product.image} className="size-32 object-contain"/>
            </td>
            <td>{product.price}$</td>
            <td>
              <Link to={`/products/${product.id}/edit`} className="px-4 py-2 inline-block bg-black text-white rounded-3xl shadow-lg hover:bg-white hover:text-black border-black border-[2px]">Edit</Link>
              <button onClick={() => handleDeleteProduct(product.id)} className="px-4 py-2 inline-block ml-4 bg-black text-white rounded-3xl shadow-lg hover:bg-white hover:text-black border-black border-[2px]">Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
    );
};

export default ProductsPage;