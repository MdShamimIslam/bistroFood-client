import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

const Payment = () => {
  return (
    <div className="w-full px-12">
      <div className="w-full px-12">
      <SectionTitle
        heading={"Payment"}
        subHeading={"Please Pay to eat"}
      ></SectionTitle>
      </div>
      <div className="w-2/3 px-12 mx-auto mt-12">
      <Elements  stripe={stripePromise}>
        <CheckOut />
      </Elements>
      </div>
    </div>
  );
};

export default Payment;
