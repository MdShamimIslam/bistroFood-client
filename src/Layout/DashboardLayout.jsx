import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { MdHomeWork } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { BsMenuDown } from "react-icons/bs";
import { LiaFirstOrderAlt } from "react-icons/lia";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center ">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="admin-home">
                    <MdHomeWork /> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manage-users">
                    <MdOutlineManageHistory /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="all-users">
                    <BsCartFill /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="add-item">
                    <TbBrandBooking /> Add Item
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="user-home">
                    <MdHomeWork /> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="payment-history">
                    <MdOutlineManageHistory /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="my-Cart">
                    <BsCartFill /> My Cart
                    <span className="badge badge-secondary">
                      +{user ? cart.length : 0}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="bookings">
                    <TbBrandBooking /> My Bookings
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider my-4"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                <BsMenuDown /> Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <LiaFirstOrderAlt /> Order Food
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
