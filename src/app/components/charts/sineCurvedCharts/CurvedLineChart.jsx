import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import colors from "../../../config/colors";

function CurvedLineChart({ data }) {
  const chartContainer = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy();
      }

      const ctx = chartContainer.current.getContext("2d");

      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Dataset 1",
              data: [10, -20, 40, -30, -60, 20, 30],
              borderColor: colors.paleBlue,
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",
              data: [44, -70, 90, -10, -50, 50, 20],
              borderColor: colors.paleBlue,
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",
              data: [1, -10, 10, -60, -30, 15, 37],
              borderColor: colors.paleBlue,
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",
              data: [82, -4, 58, -74, -63, 36, 58],
              borderColor: colors.palepurple,
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",
              data: [34, -50, 20, -10, -80, 90, 10],
              borderColor: colors.palepurple,
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",
              data: [0, 0, 0, 0, 0, 0, 0],
              borderColor: "#CCCCCC",
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
            {
              label: "Dataset 1",

              data: [80, -2, 55, -70, -60, 30, 0],
              borderColor: [colors.purple],
              borderWidth: 5,
              lineTension: 0.4,

              borderCurve: 0.5,
              borderDash: [10, 10],
              borderCapStyle: "round",
              fill: false,
              pointStyle: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              position: "top",
            },
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              display: false,
              grid: {
                display: false, // Hide x-axis grid lines
              },
              min: -100,
              max: 100,
              ticks: {
                callback: (value) => {
                  if (value === 0) {
                    return "0";
                  } else if (value < 0) {
                    return "left";
                  } else {
                    return "right";
                  }
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartContainer} />;
}

export default CurvedLineChart;
