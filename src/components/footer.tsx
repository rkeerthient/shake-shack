import * as React from "react";

const Footer = () => {
  return (
    <footer className="pt-5">
      <img
        loading="lazy"
        src="https://i.imgur.com/BTfF9uC.png"
        alt=""
        className="hidden  md:block max-w-full	w-full"
      />
      <img
        loading="lazy"
        src="https://i.imgur.com/GsYAqy3.png"
        alt="block md:hidden"
        className="block md:hidden max-w-full	w-full"
      />
    </footer>
  );
};
export default Footer;
