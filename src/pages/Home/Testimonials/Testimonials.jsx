import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="mb-12">
      <SectionTitle
        heading={"testimonials"}
        subHeading={"What Our Client Says"}
      ></SectionTitle>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center space-y-3 my-6 mx-32">
                <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                <p>{review.details}</p>
                <p className="text-2xl">{review.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
