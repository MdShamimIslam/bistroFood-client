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
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'my-Cart',
                element:<MyCart></MyCart>
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
            }
        ]
    }
])