import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="p-3 md:w-3/4 ">
          <div className="h-12 text-4xl font-bold">Create Product</div>
          {imageUrl && (
            <div className="text-center ">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3 ">
            <label className="block w-full px-4 text-xl font-bold text-center text-black border-2 rounded-lg cursor-pointer border-zinc-900 py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>{" "}
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
                </label>{" "}
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
                </label>{" "}
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
                </label>{" "}
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
                </label>{" "}
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border-2 rounded-md bg-white text-black text-xl"
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
            <button
              onClick={handleSubmit}
              className="px-5 py-3 mt-5 text-xl text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
