import { useSelector } from "react-redux";

const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  return (
    <div className="absolute left-4 top-8">
      {favoriteCount > 0 && (
        <span className="flex items-center justify-center w-6 h-6 text-white bg-pink-500 rounded-full text-md">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoriteCount;
