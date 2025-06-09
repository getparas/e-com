import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ProgressSteps from "../../components/ProgressSteps";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems);
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        <Toaster />
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left ">Quantity</td>
                  <td className="px-1 py-2 text-left ">Price</td>
                  <td className="px-1 py-2 text-left ">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-20 h-20"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 ">{item.qty}</td>
                    <td className="p-2 ">${item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h1 className="mb-5 text-2xl font-semibold">Order Summary </h1>
          <div className="flex flex-wrap justify-between p-8 text-white rounded-lg bg-zinc-800">
            <ul className="text-lg">
              <li>
                <span className="mb-4 font-semibold">Items: </span>$
                {cart.itemsPrice}
              </li>
              <li>
                <span className="mb-4 font-semibold">Shipping: </span>$
                {cart.shippingPrice}
              </li>
              <li>
                <span className="mb-4 font-semibold">Tax: </span>$
                {cart.taxPrice}
              </li>
              <li>
                <span className="mb-4 font-semibold">Total: </span>$
                {cart.totalPrice}
              </li>
            </ul>
            {error && <Message var="danger">{error.data.message}</Message>}
            <div>
              <h2 className="mb-4 text-2xl font-semibol">Shipping</h2>
              <p>
                <strong>Address:</strong> {""}
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {""}
                {cart.shippingAddress.postalCode}, {""}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Payment Method</h2>
              <strong>Method:</strong> {""}
              {cart.paymentMethod}
            </div>
          </div>
          <button
            type="button"
            className="w-full px-2 py-3 mt-4 text-2xl font-bold text-white bg-pink-500 rounded-xl hover:bg-pink-600"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
