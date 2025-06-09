import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully.");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const result = await updateProduct({ productId: params._id, formData });

      if (result.error) {
        toast.error(result.error.message || "Update failed. Try again.");
      } else {
        toast.success("Product successfully updated.");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const result = await deleteProduct(params._id);

      if (result.error) {
        toast.error(result.error.message || "Delete failed. Try again.");
      } else {
        toast.success("Product successfully deleted.");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="p-3 md:w-3/4">
          <div className="h-12 text-4xl font-bold">Update / Delete Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block w-full mx-auto h-[40%] mb-3"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="block w-full px-4 text-xl font-bold text-center text-black border-2 rounded-lg cursor-pointer border-zinc-900 py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-black"
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  className="py-4 px-2 mb-3 w-[30rem] rounded-md border-2 bg-white text-black text-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="ml-10 two">
                <label htmlFor="name block" className="text-xl">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  className="py-4 px-2 mb-3 w-[30rem] rounded-md border-2 bg-white text-black text-xl"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block" className="text-xl">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  className="py-4 px-2 mb-3 w-[30rem] rounded-md border-2 bg-white text-black text-xl"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="ml-10 two">
                <label htmlFor="name block" className="text-xl">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  className="py-4 px-2 mb-3 w-[30rem] rounded-md border-2 bg-white text-black text-xl"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="" className="my-5 text-xl">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-white border-2 rounded-md w-[100%] text-black text-xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="name block" className="text-xl">
                  Count In Stock
                </label>{" "}
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border-2 rounded-md bg-white text-black text-xl"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="" className="text-xl">
                  Category
                </label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border-2 rounded-md bg-white text-black text-xl"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="">
              <button
                onClick={handleSubmit}
                className="px-10 py-4 mt-5 mr-6 text-xl font-bold bg-green-600 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-10 py-4 mt-5 text-xl font-bold bg-pink-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
