import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/?email=${user?.email}`);
      return res.data;
    },
  });

  const handlePaymentDelete = (payment) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete it`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/payments/${payment?._id}`).
        then((data) => {
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
    <div>
      <h3 className="text-2xl">Total Payments : {payments?.length}</h3>
        <div className="overflow-x-auto mt-12 ">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Payment Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.email}</td>
                  <td>{payment.transactionId}</td>
                  <td>${payment.price}</td>
                  <td>{payment.date}</td>
                  <td>
                    <button
                      onClick={() => handlePaymentDelete(payment)}
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

export default PaymentHistory;
