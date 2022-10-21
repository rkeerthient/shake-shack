import * as React from "react";
import Cta from "../components/cta";
import { BsSearch } from "react-icons/bs";
import { SearchBar } from "@yext/search-ui-react";
import { useState } from "react";
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
  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    if (query)
      window.open(
        "https://answers_shakeshackdemo_com.sbx.yextpages.net/?query=" + query,
        "_blank"
      );
  };
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="w-full">
        <nav className="relative">
          <img src="https://i.imgur.com/cJtnz2b.png"></img>
          {!isActive && (
            <BsSearch
              className="absolute bottom-2/4 "
              style={{ right: "5%" }}
              onClick={(e) => setIsActive(!isActive)}
            />
          )}

          {isActive && (
            <div className="div1 show">
              <SearchBar
                onSearch={onSearch}
                customCssClasses={{
                  searchBarContainer:
                    "w-1/6 absolute bottom-0 left-3/4 custClass",
                }}
                hideRecentSearches={true}
              />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
