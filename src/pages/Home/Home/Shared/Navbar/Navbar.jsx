import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import {FaShoppingCart} from 'react-icons/fa';
import useCart from "../../../../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();
  

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">Order Food</NavLink>
      </li>
      <li>
        <Link to='/dashboard'>
          <FaShoppingCart></FaShoppingCart>
          <div className="badge badge-secondary">+{user ? cart.length : 0}</div>
        </Link>
      </li>
      {user ? (
        <li>
          <p onClick={handleLogOut} className="cursor-pointer">
            Logout
          </p>
        </li>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-black bg-opacity-60 md:text-white fixed z-10 max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BistroFood</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="avatar">
          <div className="w-8 mr-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
