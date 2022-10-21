import * as React from "react";
import Cta from "../components/cta";
import { Address } from "@yext/pages/components";

const Contact = (props: any) => {
  const { address, phone } = props;

  return (
    <>
      <div className="grid  ">
        <div className="grid ">
          <div>{address.line1}</div>
          {address.line2 && <div>{address.line2}</div>}
          <div>
            {address.city}, {address.region} {address.postalCode}
          </div>
        </div>
        <div className="mt-10 text-xl uppercase text-green-600 underline">
          <a>Get Directions</a>
        </div>
        <div className="w-30 mt-10">
          <Cta buttonText="Order Online" url="#" style="secondary-cta"></Cta>
        </div>
      </div>
    </>
  );
};

export default Contact;
