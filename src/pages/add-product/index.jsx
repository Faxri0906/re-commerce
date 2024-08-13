import { Field, Form, useFormik } from "formik";
import Input from "../../components/Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function AddProductPage() {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(4, "The title must be 4 symbols or more").required('This field is required'),
      price: Yup.number().moreThan(0, "The price must be greater than 0").required('This field is required'),
      description: Yup.string().min(12, "The description must be 12 symbols or more").required('This field is required'),
      image: Yup.string().required('This field is required'),
      category: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      axios.post("http://localhost:3000/products",values).then((res) => {
        if(res.status === 200 || 201){
          toast.success("Succesfully added");
        };
      });
    },
  });
  const handleChangeDescription = (e) => {
    formik.setFieldValue("description",e)
  };
  return (
    <div className="container">
        <div className="w-1/2 mx-auto mt-12 items-center p-8 bg-white drop-shadow-2xl shadow-2xl flex flex-col rounded-3xl min-h-[700px]">
          <h1 className="text-2xl font-semibold text-blue-400">Add Product</h1>
          <p className="text-lg mt-2 font-medium opacity-50">To add product , fill the form and press add</p>
          <form onSubmit={formik.handleSubmit} className="w-3/4 flex flex-col items-center mt-4 gap-2">
            <Input label={"Title"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.title} value={formik.values.title} type={"text"}/>
            <Input label={"Price"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.price} value={formik.values.price} type={"number"}/>
            {/*<Input label={"Description"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.description} value={formik.values.description} type={"text"}/>*/}
            <ReactQuill theme="snow" className="w-full mb-12 block overflow-auto" value={formik.values.description} onChange={handleChangeDescription}/>
            <Input label={"Image"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.image} value={formik.values.image} type={"url"}/>
            <Input label={"Category"} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.category} value={formik.values.category} type={"text"}/>
            <button type="submit" className="text-xl bg-black text-white px-10 py-3 mt-2 rounded-3xl hover:bg-white hover:text-black border-[2px] border-black">
              Add
            </button>
          </form>
        </div>
    </div>
  )
}