import React, { FC } from "react";
import Graph from "./Graph";
import Map from "./Map";

const ChartAndMaps: FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-semibold sm:pt-12 sm:pl-12 m-8">Charts and Maps</h1>
      <Graph />
      <Map />
    </div>
  );
};

export default ChartAndMaps;
