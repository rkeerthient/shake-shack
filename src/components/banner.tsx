import * as React from "react";
import Cta from "./cta";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: Banner) => {
  const { name, address, children } = props;

  return (
    <>
      <div className="hero">
        <img
          src="https://i.imgur.com/RlOXZV3.png"
          className="max-w-full	w-full"
        />
        <div className="uppercase p-4 md:p-10 w-auto absolute top-6	left-4 md:-translate-y-2/4 border md:left-28	md:top-1/2 text-white  opacity-80	color-white font-bold bg-black">
          <div className="text-xl md:text-4xl  ">{name?.split(",")[0]}</div>
          <div className="mt-2 md:text-xl">
            {address?.city}, {address?.region}
          </div>
          <div className="mt-4 md:mt-10 gap-1 flex justify-between">
            <Cta
              buttonText="Get Directions"
              url="http://google.com"
              style="primary-cta"
            />
            <Cta
              buttonText="Order now"
              url="http://google.com"
              style="primary-cta"
            />
          </div>
        </div>
      </div>

      {children}
    </>
  );
};

export default Banner;
