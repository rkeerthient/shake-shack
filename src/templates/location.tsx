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
    services,
    c_featuredMenu,
    c_relatedFAQs,
  } = document;
  console.log(JSON.stringify(document));

  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    console.log(query);
  };

  return (
    <>
      <Header />
      <Banner name={name} address={address} openTime={openTime}></Banner>

      <div className="centered-container">
        <div className="section">
          <h1 className="text-2xl font-bold uppercase text-center">
            Shake Shack
          </h1>
          <div className="grid grid-cols-2 mx-auto ">
            <div className="my-auto mx-auto">
              <Contact address={address} phone={mainPhone}></Contact>
              {services && <List list={services}></List>}
            </div>
            <div className="pt-5 ">
              <div className="flex leading-loose items-center text-xl">
                <FiPhone />
                <span className="ml-2">
                  {mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                </span>
              </div>
              <div className="flex leading-loose items-center text-xl">
                <FiClock />
                <span className="ml-2">Today is open</span>
              </div>

              {hours && <Hours title={""} hours={hours} />}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto p-4">
        {c_featuredMenu && <Carousel data={c_featuredMenu}></Carousel>}
      </div>
      <div className="p-4 w-2/4 mx-auto text-center mb-10">
        <h1 className="text-2xl font-bold border-b border-black mb-4 pb-4">
          FAQs
        </h1>
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
      <div className="pt-5 relative">
        {geocodedCoordinate && (
          <StaticMap
            latitude={geocodedCoordinate.latitude}
            longitude={geocodedCoordinate.longitude}
          ></StaticMap>
        )}
        <div className=" w-4/6 mx-auto text-center mt-10 p-10 absolute top-full left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white">
          <div className="text-2xl font-bold">About us</div>
          <div className="mt-4 text-left text-gray-500	leading-8 ">
            When Shake Shack started as a hot dog cart in New York City's
            Madison Square Park, our mission was simple: raise funds for a
            public art project. As we grew into a global business, our mission
            to Stand For Something Good expanded to include taking care of our
            team, sourcing premium ingredients from partners with the same
            dedication to quality, designing our Shacks responsibly, supporting
            our communities through donations, events, and volunteering—and much
            more. Doing good is in our roots, a part of our DNA since day one.
            20 years later, we're still continuing to expand and evolve our
            mission to Stand For Something Good in everything we do.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Location;
