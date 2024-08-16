import { Field, Form, useFormik } from "formik";
import Input from "../../components/Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function EditProduct() {
    const {productId} = useParams();
    const [product,setProduct] = useState(null);
  const fetchProduct = async () => {
    await axios.get("http://localhost:3000/products/" + productId).then((res) => {
      setProduct(res.data);
    });
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: product?.title,
      price: product?.price,
      category: product?.category,
      image: product?.image,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(4, "The title must be 4 symbols or more").required('This field is required'),
      price: Yup.number().moreThan(0, "The price must be greater than 0").required('This field is required'),
      image: Yup.string().required('This field is required'),
      category: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      axios.patch("http://localhost:3000/products/" + productId,values).then((res) => {
        if(res.status === 200 || 201){
          toast.success("Succesfully added");
        };
      });
    },
  });
  const handleChangeDescription = (e) => {
    formik.setFieldValue("description",e)
  };
  if(!product) return <h1>Loading...</h1>;
  return (
    <div className="container">
        <div className="w-1/2 mx-auto mt-12 items-center p-8 bg-white drop-shadow-2xl shadow-2xl flex flex-col rounded-3xl min-h-[700px]">
          <h1 className="text-2xl font-semibold text-blue-400">Edit Product</h1>
          <p className="text-lg mt-2 font-medium opacity-50">To edit product , fill the form and press add</p>
          <form onSubmit={formik.handleSubmit} className="w-3/4 flex flex-col items-center mt-4 gap-2">
            <Input defaultValue={product?.title} label={"Title"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.title} value={formik.values.title} type={"text"}/>
            <Input defaultValue={product?.price} label={"Price"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.price} value={formik.values.price} type={"number"}/>
            {/*<Input label={"Description"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.description} value={formik.values.description} type={"text"}/>*/}
            <Input defaultValue={product?.image} label={"Image"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.image} value={formik.values.image} type={"url"}/>
            <Input defaultValue={product?.category} label={"Category"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.category} value={formik.values.category} type={"text"}/>
            <button type="submit" className="text-xl bg-black text-white px-10 py-3 mt-2 rounded-3xl hover:bg-white hover:text-black border-[2px] border-black">
              Edit
            </button>
          </form>
        </div>
    </div>
  )
}