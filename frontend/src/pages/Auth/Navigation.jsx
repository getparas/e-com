import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSLice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from "../Products/FavoriteCount";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
            Home
          </span>
          {""}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
            Shop
          </span>
          {""}
        </Link>
        <Link to="/cart" className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
            <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
              Cart
            </span>
            {""}
          </div>
          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="flex items-center justify-center w-6 h-6 text-white bg-pink-500 rounded-full text-md">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link to="/favorite" className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart size={26} className="mr-2 mt-[3rem]" />
            <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
              Favorite
            </span>
            {""}
            <FavoriteCount />
          </div>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-xl font-bold text-white">
              {userInfo.username}
            </span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-800 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-xl font-bold hover:bg-zinc-300"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                className="block px-5 py-2 text-xl font-bold hover:bg-zinc-300"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
              <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
                Login
              </span>
              {""}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
              <span className="hidden nav-item-name mt-[3rem] font-bold text-xl">
                Register
              </span>
              {""}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
