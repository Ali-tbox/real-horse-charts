import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import ChartDataLabels from "chartjs-plugin-datalabels";
import colors from "../../config/colors";

function BarChart({ color1, color2 }) {
  const chartContainer = useRef(null);
  let myChart = null; // Variable to hold the chart instance

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        // Destroy the existing chart if it exists
        myChart.destroy();
      }

      const ctx = chartContainer.current.getContext("2d");
      // const CustomBox = {
      //   id: 'CustomBox',
      //   beforeDraw(chart, args, options) {
      //     const {
      //       ctx,
      //       chartArea: { left, top, width, height },
      //     } = chart

      //     ctx.fillStyle = 'red'
      //     // Add text for the data representation between the dashed lines
      //     ctx.save()
      //     ctx.fillRect(width * 0.64, width, left * 6.1, height)

      //     ctx.fillStyle = colors.redbtn
      //     ctx.textAlign = 'center'
      //     ctx.fillText('Right push off deficit', width, height * 0.3)
      //     ctx.restore()
      //   },
      // }

      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Left", "Right"],
          datasets: [
            {
              label: "none",
              data: [100, 60],
              backgroundColor: [color1, color2],
              borderRadius: 8,
              maxBarThickness: "46",
              borderSkipped: false,
              animation: false,
              // Set border radius for all bars
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
            datalabels: {
              // Configure the datalabels plugin

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
              padding: 12,
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
              formatter: (value) => 100 - value, // Display the data value as the label
              offset: 10,
            },
          },
          scales: {
            x: {
              display: true,

              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              display: false,

              grid: {
                display: false, // Hide y-axis grid lines
              },
              suggestedMin: 0, // Set the minimum value for y-axis
              suggestedMax: 100,
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }

    // Ensure proper cleanup when the component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []); // Only run this effect on initial mount and unmount

  return <canvas ref={chartContainer} />;
}

export default BarChart;
