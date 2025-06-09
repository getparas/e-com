import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-4xl font-bold ml-[4rem] mt-[3rem]">
        Favorite Products
      </h1>
      {favorites.length > 0 ? (
        <div className="flex flex-wrap">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-2xl text-gray-500 ml-[4rem] mt-[2rem]">
          You have no favorite products yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
