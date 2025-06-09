import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Message from "../../components/Message";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant={danger}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="object-cover w-full rounded-lg h-[30rem]"
                />
                <div className="flex justify-between w-[20rem] mt-1">
                  <div className="one">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-xl text-gray-500">
                      ${price}
                    </p> <br /> <br />
                    <p className="w-[25rem] text-2xl text-gray-700">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="text-lg one">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2 text-black" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2 text-black" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-black" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>
                    <div className="text-lg two">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2 text-black" />
                        Ratings: {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaShoppingCart className="mr-2 text-black" />
                        Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaBox className="mr-2 text-black" />
                        InStock: {""}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
