import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactLoading from "react-loading";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";

import "../../App.css";
import leaflet from "../../assets/images/placeholder.png";
import PopUp from "./PopUp";
import { Icon, LatLngExpression } from "leaflet";

export interface IMapData {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

interface IMarket {
  position: LatLngExpression;
  popup: JSX.Element;
}

const Map = () => {
  const { data, status } = useQuery<IMapData[] | undefined>(
    "mapData",
    async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      if (!response.ok) {
        throw new Error("Problem fetching data");
      }
      return response.json();
    }
  );

  const icon = new Icon({
    iconUrl: leaflet,
    iconSize: [25, 25],
  });

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center text-center w-full h-96 my-20">
        <ReactLoading type="spin" className="mx-auto" color="#000" />
        <h1 className="text-xl font-semibold my-4">Loading Map Data</h1>
      </div>
    );
  } else if (status === "error") {
    return <div>Error fetching data</div>;
  } else {
    const marketData: IMarket[] | undefined = data?.map((country) => ({
      position: [country.countryInfo.lat, country.countryInfo.long],
      popup: <PopUp {...country} />,
    }));

    return (
      <div className="mt-32 text-center">
        <h1 className="font-semibold text-gray-500 text-sm py-4">
          Map Data of Cases
        </h1>
        <MapContainer
          center={[28.7041, 77.1025]}
          zoom={4}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marketData?.map((country, index) => (
            <Marker
              position={country.position as LatLngExpression}
              key={index}
              icon={icon}
            >
              <Popup>{country.popup}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
};

export default Map;
