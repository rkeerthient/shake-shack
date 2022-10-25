import * as React from "react";

type Cta = {
  buttonText: string;
  url: string;
  style?: string;
};

const Cta = (props: Cta) => {
  const { buttonText, url, style } = props;

  return (
    <a
      href={url}
      className={
        `${style}` +
        " border py-2 px-3 md:py-4 md:px-6 text-sm md:text-base font-bold text-white rounded-full"
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
