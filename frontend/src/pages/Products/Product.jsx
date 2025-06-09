import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[4rem] p-3 relative">
      <div className="relative w-[30rem] h-[20rem] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex items-center justify-between">
            <div className="text-2xl font-bold">{product.name}</div>
            <span className="px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:bg-text-300 mr-2 text-sm font-medium text-pink-800 bg-pink-100">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
