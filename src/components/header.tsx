import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";

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
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey: "restaurants",
  });
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
  const [queryPrompts, setQueryPrompts] = useState<string[]>([]);
  const words = ["CSS3.", "HTML5.", "javascript."];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = queryPrompts[i].split("");
    var loopTyping = function () {
      if (word.length > 0) {
        let ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder += word.shift();
      } else {
        deletingEffect();
        return false;
      }
      timer = setTimeout(loopTyping, 65);
    };
    loopTyping();
  }

  function deletingEffect() {
    let word = queryPrompts[i].split("");
    var loopDeleting = function () {
      if (word.length > 0) {
        word.pop();
        let ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder = word.join("");
      } else {
        if (words.length > i + 1) {
          i++;
        } else {
          i = 0;
        }
        typingEffect();
        return false;
      }
      timer = setTimeout(loopDeleting, 35);
    };
    loopDeleting();
  }

  const fetchUnivPrompts = async () => {
    const apiKey = "f89499a2f2d7268ee58e76e8cb6bcdff";
    const experienceKey = "answers";
    const experienceVersion = "STAGING";
    const businessId = "2577253";
    const locale = "en";
    var url =
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete";
    url += "?v=20190101";
    url += "&api_key=" + apiKey;
    url += "&sessionTrackingEnabled=false";
    url += "&experienceKey=" + experienceKey;
    url += "&input=";
    url += "&version=" + experienceVersion;
    url += "&locale=" + locale;
    try {
      let res = await fetch(url);
      let body = await res.json();
      let qs = body.response.results.map((item: any) => {
        return item.value;
      });
      setQueryPrompts(qs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUnivPrompts();
  }, []);

  useEffect(() => {
    queryPrompts.length >= 1 && typingEffect();
  }, [queryPrompts]);

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="w-full">
          <nav className="">
            <img src="https://i.imgur.com/pDK1zJg.png"></img>
          </nav>
        </div>

        <div className="w-full">
          <SearchBar
            onSearch={onSearch}
            customCssClasses={{
              searchBarContainer: "w-3/6 mt-4 mx-auto mb-auto ",
              inputElement: "demo ",
            }}
            hideRecentSearches={true}
          />
        </div>
      </SearchHeadlessProvider>
    </>
  );
};

export default Header;
