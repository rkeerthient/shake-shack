import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Image } from "@yext/pages/components";

import Cta from "./cta";
import { Markdown } from "react-showdown";
const Carousel = (props: any) => {
  const { data } = props;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => (
          <div key={index} className="p-4">
            <div>
              {/* <img
                src={item.c_photo.url}
                alt=""
                className="max-w-full	w-full"
              /> */}
              <Image image={item.c_photo} className="max-w-full	w-full"></Image>
            </div>
            <div className="textClass flex justify-between leading-6 font-normal">
              <div className="w-3/4 text-left ml-1">
                <div className="mt-4 text-base font-bold">{item.name}</div>
                <div className="mt-4 text-xs">
                  <Markdown markdown={item.description}></Markdown>
                </div>
              </div>
              <div className="mt-4 w-1/4">
                <AiOutlinePlusCircle
                  className="w-12 h-12 float-right"
                  style={{ stroke: "#4a8459", fill: "#4a8459" }}
                />
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default Carousel;
