import * as React from "react";
import Cta from "../components/cta";
import { BsSearch } from "react-icons/bs";
type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = () => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div className="w-full">
        <nav className="relative">
          <img src="https://i.imgur.com/cJtnz2b.png"></img>
          <BsSearch className="absolute  top-2/4 " style={{ right: "5%" }} />
          {/* <div className="text-2xl font-semibold">Turtlehead Tacos</div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <div className="space-x-5">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta
              buttonText="Order Delivery"
              url="#"
              style="secondary-cta"
            ></Cta>
          </div> */}
        </nav>
      </div>
    </>
  );
};

export default Header;
