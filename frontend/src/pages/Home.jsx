import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./Products/Product";
import { useGetProductsQuery } from "../redux/api/productApiSlice";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null};
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem] ">
              Spacial Products
            </h1>
            <Link
              to="/shop"
              className="px-10 py-2 font-bold rounded-full bg-zinc-700 mr-[18rem] mt-[10rem] text-white text-2xl hover:bg-zinc-900"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
