import React from "react";
import PopularItem from "../PopularItem/PopularItem";
import Cover from "../Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items,img, title }) => {
  return (
    <div>
      {
        title && <Cover img={img} title={title}></Cover>
      }
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {items?.map((item) => (
          <PopularItem key={item._id} item={item}></PopularItem>
        ))}
      </div>
      <Link to={title ? `/order/${title}` : '/order/salad'}>
      <div className="flex justify-center ">
      <button className="btn btn-outline border-0 border-b-4 my-8 w-1/4 border-red-500"> Order Now</button>
      </div>
      </Link>
    </div>
  );
};

export default MenuCategory;
