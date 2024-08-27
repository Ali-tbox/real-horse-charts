import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels' // Import the plugin
import colors from '../../../config/colors'
import { getColorByRange } from '../../../utils/helperFunc'

function PointBarChart({ type, data }) {
  const right = data?.right || 0
  const left = data?.left || 0
  const straight = data?.straight || 0
  const mean = Math.abs(data?.mean)
  const isLeft = data?.left !== undefined ? [data.left] : []
  const isStraight = data?.straight !== undefined ? [...isLeft, data.straight] : [...isLeft]
  const isRight = data?.right !== undefined ? [...isStraight, data.right] : [...isStraight]
  const isLeftColor = data?.left !== undefined ? [colors.faintblue] : []
  const isStraightColor = data?.straight !== undefined ? [...isLeftColor, colors.mustard] : [...isLeftColor]
  const isRightColor = data?.right !== undefined ? [...isStraightColor, colors.darkpurple] : [...isStraightColor]
  const labelColor = isRightColor

  const isLeftPointColor = data?.left !== undefined ? [colors.lightfaintblue] : []
  const isStraightPointColor = data?.straight !== undefined ? [...isLeftPointColor, colors.lightMustard] : [...isLeftPointColor]
  const isRightPointColor = data?.right !== undefined ? [...isStraightPointColor, colors.lightPurple] : [...isStraightPointColor]
  const labelPointColor = isRightPointColor
  const labelData = isRight
  const positiveLabel = isRight?.map(item => Math.abs(item))
  console.log('adasdasdasda', data)

  const chartContainer = useRef(null)
  let myChart = null

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy()
      }

      const ctx = chartContainer.current.getContext('2d')

      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Line Dataset',
              data: [mean, ...labelData],
              borderColor: ['transparent', ...labelColor],
              pointBackgroundColor: ['transparent', ...labelColor],
              pointRadius: 5,
              pointHoverRadius: 5,
              pointBorderWidth: 2,

              borderWidth: 0,

              type: 'line',
            },
            {
              label: 'Bar Dataset',
              data: [mean, ...labelData],
              backgroundColor: ['transparent', ...labelPointColor],
              borderRadius: 16,
              maxBarThickness: '12',
              borderSkipped: false,
            },
            {
              label: 'Line Dataset',
              data: [mean, mean, mean, mean, mean, mean],
              pointStyle: false,
              borderColor: '#868B8F',
              borderDash: [5, 5],

              type: 'line',
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
          hover: {
            mode: null, //
          },
          responsive: true,
          maintainAspectRatio: false,

          animation: false,
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
            datalabels: {
              // Configure the datalabels plugin
              backgroundColor: 'white',
              display: context => context.datasetIndex === 1,

              borderColor: context => {
                // console.log('asdadad', getColorByRange(context.dataset.data[context.dataIndex]))
                return getColorByRange(type, Math.abs(context.dataset.data[context.dataIndex]))
              },

              borderRadius: '6',
              borderWidth: 1.5,

              font: {
                weight: 700,
                family: 'Noto Sans',
                size: 12,
              },
              color: 'black',

              anchor: context => {
                return context.dataIndex === 0 && context.dataset.data[context.dataIndex] > 0
                  ? 'end'
                  : context.dataIndex === 0 && context.dataset.data[context.dataIndex] < 0
                    ? 'start'
                    : context.dataset.data[context.dataIndex] < 0
                      ? 'start'
                      : 'end'
              },
              align: context => {
                return context.dataIndex === 0 ? 'center' : context.dataset.data[context.dataIndex] < 0 ? 'bottom' : 'top'
              },
              formatter: value => {
                if (typeof value === 'undefined') {
                  return
                }
                return Math.abs(Math.abs(value).toString())
              }, // Display the data value as the label
              offset: 10,
              padding: context => {
                return Math.abs(context.dataset.data[context.dataIndex]) < 10
                  ? {
                      top: 3,
                      bottom: 2.5,
                      left: 6.5,
                      right: 6.5,
                    }
                  : { top: 3, bottom: 2.5, left: 4, right: 4 }
              },
            },
            tooltip: false,
          },
          layout: {
            padding: {
              left: 0,
              right: -10,
              top: 0,
              bottom: 0,
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
              border: {
                display: false,
              },
              grid: {
                color: context => (context.tick.value === 0 ? '#CCCCCC' : 'transparent'),
                drawTicks: false,
                borderWidth: 1,
                drawBorder: false,
                borderColor: 'transparent',
              },
              ticks: {
                display: false,
              },
              min: Math.abs(Math.abs(Math.max(...positiveLabel))) === 0 ? -100 : -(Math.abs(Math.max(...positiveLabel)) * 0.4 + Math.abs(Math.max(...positiveLabel))),
              max: Math.abs(Math.abs(Math.max(...positiveLabel))) === 0 ? 100 : Math.abs(Math.max(...positiveLabel)) * 0.4 + Math.abs(Math.max(...positiveLabel)),
            },
          },
        },
        plugins: [ChartDataLabels], // Include the datalabels plugin
      })
    }

    return () => {
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [data])

  return <canvas style={{ width: '100%', height: '100%' }} ref={chartContainer} />
}

export default PointBarChart
