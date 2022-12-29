import { Chart } from "chart.js";
import React, { useRef, useEffect } from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import DonutChart from "react-donut-chart";

ChartJs.register(ArcElement, Tooltip, Legend);
function UserStats() {
  const canvasRef = useRef();
  const options = {};
  const dataDoughnut = {
    labels: ["JavaScript", "Python", "Ruby"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  //   const configDoughnut = {
  //     type: "doughnut",
  //     data: dataDoughnut,
  //     options: {},
  //   };

  //   useEffect(() => {
  //     const chartBar = new Chart(canvasRef?.current, configDoughnut);

  //     return () => {
  //       chartBar.destroy();
  //     };
  //   }, []);

  return (
    <>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="py-3 px-5 bg-gray-50">Doughnut chart</div>
        {/* <canvas ref={canvasRef} class="p-10" id="chartDoughnut"></canvas> */}

        {/* <DonutChart data={dataDoughnut} options={options}></DonutChart> */}
      </div>
    </>
  );
}

export default UserStats;
