import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();

  const totalPrice = cart
    .reduce((sum, item) => sum + item?.price, 0)
    .toFixed(2);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmCardError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmCardError) {
      console.log("paymentIntent error", confirmCardError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const paymentInfo = {
          email: user?.email,
          price: parseFloat(totalPrice),
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          transactionId: paymentIntent.id,
          status: "pending",
        };
        await axiosSecure.post("/payments-info", paymentInfo);
        refetch();
        toast.success("Your Payment Successful!");
        navigate("/dashboard/payment-history");
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg mb-8">
        Total Amount :{" "}
        <span className="text-orange-600 font-semibold">${totalPrice}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="mt-6 btn btn-warning btn-sm"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <div className="mt-4">
          <p className="text-red-600">
            <span className="font-semibold">{error}</span>
          </p>
          {transactionId && (
            <p className="text-green-600">
              <span className="font-semibold">
                Transaction id : {transactionId}
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
