import React from 'react'
import { IMapData } from './Map'

const PopUp = (props : IMapData) => {
  return (
    <div>
      <img src={props.countryInfo.flag} alt="flag" className="w-8" />
      <h1 className="text-xl">
        <span className="font-semibold">Country Name:</span>
        {props.country}
      </h1>
      <h2>
        <span className="font-semibold">Total Active Cases:</span>{" "}
        {props.active}
      </h2>
      <h2>
        <span className="font-semibold">Total Recovered Cases:</span>{" "}
        {props.recovered}
      </h2>
      <h2>
        <span className="font-semibold">Total Deaths:</span> {props.deaths}
      </h2>
    </div>
  );
}

export default PopUp
