import React from "react";
import useCart from "../../../hooks/useCart";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleOrderDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${item?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${item?._id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full px-12">
      <div className="flex justify-evenly gap-8 md:gap-0">
        <h3 className="md:text-xl font-semibold uppercase">
          Total Items : {cart?.length}
        </h3>
        <h3 className="md:text-xl font-semibold uppercase">
          Total Price : ${totalPrice}
        </h3>
        {
          cart?.length ? <Link to={'/dashboard/payment'}><button className="btn btn-warning btn-sm">Pay Now</button></Link>
          :
          <button disabled className="btn btn-warning btn-sm">Pay Now</button>
        }
       
      </div>
      <div className="overflow-x-auto mt-12 ">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>
                <div className="ml-4">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>Zemlak, Daniel and Leannon</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleOrderDelete(item)}
                    className=" text-red-700 btn-lg"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
