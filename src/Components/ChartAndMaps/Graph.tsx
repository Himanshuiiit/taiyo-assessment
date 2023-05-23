import React from "react";
import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import ReactLoading from "react-loading";


interface IGraphData {
  cases: {
    [key: string]: number;
  };
  deaths: {
    [key: string]: number;
  };
  recovered: {
    [key: string]: number;
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const { data, status } = useQuery<IGraphData>("graphData", async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    return response.json();
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "COVID-19 Cases",
      },
    },
  };

  const dataCases : ChartData<"line"> = {
    labels: Object.keys(data?.cases || {}),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data?.cases || {}),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Deaths",
        data: Object.values(data?.deaths || {}),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Recovered",
        data: Object.values(data?.recovered || {}),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center text-center w-full h-96 my-20">
        <ReactLoading type="spin" className="mx-auto" color="#000" />
        <h1 className="text-xl font-semibold my-4">Loading Graph Data</h1>
      </div>
    );
  } else if (status === "error") {
    return <div>Error fetching data</div>;
  } else {
    return (
      <div className="sm:mx-8 sm:mt-20">
        <Line options={options} data={dataCases} />
      </div>
    );
  }
};

export default Graph;
