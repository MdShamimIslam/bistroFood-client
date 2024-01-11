import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slider1 from '../../../assets/home/slide1.jpg';
import slider2 from '../../../assets/home/slide2.jpg';
import slider3 from '../../../assets/home/slide3.jpg';
import slider4 from '../../../assets/home/slide4.jpg';
import slider5 from '../../../assets/home/slide5.jpg';

const Category = () => {
  return (
    <div>
      <SectionTitle
        heading="ORDER ONLINE"
        subHeading="From 11.00am to 10.00pm"
      ></SectionTitle>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mb-16 mt-6"
        >
          <SwiperSlide>
            <img src={slider1} alt="" />
            <h3 className="uppercase text-3xl -mt-20 text-center">Salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} alt="" />
            <h3 className="uppercase text-3xl -mt-20 text-center">pizzas</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} alt="" />
            <h3 className="uppercase text-3xl -mt-20 text-center">soup</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider4} alt="" />
            <h3 className="uppercase text-3xl -mt-20 text-center">dessert</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider5} alt="" />
            <h3 className="uppercase text-3xl -mt-20 text-center">salads</h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
