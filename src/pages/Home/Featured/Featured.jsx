import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
  return (
    <div className="my-16 featuredItem pt-8 bg-fixed ">
      <SectionTitle
      className=''
        heading="featured item"
        subHeading="Check it Out"
      ></SectionTitle>
      <div className="md:flex justify-center items-center gap-12 px-32 pt-12 pb-24 bg-slate-800 bg-opacity-30">
        <img className="w-1/2" src={featuredImg} alt="" />
        <div className="space-y-2 text-white">
          <h3 className="font-semibold">Aug 20 , 2025</h3>
          <h2 className="font-semibold">WHERE CAN I GET SOME</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque ex
            nisi atque alias? Veniam, beatae? Eum ea esse quaerat, amet optio
            ipsa ipsam, repellendus impedit, in nesciunt voluptate neque magni
            tenetur. Itaque, facilis delectus quam mollitia sunt perferendis
            dolor suscipit! Libero magni ullam ut exercitationem quas veniam
            deleniti repellendus distinctio!
          </p>
          <button className="btn btn-outline border-0 border-b-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
