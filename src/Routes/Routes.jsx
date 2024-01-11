import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import Bookings from "../pages/Dashboard/Bookings/Bookings";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";

 export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/menu',
                element:<Menu></Menu>
            },
            {
                path:'/order/:category',
                element:<Order></Order>
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/signUp',
        element:<SignUp></SignUp>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            // user routes
            
            {
                path:'my-Cart',
                element:<PrivateRoute><MyCart></MyCart></PrivateRoute>
            },
            {
                path:'bookings',
                element:<Bookings></Bookings>
            },
            {
                path:'payment-history',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'user-home',
                element:<UserHome></UserHome>
            },

            // admin routes
            {
                path:'admin-home',
                element:<AdminHome></AdminHome>
            },
            {
                path:'all-users',
                element:<PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
            }
        ]
    }
])