import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import colors from "../../../config/colors";

function ScatterPieChart() {
  const chartContainer = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy();
      }

      const ctx = chartContainer.current.getContext("2d");

      // Custom plugin to apply border dash effect
      const chartAreaBorder = {
        id: "chartAreaBorder",
        beforeDraw(chart, args, options) {
          const {
            ctx,
            chartArea: { left, top, width, height },
          } = chart;

          /// slant grids
          ctx.save();
          ctx.strokeStyle = "#EB5A4B"; // Set line color
          ctx.lineWidth = 1; // Set line width

          const gap = 15; // Define the gap between lines

          // Calculate the diagonal length of the chart area
          const diagonalLength = Math.sqrt(width * width + height * height);

          // Calculate the number of lines needed within the chart area based on the gap
          const numLines = Math.ceil(
            (left + width - (left - diagonalLength)) / gap
          );

          // Calculate the adjusted gap to ensure consistent spacing between lines
          const adjustedGap =
            (left + width - (left - diagonalLength)) / numLines;
          ctx.beginPath();
          ctx.rect(left, top, width, height);
          ctx.clip();
          // Draw slanted lines within the chart area
          for (let i = 0; i <= numLines; i++) {
            const startX = left - diagonalLength + i * adjustedGap;
            const endX = startX + diagonalLength;

            ctx.beginPath();

            ctx.moveTo(startX, top);
            ctx.lineTo(endX, top + height);
            ctx.stroke();
          }

          ctx.restore();
          ///// dash border
          ctx.save();
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.setLineDash(options.borderDash || []);
          ctx.lineDashOffset = options.borderDashOffset;
          ctx.strokeRect(left, top, width, height);
          ctx.restore();
          ctx.fillStyle = "white";
          // Add text for the data representation between the dashed lines
          ctx.save();
          ctx.fillRect(width * 0.68, width, left * 6.1, height);

          ctx.fillStyle = colors.faintblack;
          ctx.textAlign = "center";
          ctx.fillText("Right push off deficit", width / 1.2, height + 20);
          ctx.restore();

          ////
          ctx.fillStyle = "white";
          // Add text for the data representation between the dashed lines
          ctx.save();
          ctx.fillRect(width * 0.09, width + 2, left * 6.1, height);

          ctx.fillStyle = colors.faintblack;
          ctx.textAlign = "center";
          ctx.fillText("Left push off deficit", left * 4.7, height + 20);
          ctx.restore();

          // //// vertically
          ctx.fillStyle = "white";
          // Add text for the data representation between the dashed lines
          ctx.save();
          ctx.fillRect(width + 9, width * 0.5, top, height * -0.4);
          ctx.fillStyle = colors.faintblack; // Set text color to black
          ctx.textAlign = "center";

          // Save the current context and rotate it 90 degrees counterclockwise
          ctx.save();
          const textX = left + width * 0.5; // X-coordinate of the text
          const textY = top + height * 0.25; // Y-coordinate of the text
          ctx.translate(textX * 1.87, textY);
          ctx.rotate(Math.PI / 2); // Rotate 90 degrees counterclockwise

          ctx.fillText("Right impact deficit", 0, 0); // Write the text vertically

          ctx.restore(); // Restore context after rotating

          ctx.restore();

          /// left impact
          ctx.fillStyle = "white";
          // Add text for the data representation between the dashed lines
          ctx.save();
          ctx.fillRect(width + 9, width - 17, top, height * -0.34);
          ctx.fillStyle = colors.faintblack; // Set text color to black
          ctx.textAlign = "center";

          // Save the current context and rotate it 90 degrees counterclockwise
          ctx.save();
          ctx.translate(textX * 1.87, textY * 2.56);
          ctx.rotate(Math.PI / 2); // Rotate 90 degrees counterclockwise

          ctx.fillText("Left impact deficit", 0, 0); // Write the text vertically

          ctx.restore(); // Restore context after rotating

          ctx.restore();
        },
      };

      myChart = new Chart(ctx, {
        type: "bubble",
        data: {
          datasets: [
            {
              data: [
                {
                  x: 25,
                  y: 20,
                },
                {
                  x: 20,
                  y: 40,
                },
                {
                  x: 30,
                  y: 35,
                },
                // Add more data points as needed
              ],
              borderColor: [
                colors.darkpurple,
                colors.faintblue,
                colors.mustard,
                "yellow",
              ],
              backgroundColor: [
                colors.darkpurple,
                colors.faintblue,
                colors.mustard,
                "yellow",
              ],
              borderWidth: [15, 5, 10],
            },
            {
              type: "pie",

              label: "Scatter Dataset",

              data: [75], // Data for the second layer
              backgroundColor: "rgba(247, 204, 80, 1)",
              borderWidth: 4,
            },

            {
              type: "pie",
              label: "Scatter Dataset",

              data: [75], // Data for the second layer
              backgroundColor: "rgba(116, 205, 150, 1)",
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: {
            chartAreaBorder: {
              borderColor: colors.mediumRed,
              borderWidth: 2,
              borderRadius: "8px",

              borderDash: [10, 5],
              borderDashOffset: 2,
            }, // Apply the custom plugin for border dash effect
            legend: {
              display: false, // Set to false to hide the legend
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: (context) =>
                  context.tick.value === 0 ? "#CCCCCC" : "transparent",
                drawTicks: false,

                z: 1,

                borderWidth: 1,
                drawBorder: false,
                borderColor: "transparent",
              },
              // display: false,
              type: "linear",
              position: "top",
              title: {
                display: false,
                text: "X-axis Label",
              },
              ticks: {
                stepSize: 25,

                callback: (value) => Math.abs(value), // Display absolute value for X-axis ticks
              },
              suggestedMin: -75,

              suggestedMax: 75,
            },
            y: {
              // display: false,
              grid: {
                color: (context) =>
                  context.tick.value === 0 ? "#CCCCCC" : "transparent",
                drawTicks: false,
                borderWidth: 1,
                z: 1,
                drawBorder: false,

                borderColor: "transparent",
              },
              type: "linear",
              position: "left",
              title: {
                display: false,
                text: "Y-axis Label",
              },
              ticks: {
                stepSize: 25,
                callback: (value) => Math.abs(value),
              },
              suggestedMin: -75,
              suggestedMax: 75,
            },
          },
        },
        plugins: [
          chartAreaBorder,
          {
            beforeDraw: (chart, args, options) => {
              const { ctx } = chart;
              // Rotate the context for x-axis grid lines
              ctx.save();
              ctx.translate(0, chart.height);
              ctx.rotate(-Math.PI / 4); // Rotate by -45 degrees
              // Draw x-axis grid lines here using ctx.lineTo(), ctx.stroke(), etc.
              ctx.restore();

              // Similarly, apply transformations for y-axis grid lines if needed
            },
          },
        ],
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

export default ScatterPieChart;
