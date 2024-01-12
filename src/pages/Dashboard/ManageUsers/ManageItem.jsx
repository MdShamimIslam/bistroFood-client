import React from 'react';
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItem = () => {
  const [menu,,refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleMenuDelete = (item) => {
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
            axiosSecure.delete(`/menu/${item?._id}`)
            .then((data) => {
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
    <h3 className="text-3xl font-semibold">Total Menu : {menu.length}</h3>
    <div className="overflow-x-auto mt-6">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {menu?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item?.name}</td>
              <td>${item?.price}</td>
              <td>
                <Link to={`/dashboard/update-item/${item._id}`}>
                <button
                    className="btn text-green-400 btn-sm text-lg"
                  >
                    <FaEdit></FaEdit>
                  </button></Link>
              </td>
              <td>
                <button
                  onClick={() => handleMenuDelete(item)}
                  className="btn text-red-700 btn-sm text-lg"
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

export default ManageItem;