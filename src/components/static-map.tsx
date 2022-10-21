import * as React from "react";

type Coordinates = {
  latitude: string;
  longitude: string;
};

const StaticMap = (props: Coordinates) => {
  const { latitude, longitude } = props;

  return (
    <img
      className="mapStyle w-full"
      src={
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        `${latitude}` +
        "," +
        `${longitude}` +
        "&zoom=15&scale=4&size=1800x250&maptype=roadmap&markers=color:red%7Clabel:LL%7C " +
        `${latitude}` +
        "," +
        `${longitude}` +
        "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
      }
    ></img>
  );
};

export default StaticMap;
