import colors from '../config/colors'

function capitalizeFirstLetter(str) {
  // Check if the string is empty or null
  if (!str || str.length === 0) {
    return str
  }
  // Convert the first character to uppercase and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function calculatePercentage(a, b) {
  return (a / b) * 100
}
function generateRandomArray(length, min, max) {
  const randomArray = []
  for (let i = 0; i < length; i++) {
    // Generate a random number within the specified range
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    randomArray.push(randomNumber)
  }
  return randomArray
}

function getColorByRange(type, number) {
  if (type === 'front') {
    if (number >= 0 && number <= 12) {
      return colors.mediumGreen
    } else if (number > 12 && number <= 24) {
      return colors.darkGreen
    } else if (number > 24 && number <= 36) {
      return colors.lightYellow
    } else if (number > 36 && number <= 48) {
      return colors.paleYellow
    } else if (number > 48 && number <= 60) {
      return colors.mediumRed
    } else if (number > 60) {
      return colors.mehron
    } else {
      return 'black' // Default color if the number is out of specified ranges
    }
  }
  if (type === 'hind') {
    if (number >= 0 && number <= 6) {
      return colors.mediumGreen
    } else if (number > 6 && number <= 14) {
      return colors.darkGreen
    } else if (number > 14 && number <= 22) {
      return colors.lightYellow
    } else if (number > 22 && number <= 30) {
      return colors.paleYellow
    } else if (number > 30 && number <= 38) {
      return colors.mediumRed
    } else if (number > 38) {
      return colors.mehron
    } else {
      return 'black' // Default color if the number is out of specified ranges
    }
  }
}

const customSort = (a, b) => {
  const order = ['All data', 'Left circle', 'Right circle', 'Straight line']
  const indexA = order.indexOf(a)
  const indexB = order.indexOf(b)
  return indexA - indexB
}

function getLabelByRange(number) {
  if (number >= 0 && number <= 12) {
    return { name: 'Normal symmetry', color: colors.mediumGreen }
  } else if (number > 12 && number <= 24) {
    return { name: 'Mild asymmetry', color: colors.darkGreen }
  } else if (number > 24 && number <= 36) {
    return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
  } else if (number > 36 && number <= 48) {
    return { name: 'Moderate asymmetry', color: colors.paleYellow }
  } else if (number > 48 && number <= 60) {
    return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
  } else if (number > 60) {
    return { name: 'Severe asymmetry', color: colors.mehron }
  } else {
    return {} // Default color if the number is out of specified ranges
  }
}

function getLabelByRangeHind(number) {
  if (number >= 0 && number <= 6) {
    return { name: 'Normal symmetry', color: colors.mediumGreen }
  } else if (number > 6 && number <= 14) {
    return { name: 'Mild asymmetry', color: colors.darkGreen }
  } else if (number > 14 && number <= 22) {
    return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
  } else if (number > 22 && number <= 30) {
    return { name: 'Moderate asymmetry', color: colors.paleYellow }
  } else if (number > 30 && number <= 38) {
    return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
  } else if (number > 38) {
    return { name: 'Severe asymmetry', color: colors.mehron }
  } else {
    return {} // Default color if the number is out of specified ranges
  }
}

function drawLineWithCircularPoint(ctx, scales, startPoint, endPoint, color, annotation, type) {
  ctx.save()
  // Provide the coordinates for the start and end points
  const x1 = startPoint?.index // X coordinate for the start point
  const y1 = startPoint?.obj?.y < endPoint?.obj?.y ? startPoint?.obj?.y : endPoint?.obj?.y // Y coordinate for the start point
  const x2 = endPoint?.index // X coordinate for the end point
  const y2 = startPoint?.obj?.y < endPoint?.obj?.y ? startPoint?.obj?.y : endPoint?.obj?.y
  console.log('asdasdddd123111', startPoint, endPoint)
  // Calculate the distance between the two lines
  const lineDistance = parseInt(annotation)
  /////
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.sqrt(dx * dx + dy * dy)
  const offsetX = (lineDistance * dy) / length
  const offsetY = (lineDistance * dx) / length

  console.log('lineDistance', lineDistance)
  const minX = Math.min(scales.x.getPixelForValue(x1), scales.x.getPixelForValue(x2 - offsetX))
  const maxX = Math.max(scales.x.getPixelForValue(x1), scales.x.getPixelForValue(x2 - offsetX))
  const minY = Math.min(scales.y.getPixelForValue(y1 + offsetY), scales.y.getPixelForValue(y2 + offsetY))
  const maxY = Math.max(scales.y.getPixelForValue(y1 + offsetY), scales.y.getPixelForValue(y2 + offsetY))

  // Draw a black border rectangle around the entire shape
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 4 // Adjust the line width as needed
  ctx.strokeRect(minX - 1, minY - 3.5, maxX - minX + 2, lineDistance * 1.2 + 6)

  // Draw the first line
  ctx.beginPath()
  ctx.lineWidth = 3.5
  ctx.moveTo(scales.x.getPixelForValue(x1), scales.y.getPixelForValue(y1))
  ctx.lineTo(scales.x.getPixelForValue(x2), scales.y.getPixelForValue(y2))
  ctx.strokeStyle = color
  ctx.stroke()

  // Draw the second line parallel to the first line

  ctx.beginPath()
  ctx.moveTo(scales.x.getPixelForValue(x1 - offsetX), scales.y.getPixelForValue(y1 + offsetY))
  ctx.lineTo(scales.x.getPixelForValue(x2 - offsetX), scales.y.getPixelForValue(y2 + offsetY))
  ctx.strokeStyle = color
  ctx.stroke()

  // Draw the slanted line as the background
  ctx.beginPath()
  const gap = 7
  const rectX = scales.x.getPixelForValue(x1 - offsetX)
  const labelWidth = scales.x.getPixelForValue(x2 - offsetX) - scales.x.getPixelForValue(x1 - offsetX)
  const rectY = scales.y.getPixelForValue(y1 + offsetY)
  const maxHeight = lineDistance * 1.2
  ctx.rect(rectX, rectY, labelWidth, maxHeight)
  ctx.clip()

  const diagonalLength = Math.sqrt(labelWidth ** 2 + maxHeight ** 2)
  const numLines = Math.ceil(diagonalLength / gap)
  const adjustedGap = diagonalLength / numLines + 7

  for (let i = 0; i <= numLines; i++) {
    const startX = rectX - diagonalLength + i * adjustedGap
    const endX = startX + diagonalLength
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.moveTo(startX, rectY)
    ctx.lineTo(endX, rectY + maxHeight)
    ctx.stroke()
  }

  const labelX = (scales.x.getPixelForValue(x1) + scales.x.getPixelForValue(x2 - offsetX)) / 2
  const labelY = (scales.y.getPixelForValue(y1) + scales.y.getPixelForValue(y2 + offsetY)) / 2

  const rectWidth = 48 // Fixed width
  const rectHeight = 15 // Fixed height
  const rectX2 = labelX - rectWidth / 2 // Calculate the X coordinate to center the rectangle
  const rectY2 = labelY - rectHeight / 2 // Calculate the Y coordinate to center the rectangle

  // Draw the rectangle
  ctx.fillStyle = 'white'
  ctx.fillRect(rectX2, rectY2, rectWidth, rectHeight)

  // ctx.fillStyle = 'white'
  // ctx.fillRect(labelX - labelWidth / 3.9, labelY - maxHeight / 15.8, labelWidth / 2, maxHeight / 9.5)

  // Draw the data label
  ctx.font = 'bold 12px Noto Sans' // Adjust the font size as needed
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(annotation, labelX, labelY)
  ctx.restore()

  const startPointRadius = 5 // Radius for the circular point
  ctx.beginPath()
  if (startPoint?.obj?.y > endPoint?.obj?.y) {
    ctx.arc(scales.x.getPixelForValue(x1 - offsetX), scales.y.getPixelForValue(y1 + offsetY), startPointRadius, 0, Math.PI * 2)
  }
  if (startPoint?.obj?.y < endPoint?.obj?.y) {
    ctx.arc(scales.x.getPixelForValue(x1), scales.y.getPixelForValue(y1), startPointRadius, 0, Math.PI * 2)
  }

  ctx.fillStyle = color // Set fill color
  ctx.fill() // Fill the circle
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)' // Shadow color
  // ctx.shadowBlur = 5 // Blur radius
  // ctx.shadowOffsetX = 2 // X offset
  // ctx.shadowOffsetY = 2 // Y offset
  ctx.lineWidth = 2
  // Set border color and draw the border
  ctx.strokeStyle = 'white' // Set border color
  ctx.stroke() // Draw the border

  // Reset shadow properties
  // ctx.shadowColor = 'transparent' // Reset shadow color
  // ctx.shadowBlur = 0 // Reset blur radius
  // ctx.shadowOffsetX = 0 // Reset X offset
  // ctx.shadowOffsetY = 0 // Reset Y offset
  // // ctx.restore()
  // Draw circular point at the end of the second line
  const endPointRadius = 5 // Radius for the circular point
  ctx.beginPath()
  if (startPoint?.obj?.y > endPoint?.obj?.y) {
    ctx.arc(scales.x.getPixelForValue(x2), scales.y.getPixelForValue(y2), endPointRadius, 0, Math.PI * 2)
  }
  if (startPoint?.obj?.y < endPoint?.obj?.y) {
    ctx.arc(scales.x.getPixelForValue(x2 - offsetX), scales.y.getPixelForValue(y2 + offsetY), startPointRadius, 0, Math.PI * 2)
  }
  ctx.fillStyle = color // Set fill color
  ctx.fill() // Fill the circle
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)' // Shadow color
  // ctx.shadowBlur = 5 // Blur radius
  // ctx.shadowOffsetX = 2 // X offset
  // ctx.shadowOffsetY = 2 // Y offset
  ctx.lineWidth = 2
  // Set border color and draw the border
  ctx.strokeStyle = 'white' // Set border color
  ctx.stroke() // Draw the border

  // Reset shadow properties
  // ctx.shadowColor = 'transparent' // Reset shadow color
  // ctx.shadowBlur = 0 // Reset blur radius
  // ctx.shadowOffsetX = 0 // Reset X offset
  // ctx.shadowOffsetY = 0 // Reset Y offset
}
const relativeExtrema = (side, healtyhLeg, clampedLeft, clampedRight) => {
  if (healtyhLeg === side) {
    return 1.0
  }
  if (side == 'left') {
    return Math.abs(clampedLeft) / Math.abs(clampedRight)
  } else {
    return Math.abs(clampedRight) / Math.abs(clampedLeft)
  }
}
const presentedExtrema = (side, healtyhLeg, minBarHeight, clampedLeft, clampedRight) => {
  return side == healtyhLeg ? 1.0 : Math.min(1.0 - minBarHeight, Math.max(minBarHeight, relativeExtrema(side, healtyhLeg, clampedLeft, clampedRight)))
}

export {
  presentedExtrema,
  relativeExtrema,
  drawLineWithCircularPoint,
  capitalizeFirstLetter,
  calculatePercentage,
  generateRandomArray,
  getColorByRange,
  customSort,
  getLabelByRange,
  getLabelByRangeHind,
}
