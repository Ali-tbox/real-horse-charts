import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import colors from '../../../config/colors'
function ScatterPieChart({ selectedStrideItem, selectedItem, rightData, leftData, straightData, data, max, min }) {
  // const max = 75
  // const min = -75
  const allLeft = selectedItem === 'All data' || selectedItem === 'Left circle' ? leftData?.map(item => item.points) : []
  const allRight = selectedItem === 'All data' || selectedItem === 'Right circle' ? rightData?.map(item => item.points) : []
  const allStraight = selectedItem === 'All data' || selectedItem === 'Straight line' ? straightData?.map(item => item.points) : []
  function findMiddleValue(arr) {
    const middleIndex = Math.floor(arr.length / 2)
    // Return the middle value
    return arr[middleIndex]
  }
  const medianLeftObject = leftData?.find(obj => obj.isMedian === true)
  const medianRightObject = rightData?.find(obj => obj.isMedian === true)
  const medianStraightObject = straightData?.find(obj => obj.isMedian === true)
  const limitedAllLeft =
    allLeft?.length === 0
      ? []
      : selectedStrideItem === 'Max 10'
        ? allLeft.slice(0, 9)
        : selectedStrideItem === 'Max 5'
          ? allLeft.slice(0, 4)
          : selectedStrideItem === 'Only median'
            ? [medianLeftObject?.points]
            : allLeft
  const limitedAllRight =
    allRight?.length === 0
      ? []
      : selectedStrideItem === 'Max 10'
        ? allRight.slice(0, 9)
        : selectedStrideItem === 'Max 5'
          ? allRight.slice(0, 4)
          : selectedStrideItem === 'Only median'
            ? [medianRightObject?.points]
            : allRight
  const limitedAllStriaght =
    allStraight?.length === 0
      ? []
      : selectedStrideItem === 'Max 10'
        ? allStraight.slice(0, 9)
        : selectedStrideItem === 'Max 5'
          ? allStraight.slice(0, 4)
          : selectedStrideItem === 'Only median'
            ? [medianStraightObject?.points]
            : allStraight
  const chartContainer = useRef(null)
  let myChart = null
  // const datasets = data?.map((data, index) => ({
  //   label: `Dataset ${index + 1}`,
  //     data:
  //     animation: false,
  //     borderColor: [colors.white, colors.white, colors.white],
  //     backgroundColor: [colors.faintblue],
  //     borderWidth: [4, 4, 4],
  // }))
  function generateRadiusArray(data) {
    return data?.map(obj => {
      return obj?.isMedian === true ? 15 : 10
    })
  }

  console.log('maxxxaxa123', generateRadiusArray(leftData))
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy()
      }
      const ctx = chartContainer.current.getContext('2d')
      // Custom plugin to apply border dash effect
      const chartAreaBorder = {
        id: 'chartAreaBorder',
        beforeDraw(chart, args, options) {
          const {
            ctx,
            chartArea: { left, top, width, height },
          } = chart
          /// slant grids
          ctx.save()
          ctx.strokeStyle = '#EB5A4B' // Set line color
          ctx.lineWidth = 1 // Set line width
          const gap = 15 // Define the gap between lines
          // Calculate the diagonal length of the chart area
          const diagonalLength = Math.sqrt(width * width + height * height)
          // Calculate the number of lines needed within the chart area based on the gap
          const numLines = Math.ceil((left + width - (left - diagonalLength)) / gap)
          // Calculate the adjusted gap to ensure consistent spacing between lines
          const adjustedGap = (left + width - (left - diagonalLength)) / numLines
          ctx.beginPath()
          ctx.rect(left, top, width, height)
          ctx.clip()
          // Draw slanted lines within the chart area
          for (let i = 0; i <= numLines; i++) {
            const startX = left - diagonalLength + i * adjustedGap
            const endX = startX + diagonalLength
            ctx.beginPath()
            ctx.moveTo(startX, top)
            ctx.lineTo(endX, top + height)
            ctx.stroke()
          }
          ctx.restore()
          ///// dash border
          ctx.save()
          ctx.strokeStyle = options.borderColor
          ctx.lineWidth = options.borderWidth
          ctx.setLineDash(options.borderDash || [])
          ctx.lineDashOffset = options.borderDashOffset
          ctx.strokeRect(left, top, width, height)
          ctx.restore()

          /////////////
          ctx.fillStyle = 'white'
          // Add text for the data representation between the dashed lines
          ctx.save()
          ctx.fillRect(width / 1.6, 445, left * 13.5, height)
          ctx.font = 'normal 12px Noto Sans'
          ctx.fillStyle = colors.faintblack
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const rectX1 = width / 1.6
          const rectY1 = 445
          const rectWidth1 = left * 13.5
          const rectHeight1 = height
          const centerX1 = rectX1 + rectWidth1 / 2
          const centerY1 = rectY1 + rectHeight1 / 2
          ctx.fillText('Right push off deficit', centerX1, height + 11)
          ctx.restore()
          ////
          ctx.fillStyle = 'white'
          // Add text for the data representation between the dashed lines
          ctx.save()
          ctx.fillRect(width / 8, 445, left * 12, height)
          ctx.font = 'normal 12px Noto Sans'
          ctx.fillStyle = colors.faintblack
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle' // Set the text baseline to the middle

          // Calculate the center position
          const rectX = width / 8
          const rectY = 445
          const rectWidth = left * 12
          const rectHeight = height
          const centerX = rectX + rectWidth / 2
          const centerY = rectY + rectHeight / 2

          ctx.fillText('Left push off deficit', centerX, height + 11)
          ctx.restore()
          // //// vertically
          ctx.fillStyle = 'white'
          // Add text for the data representation between the dashed lines
          ctx.save()
          ctx.fillRect(width, 201, top * 1.5, height * -0.29)
          ctx.fillStyle = colors.faintblack // Set text color to black
          ctx.textAlign = 'center'
          // Save the current context and rotate it 90 degrees counterclockwise
          ctx.save()
          const textX = left + width * 0.5 // X-coordinate of the text
          const textY = top + height * 0.25 // Y-coordinate of the text
          ctx.font = 'normal 12px Noto Sans'
          // ctx.translate(textX * 1.87, textY)
          ctx.rotate(Math.PI / 2) // Rotate 90 degrees counterclockwise
          ctx.fillText('Right impact deficit', 135, -width - 6) // Write the text vertically
          ctx.restore() // Restore context after rotating
          ctx.restore()

          /// left impact
          ctx.fillStyle = 'white'
          // Add text for the data representation between the dashed lines
          ctx.save()
          ctx.fillRect(width, 392, top * 1.5, height * -0.275)
          console.log('aSasASfada', width / -50, width)
          ctx.fillStyle = colors.faintblack // Set text color to black
          ctx.textAlign = 'center'
          // Save the current context and rotate it 90 degrees counterclockwise
          ctx.save()
          ctx.font = 'normal 12px Noto Sans'
          // ctx.translate(textX * 1.87 + 2, textY * 2.56)
          ctx.rotate(Math.PI / 2) // Rotate 90 degrees counterclockwise
          ctx.fillText('Left impact deficit', 330, -width - 6) // Write the text vertically
          ctx.restore() // Restore context after rotating
          ctx.restore()
        },
      }
      myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              data: [medianLeftObject?.points],
              animation: false,
              radius: [15],
              borderColor: [colors.white],
              backgroundColor: [colors.faintblue],
              borderWidth: [2],
            },
            {
              data: [medianStraightObject?.points],
              animation: false,

              radius: [15],
              borderColor: [colors.white],
              backgroundColor: [colors.mustard],

              borderWidth: [2],
            },
            {
              data: [medianRightObject?.points],
              animation: false,

              radius: [15],
              borderColor: [colors.white],
              backgroundColor: [colors.darkpurple],

              borderWidth: [2],
            },
            {
              data: limitedAllLeft,
              animation: false,
              radius: selectedStrideItem === 'Only median' ? [15] : generateRadiusArray(leftData),
              drawActiveElementsOnTop: true,
              borderColor: [colors.white],
              backgroundColor: [colors.faintblue],
              borderWidth: [2],
            },
            {
              data: limitedAllStriaght,
              animation: false,
              radius: selectedStrideItem === 'Only median' ? [15] : generateRadiusArray(straightData),
              borderColor: [colors.white, colors.white, colors.white],
              backgroundColor: [colors.mustard],
              borderWidth: [2],
            },
            {
              data: limitedAllRight,
              animation: false,
              radius: selectedStrideItem === 'Only median' ? [15] : generateRadiusArray(rightData),
              borderColor: [colors.white, colors.white, colors.white],
              backgroundColor: [colors.darkpurple],
              borderWidth: [2],
            },
            {
              type: 'pie',
              label: 'Scatter Dataset',
              data: [75], // Data for the second layer
              backgroundColor: 'rgba(247, 204, 80, 1)',
              hoverBackgroundColor: 'rgba(247, 204, 80, 1)',
              hoverBorderColor: 'white',
              borderWidth: 4,
              radius: 450,
            },
            {
              type: 'pie',
              label: 'Scatter Dataset',
              data: [75], // Data for the second layer
              backgroundColor: 'rgba(116, 205, 150, 1)',
              hoverBackgroundColor: 'rgba(116, 205, 150, 1)',
              hoverBorderColor: 'white',
              borderWidth: 0,
              radius: 450,
            },
          ],
        },
        options: {
          // aspectRatio: 2,
          layout: {
            autoPadding: false,
            padding: 10,
          },
          hover: {
            mode: null,
          },
          plugins: {
            chartAreaBorder: {
              borderColor: colors.mediumRed,
              borderWidth: 3,
              // borderDash: [50, 7],
              borderDashOffset: 2,
            }, // Apply the custom plugin for border dash effect
            legend: {
              display: false, // Set to false to hide the legend
            },
            tooltip: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: {
              border: { color: 'transparent' },
              grid: {
                color: context => (context.tick.value === 0 ? colors['gray-100'] : 'transparent'),
                drawTicks: false,
                z: 1,
                borderWidth: 1,
                drawBorder: false,
                borderColor: 'transparent',
              },
              // display: false,
              type: 'linear',
              position: 'top',
              title: {
                display: false,
                text: 'X-axis Label',
              },
              ticks: {
                z: 10,
                backdropPadding: 4,
                padding: -2,
                showLabelBackdrop: true,
                backdropColor: 'white',
                mirror: true,
                stepSize: max === 75 ? 25 : 15,
                font: { family: 'Noto Sans', weight: 'bold' },
                color: colors.dullblack,
                callback: value => Math.abs(value), // Display absolute value for X-axis ticks
              },
              // suggestedMin: min,
              // suggestedMax: max,
              max: max,
              min: min,
            },
            y: {
              border: { color: 'transparent' },
              // display: false,
              grid: {
                color: context => (context.tick.value === 0 ? colors['gray-100'] : 'transparent'),
                drawTicks: false,
                borderWidth: 1,
                z: 1,
                drawBorder: false,
                borderColor: 'transparent',
              },
              type: 'linear',
              position: 'left',
              title: {
                display: false,
                text: 'Y-axis Label',
              },
              ticks: {
                crossAlign: 'center',
                z: 10,
                backdropPadding: 4,
                padding: -3.5,
                showLabelBackdrop: true,
                backdropColor: 'white',
                mirror: true,
                font: { family: 'Noto Sans', weight: 'bold' },
                color: colors.dullblack,
                // color: (context) =>
                //   context.tick.value === max ? "transparent" : colors.dullblack,
                stepSize: max === 75 ? 25 : 15,
                callback: value => Math.abs(value),
              },
              // suggestedMin: min,
              // suggestedMax: max,
              max: max,
              min: min,
            },
          },
        },
        plugins: [
          chartAreaBorder,
          {
            beforeDraw: (chart, args, options) => {
              const { ctx } = chart
              // Rotate the context for x-axis grid lines
              ctx.save()
              ctx.translate(0, chart.height)
              ctx.rotate(-Math.PI / 4) // Rotate by -45 degrees
              // Draw x-axis grid lines here using ctx.lineTo(), ctx.stroke(), etc.
              ctx.restore()
              // Similarly, apply transformations for y-axis grid lines if needed
            },
          },
        ],
      })
    }
    return () => {
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [selectedItem, selectedStrideItem, leftData, rightData, straightData])
  return <canvas ref={chartContainer} />
}
export default ScatterPieChart
