import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories, price filter, and search term
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            const matchesSearchTerm = product.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            const matchesPriceFilter =
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10);
            return matchesSearchTerm && matchesPriceFilter;
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    searchTerm,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-4 mt-2 mb-2 rounded-lg">
            <h2 className="h4 text-center py-2 px-3 text-xl font-bold bg-white text-black rounded-lg mb-2 ">
              Filter By Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 font-medium text-white dark:text-gray-300 text-xl"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* Brands */}
            <h2 className="h4 text-center py-2 px-3 text-xl font-bold bg-white text-black rounded-lg mb-2">
              Filter By Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-5 h-5 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 font-medium text-white dark:text-gray-300 text-xl"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="h4 text-center py-2 px-3 text-xl font-bold bg-white text-black rounded-lg mb-2 ">
              Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full py-3 px-2 border-1 text-lg placeholder-zinc-700 border-none rounded-md font-bold focus:outline-none focus:ring-4 focus-border-blue-400"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full border-2 rounded-md my-4 px-3 py-2 text-xl font-bold text-white"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3 flex-1 ml-[3rem]">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-4 px-6 text-xl bg-zinc-900 text-white font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500"
              />
            </div>
            <h2 className="h4 text-center mb-2 text-xl font-bold">
              {products?.length} Products
              <div className="flex flex-wrap">
                {products.length === 0 ? (
                  <Loader />
                ) : (
                  products?.map((p) => (
                    <div className="p-3" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))
                )}
              </div>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
