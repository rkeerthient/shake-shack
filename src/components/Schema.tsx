import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { SelfStorage } from "schema-dts";
const Schema = (props: any) => {
  const { document } = props;
  const name = document.name;
  const address = document.address;
  const email = document.emails;
  const telephone = document.mainPhone;
  const image = document.photoGallery
    ? document.photoGallery[0].image.url
    : null;
  const paymentAccepted = document.paymentOptions;
  return (
    <>
      <JsonLd<SelfStorage>
        item={{
          "@context": "https://schema.org",
          "@type": "SelfStorage",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          email: email,
          telephone: telephone,
          image: image,
          paymentAccepted: paymentAccepted,
        }}
      />
    </>
  );
};

export default Schema;
