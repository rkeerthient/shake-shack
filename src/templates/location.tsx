/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import "../index.css";
import { FiClock, FiPhone } from "react-icons/fi";
import parsePhoneNumber from "libphonenumber-js";
import Carousel from "../components/Carousel";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Header from "../components/header";
import Footer from "../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HoursText from "../components/HoursText";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import { SearchBar } from "@yext/search-ui-react";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "c_featuredMenu.name",
      "c_featuredMenu.c_photo",
      "c_featuredMenu.description",
      "c_relatedFAQs.question",
      "c_relatedFAQs.answer",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["restaurant"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    c_featuredMenu,
    c_relatedFAQs,
  } = document;

  const [isActive, setIsActive] = useState(false);
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey: "restaurants",
  });
  let services = ["Delivery Pickup", "Dine in"];
  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        <Header />
        <Banner name={name} address={address} openTime={openTime}></Banner>
        <div className="centered-container">
          <div className="section">
            <h1 className="text-2xl mb-4 font-bold text-green-600 uppercase text-center">
              Shake Shack
            </h1>
            <div className="grid grid-cols-2 mx-auto ">
              <div className="my-auto mx-auto">
                <Contact address={address} phone={mainPhone}></Contact>
              </div>
              <div className="pt-5 mx-auto">
                <div className="flex leading-loose items-center text-xl">
                  <FiPhone />
                  {mainPhone && (
                    <span className="ml-2">
                      {mainPhone
                        .replace("+1", "")
                        .replace(/\D+/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                    </span>
                  )}
                </div>
                <div className="flex mt-4">
                  <span className="font-bold ">Services:</span>
                  <ul className="ml-8 flex">
                    {services.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>

                {hours && (
                  <div className="flex w-full leading-loose items-baseline text-xl">
                    <FiClock />
                    <span className="ml-2">
                      <HoursText document={document} />
                    </span>
                    {!isActive && (
                      <BsChevronDown
                        className="ml-4"
                        onClick={(e) => setIsActive(!isActive)}
                      />
                    )}
                    {isActive && (
                      <BsChevronUp
                        className="ml-4"
                        onClick={(e) => setIsActive(!isActive)}
                      />
                    )}
                  </div>
                )}
                <span
                  className={`${isActive ? "visible" : "invisible"}`}
                  style={{ transitionDuration: ".5s" }}
                >
                  {hours && <Hours title={""} hours={hours} />}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto p-4 mb-4 mx-auto text-center">
          <h1 className="text-2xl mb-4 font-bold text-green-600 uppercase">
            Featured Menu
          </h1>
          {c_featuredMenu && <Carousel data={c_featuredMenu}></Carousel>}
        </div>
        <div className="w-full bg-gray-200">
          <div className="p-4 w-2/4 mx-auto text-center mb-10 ">
            <h1 className="text-2xl font-bold border-b border-black mb-4 pb-4">
              FAQs
            </h1>
            <div className="bg-grey-100 mt-10">
              {c_relatedFAQs && (
                <Accordion allowZeroExpanded>
                  {c_relatedFAQs.map((item: any, index: number) => (
                    <AccordionItem
                      key={index}
                      className="faqAccordion my-4 py-4 border-b  border-black text-left"
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <span className="font-bold">{item.question}</span>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>{item.answer}</AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-3/4 mx-auto flex p-4 justify-evenly"
          style={{ background: "#e7efdf" }}
        >
          <div className="my-auto w-1/2 ">
            <h1 className="text-2xl font-bold text-green-600 uppercase ">
              NEVER WAIT IN LINE AGAIN
            </h1>
            <div className="mt-4 text-xl">
              Only on the Shack App: exclusive offers + treats, contactless
              payment, curbside pick-up, delivery + way more.
            </div>
            <div className="flex w-3/4 mx-auto mt-8 gap-4">
              <img
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                alt=""
              />
              <img
                src="https://lh3.googleusercontent.com/q1k2l5CwMV31JdDXcpN4Ey7O43PxnjAuZBTmcHEwQxVuv_2wCE2gAAQMWxwNUC2FYEOnYgFPOpw6kmHJWuEGeIBLTj9CuxcOEeU8UXyzWJq4NJM3lg=s0"
                alt=""
              />
            </div>
          </div>
          <div>
            <img
              src="https://shakeshack.com/sites/default/files/Shake-Shake_App_540.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="mb-16 ">
          <div className="pt-5 relative">
            {geocodedCoordinate && (
              <StaticMap
                latitude={geocodedCoordinate.latitude}
                longitude={geocodedCoordinate.longitude}
              ></StaticMap>
            )}
            <div className="w-4/6 mx-auto text-center mt-10 p-10 absolute top-full left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white">
              <div className="text-2xl font-bold text-green-600">About us</div>
              <div className="flex gap-4 mt-8">
                <div className="mt-4 text-left text-gray-500 leading-8 w-1/2">
                  When Shake Shack started as a hot dog cart in New York City's
                  Madison Square Park, our mission was simple: raise funds for a
                  public art project. As we grew into a global business, our
                  mission to Stand For Something Good expanded to include taking
                  care of our team, sourcing premium ingredients from partners
                  with the same dedication to quality, designing our Shacks
                  responsibly, supporting our communities through donations,
                  events, and volunteering—and much more. Doing good is in our
                  roots, a part of our DNA since day one. 20 years later, we're
                  still continuing to expand and evolve our mission to Stand For
                  Something Good in everything we do.
                </div>
                <div className=" w-1/2">
                  <img
                    src="https://shakeshack.com/sites/default/files/styles/locations/public/feeds/images/Array--MSP.jpg?itok=6vsU3Pan"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-56 mb-4 ">
          <div className="w-3/4 mx-auto">
            <h1 className="text-2xl font-bold text-green-600 uppercase text-center mb-4">
              Current Promotions
            </h1>
            <div
              className="flex justify-evenly gap-3"
              style={{ height: "300px" }}
            >
              <div
                className="w-1/2"
                style={{
                  backgroundImage:
                    "url(https://dynl.mktgcdn.com/p-sandbox/Im0R8nBqJXfb055PICK7vLWl7XLxnbX7d_slh1DnseI/200x1.jpg)",
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="w-2/3 h-2/3 border my-auto"
                  style={{
                    padding: "1em",
                    marginTop: "5%",
                    marginLeft: "5%",
                    background: "black",
                    opacity: 0.8,
                    color: "white",
                  }}
                >
                  <h1 className="text-xl font-bold">
                    GRAB ONE SHAKE, GET ONE FREE
                  </h1>
                  <p className="mt-4">
                    From 8PM-close, score a second shake for free when you order
                    for pick-up online or on our app with code: SHAKENIGHT til
                    11/30.
                  </p>
                </div>
              </div>
              <div
                className="w-1/2"
                style={{
                  backgroundImage:
                    "url(https://shakeshack.com/sites/default/files/styles/hero_desktop_wide/public/2022-09/2022-Q3_Drinks_Web-Homepage-Banner_2880x1040.jpg?h=b74d7a05&itok=6oVoFOBt)",
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="w-2/3 h-2/3 border my-auto"
                  style={{
                    padding: "1em",
                    marginTop: "5%",
                    marginLeft: "5%",
                    background: "black",
                    opacity: 0.8,
                    color: "white",
                  }}
                >
                  <h1 className="text-xl font-bold">
                    FRESHLY PICKED FALL FLAVORS
                  </h1>
                  <p className="mt-4">
                    Crisp sips for fall in real fruit flavors: Yuzu Orange
                    Cider, Harvest Berry Lemonade, and Concord Grape Punch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </SearchHeadlessProvider>
    </>
  );
};

export default Location;
