import { Box, Divider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import colors from '../../../config/colors'
import SymmetryMenu from '../SymmetryMenu'
import assets from '../../../assets/assests'
import Icon from '../../form/Icon'
import SymmentryLabel from '../SymmentryLabel'
import SymmentryRoundLabel from '../SymmentryRoundLabel'
import ScatterPieChart from './ScatterPieChart'
import { customSort } from '../../../utils/helperFunc'

const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
  allfootage: 'All data',
}
const labelActualValue = {
  'Left circle': 'left',
  'Right circle': 'right',
  'Straight line': 'straight',
}
const badgeColor = {
  left: colors.faintblue,
  right: colors.darkpurple,
  straight: colors.mustard,
}

function moveMedianAtEnd(array) {
  return array?.sort((a, b) => (a?.isMedian === b?.isMedian ? 0 : a?.isMedian ? 1 : -1))
}

function DeficitScatter({ chartData, straightData, leftData, rightData, max, min, type }) {
  const items = ['All data', 'Left circle', 'Right circle', 'Straight line']
  const strideItems = ['All strides', 'Only median', 'Max 5', 'Max 10']
  const isOnlyStraight = chartData?.confidence?.some(item => item.trottype === 'straight')
  const menuItems = chartData?.confidence?.map(item => badgeValue[item.trottype])

  const sortedMenuItems = menuItems?.sort(customSort)
  const [selectedItem, setSelectedItem] = useState(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])
  const [selectedStrideItem, setSelectedStrideItem] = useState(strideItems[0])
  const [confidenceArray, setConfidenceArray] = useState(chartData?.confidence)

  const handleClick = item => {
    setSelectedItem(item)
    setConfidenceArray(item === 'All data' ? chartData?.confidence : chartData?.confidence?.filter(c => c.trottype === labelActualValue[item]))
  }
  const handleStrideClick = item => {
    setSelectedStrideItem(item)
  }
  console.log('settingselectedStride', menuItems)
  useEffect(() => {
    setSelectedItem(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])
  }, [chartData])
  return (
    <Box w='100%' mt={type === 'front' ? '10px' : '40px'}>
      <Box paddingX={'16px'} display={'flex'} gap='6px'>
        <Icon image={type === 'front' ? assets.icons.trottingHorse : assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} color={colors.textcolor}>
          {type === 'front' ? 'Front' : 'Hind'}
        </Text>
      </Box>
      <Box paddingX={'16px'} mt='17px' gap='20px' display={'flex'}>
        <SymmetryMenu isSingleValue={chartData?.confidence?.length <= 2 && isOnlyStraight} items={sortedMenuItems} onClick={handleClick} selectedItem={selectedItem} label='All footage' />
        <SymmetryMenu items={strideItems} onClick={handleStrideClick} selectedItem={selectedStrideItem} label='All strides' />
      </Box>
      <Box paddingX={'8px'} mt='16px' minW='100%' h='467px'>
        <ScatterPieChart
          max={max}
          min={min}
          selectedItem={selectedItem}
          selectedStrideItem={selectedStrideItem}
          straightData={moveMedianAtEnd(straightData)}
          leftData={moveMedianAtEnd(leftData)}
          rightData={moveMedianAtEnd(rightData)}
        />
      </Box>

      <Box paddingX={'16px'} mt='16px' gap='20px' display={'flex'}>
        {confidenceArray?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
      </Box>
      <Box w='100%' paddingX={'16px'}>
        <Divider mt='8px' />
      </Box>

      <Box paddingX={'16px'} display={'flex'} flexDir={'column'} gap={'10px'} mt='8px'>
        <SymmentryLabel text1='Normal symmetry' color1={colors.mediumGreen} text2={'Mild to moderate asymmetry'} color2={colors.lightYellow} />
        <SymmentryLabel text1='Severe asymmetry' color1={colors.mehron} />
      </Box>
    </Box>
  )
}

export default DeficitScatter
