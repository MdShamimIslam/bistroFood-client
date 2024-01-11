import React from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const [,refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = () => {
    if(user){
      const cartItem = { name, image, price, menuId: _id, email: user?.email };

      axiosSecure.post('/carts',cartItem)
      .then((data) => {
        if (data.data.insertedId) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your order added to the cart",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    }
    else{
      Swal.fire({
        title: "Please login do you want to add food",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now"
      }).then((result) => {
        if (result.isConfirmed) {
          
         navigate('/login',{state:{from:location}});
        }
      });
    }
    
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={image} alt="Shoes" />
      </figure>
      <p className="text-orange-600 font-semibold absolute bg-black px-4 py-2 rounded-xl">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>

        <div className="card-actions ">
          <button
            onClick={handleAddToCart}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
