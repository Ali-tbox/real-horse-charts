import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin
import colors from "../../../config/colors";

function PointBarChart() {
  const chartContainer = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy();
      }

      const ctx = chartContainer.current.getContext("2d");

      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              label: "Line Dataset",
              data: [, 28.5, -48.5, 38.5],
              borderColor: [
                colors.deepIndigo,
                colors.crimsonRed,
                colors.mediumblue,
              ],
              pointBackgroundColor: [
                colors.deepIndigo,
                colors.crimsonRed,
                colors.mediumblue,
              ],
              pointRadius: 5,
              pointHoverRadius: 5,
              pointBorderWidth: 2,
              borderWidth: 0,
              type: "line",
            },
            {
              label: "Bar Dataset",
              data: [, 30, -50, 40],
              backgroundColor: [
                colors.indigo,
                colors.lightCrismonRed,
                colors.lightMediumBlue,
              ],
              borderRadius: 16,
              maxBarThickness: "12",
              borderSkipped: false,
            },
            {
              label: "Line Dataset",
              data: [20, 20, 20, 20, 20, 10],
              pointStyle: false,
              borderColor: "#868B8F",
              borderDash: [5, 5],

              type: "line",
            },
            // {
            //   label: 'Zero Line',
            //   data: Array().fill(0),
            //   borderColor: 'black', // Color of the horizontal line
            //   borderWidth: 2, // Width of the horizontal line
            //   type: 'line', // Set as a line dataset
            //   pointStyle: false, // Hide points for the line dataset
            // },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: {
              display: false,
              position: "top",
            },
            datalabels: {
              // Configure the datalabels plugin

              display: (context) => context.datasetIndex === 1,

              borderColor: [
                colors.mediumGreen,
                colors.mediumRed,
                colors.lightYellow,
              ],
              borderRadius: "6",
              borderWidth: 2,

              font: {
                weight: "bold",
                size: 14,
              },
              color: "black",

              anchor: (context) => {
                return context.dataset.data[context.dataIndex] < 0
                  ? "start"
                  : "end";
              },
              align: (context) => {
                return context.dataset.data[context.dataIndex] < 0
                  ? "bottom"
                  : "top";
              },
              formatter: (value) => value, // Display the data value as the label
              offset: 10,
            },
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                color: (context) =>
                  context.tick.value === 0 ? "#CCCCCC" : "transparent",
                drawTicks: false,
                borderWidth: 1,
                drawBorder: false,
                borderColor: "transparent",
              },
              ticks: {
                display: false,
              },
              suggestedMin: -100,
              suggestedMax: 100,
            },
          },
        },
        plugins: [ChartDataLabels], // Include the datalabels plugin
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer} />;
}

export default PointBarChart;
