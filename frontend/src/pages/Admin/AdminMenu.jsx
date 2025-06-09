import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-zinc-900 p-3 fixed rounded-full z-20`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="h-1 my-1 bg-white rounded-sm w-7"></div>
            <div className="h-1 my-1 bg-white rounded-sm w-7"></div>
            <div className="h-1 my-1 bg-white rounded-sm w-7"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="fixed p-4 rounded-lg bg-zinc-900 right-7 top-5">
          <ul className="mt-2 list-none">
            <li>
              <NavLink
                className="bg-[#2e2d2d] block px-3 py-2 mb-5 text-xl font-bold rounded-md list-item"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 mb-5 list-item bg-[#2e2d2d] rounded-md text-xl font-bold"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 mb-5 list-item bg-[#2e2d2d] rounded-md text-xl font-bold"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 mb-5 list-item bg-[#2e2d2d] rounded-md text-xl font-bold"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 mb-5 list-item bg-[#2e2d2d] rounded-md text-xl font-bold"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 mb-5 list-item bg-[#2e2d2d] rounded-md text-xl font-bold"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
