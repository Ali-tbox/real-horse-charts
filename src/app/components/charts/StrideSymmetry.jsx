import React, { useEffect, useState } from 'react'

import { Box, Text } from '@chakra-ui/react'

import SymmentryLabel from './SymmentryLabel'
// import chartData from './chartData'

import Icon from '../form/Icon'
import StrideSymmetryGraph from './StrideSymmetryGraph'
import SymmetryMenu from './SymmetryMenu'
import assets from '../../assets/assests'
import colors from '../../config/colors'
import { customSort, getLabelByRange, getLabelByRangeHind, presentedExtrema } from '../../utils/helperFunc'

const calculatePercentage = (a, b) => {
  return (a / b) * 100
}
const largest = (a, b) => {
  return a > b ? a - b : b - a
}
const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
  allfootage: 'All data',
}

function StrideSymmetry({ chartData, handleItemClick }) {
  const items = ['Left circle', 'Right circle', 'Straight line']
  const isOnlyStraight = chartData?.confidence?.some(item => item.trottype === 'straight')
  const menuItems = chartData?.confidence?.map(item => badgeValue[item.trottype])

  const sortedMenuItems = menuItems?.sort(customSort)
  const [selectedItem, setSelectedItem] = useState(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])

  const filteredChartData = chartData?.stridesymmetry ? JSON?.parse(chartData?.stridesymmetry) : []

  /// Front right circle impact
  const leftLegRightCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const rightLegRightCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Front left circle impact
  const leftLegLeftCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Front left circle push off
  const leftLegLeftCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Front Straight circle impact
  const leftLegStraightCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Front Straight circle push off
  const leftLegStraightCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Front right circle push off
  const rightLegRightCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const leftLegRightCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind right circle impact
  const leftLegRightCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const rightLegRightCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind left circle impact
  const leftLegLeftCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Hind left circle push off
  const leftLegLeftCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Hind right circle push off
  const rightLegRightCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const leftLegRightCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind Straight circle impact
  const leftLegStraightCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Hind left circle push off
  const leftLegStraightCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)

  /// front
  const [rightImpactData, setRightImpactData] = useState(rightLegLeftCircleForeImpactData?.level < leftLegLeftCircleForeImpactData?.level ? 0 : rightLegLeftCircleForeImpactData?.level)
  const [leftImpactData, setLeftImpactData] = useState(leftLegLeftCircleForeImpactData?.level < rightLegLeftCircleForeImpactData?.level ? 0 : leftLegLeftCircleForeImpactData?.level)
  const [rightPushoffData, setRightPushoffData] = useState(rightLegLeftCircleForePushoffData?.level < leftLegLeftCircleForePushoffData?.level ? 0 : rightLegLeftCircleForePushoffData?.level)
  const [leftPushoffData, setLeftPushoffData] = useState(leftLegLeftCircleForePushoffData?.level < rightLegLeftCircleForePushoffData?.level ? 0 : leftLegLeftCircleForePushoffData?.level)
  /// hind
  const [rightHindImpactData, setRightHindImpactData] = useState(rightLegLeftCircleHindImpactData?.level < leftLegLeftCircleHindImpactData?.level ? 0 : rightLegLeftCircleHindImpactData?.level)
  const [leftHindImpactData, setLeftHindImpactData] = useState(leftLegLeftCircleHindImpactData?.level < rightLegLeftCircleHindImpactData?.level ? 0 : leftLegLeftCircleHindImpactData?.level)
  const [rightHindPushoffData, setRightHindPushoffData] = useState(rightLegLeftCircleHindPushoffData?.level < leftLegLeftCircleHindPushoffData?.level ? 0 : rightLegLeftCircleHindPushoffData?.level)
  const [leftHindPushoffData, setLeftHindPushoffData] = useState(leftLegLeftCircleHindPushoffData?.level < rightLegLeftCircleHindPushoffData?.level ? 0 : leftLegLeftCircleHindPushoffData?.level)

  const [foreImpactData, setForeImpactData] = useState()
  const [forePushoffData, setForePushoffData] = useState()
  const [hindImpactData, setHindImpactData] = useState()
  const [hindPushoffData, setHindPushoffData] = useState()

  const FrontLabels = [getLabelByRange(0), getLabelByRange(foreImpactData?.absoluteDeficit), getLabelByRange(forePushoffData?.absoluteDeficit)]
  const HindLabels = [getLabelByRangeHind(0), getLabelByRangeHind(hindImpactData?.absoluteDeficit), getLabelByRangeHind(hindPushoffData?.absoluteDeficit)]
  const uniqueFrontArray = FrontLabels.filter((obj, index, self) => index === self.findIndex(o => o.name === obj.name))
  const uniqueHindArray = HindLabels.filter((obj, index, self) => index === self.findIndex(o => o.name === obj.name))

  console.log('dasdasd', uniqueHindArray)

  const handleClick = item => {
    setSelectedItem(item)
    handleItemClick(item)
    if (item === 'Left circle') {
      const chartData = getObjectByTrotType(filteredChartData, 'left')
      setForeImpactData(chartData?.foreImpact)
      setForePushoffData(chartData?.forePushoff)
      setHindImpactData(chartData?.hindImpact)
      setHindPushoffData(chartData?.hindPushoff)
    }
    if (item === 'Right circle') {
      const chartData = getObjectByTrotType(filteredChartData, 'right')
      setForeImpactData(chartData?.foreImpact)
      setForePushoffData(chartData?.forePushoff)
      setHindImpactData(chartData?.hindImpact)
      setHindPushoffData(chartData?.hindPushoff)
    }
    if (item === 'Straight line') {
      const chartData = getObjectByTrotType(filteredChartData, 'straight')
      setForeImpactData(chartData?.foreImpact)
      setForePushoffData(chartData?.forePushoff)
      setHindImpactData(chartData?.hindImpact)
      setHindPushoffData(chartData?.hindPushoff)
    }
    if (item === 'All data') {
      const chartData = getObjectByTrotType(filteredChartData, 'all')
      setForeImpactData(chartData?.foreImpact)
      setForePushoffData(chartData?.forePushoff)
      setHindImpactData(chartData?.hindImpact)
      setHindPushoffData(chartData?.hindPushoff)
    }
  }
  useEffect(() => {
    setSelectedItem(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])
    const chartDataFiltered = getObjectByTrotType(filteredChartData, 'all')
    setForeImpactData(chartDataFiltered?.foreImpact)
    setForePushoffData(chartDataFiltered?.forePushoff)
    setHindImpactData(chartDataFiltered?.hindImpact)
    setHindPushoffData(chartDataFiltered?.hindPushoff)
  }, [chartData])

  const minBarHeight = 0.1
  const getObjectByTrotType = (data, trotType) => {
    return data.find(item => item.trotType === trotType)
  }

  console.log('asdasdasdadadadads', FrontLabels)

  return (
    <Box paddingX={'16px'} paddingY='32px'>
      <Box display={'flex'} flexDirection={'row'} mb={'16px'} justifyContent={'space-between'} alignItems={'center'}>
        <Box alignItems={'center'} display={'flex'} gap={'6px'}>
          <Text fontSize='16px' color={colors.dullblack} lineHeight={'22px'} fontWeight={700} fontFamily='Nunito'>
            Stride Symmetry
          </Text>
          <Icon onClick={() => handleItemClick('stride-symmetry')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
        </Box>
        <SymmetryMenu
          isSingleValue={chartData?.confidence?.length <= 2 && isOnlyStraight}
          items={sortedMenuItems}
          selectedItem={selectedItem}
          onClick={handleClick}
          pr={'8px'}
          label={'Straight line'}
        />
      </Box>
      <Box display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse} />
        <Text fontFamily={'Nunito'} fontWeight={700} lineHeight={'20px'} fontSize={'16px'} color={colors.textcolor}>
          Front
        </Text>
      </Box>
      <Box gap={'23px'} display='flex'>
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='front'
          data={chartData}
          checkValue={12}
          selectedItem={selectedItem}
          deficitLabel={foreImpactData?.absoluteDeficit}
          leftData={
            presentedExtrema('left', foreImpactData?.healtyhLeg, minBarHeight, foreImpactData?.clampedLeft, foreImpactData?.clampedRight) * 100 >= 88
              ? 100
              : presentedExtrema('left', foreImpactData?.healtyhLeg, minBarHeight, foreImpactData?.clampedLeft, foreImpactData?.clampedRight) * 100
          }
          rightData={
            presentedExtrema('right', foreImpactData?.healtyhLeg, minBarHeight, foreImpactData?.clampedLeft, foreImpactData?.clampedRight) * 100 >= 88
              ? 100
              : presentedExtrema('right', foreImpactData?.healtyhLeg, minBarHeight, foreImpactData?.clampedLeft, foreImpactData?.clampedRight) * 100
          }
          text='Impact'
          color1={colors.mediumGreen}
          color2={colors.mediumRed}
        />
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='front'
          data={chartData}
          checkValue={12}
          selectedItem={selectedItem}
          deficitLabel={forePushoffData?.absoluteDeficit}
          leftData={
            presentedExtrema('left', forePushoffData?.healtyhLeg, minBarHeight, forePushoffData?.clampedLeft, forePushoffData?.clampedRight) * 100 >= 88
              ? 100
              : presentedExtrema('left', forePushoffData?.healtyhLeg, minBarHeight, forePushoffData?.clampedLeft, forePushoffData?.clampedRight) * 100
          }
          rightData={
            presentedExtrema('right', forePushoffData?.healtyhLeg, minBarHeight, forePushoffData?.clampedLeft, forePushoffData?.clampedRight) * 100 >= 88
              ? 100
              : presentedExtrema('right', forePushoffData?.healtyhLeg, minBarHeight, forePushoffData?.clampedLeft, forePushoffData?.clampedRight) * 100
          }
          text='Push off'
          color1={colors.paleYellow}
          color2={colors.darkGreen}
        />
      </Box>
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='12px'>
        {uniqueFrontArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueFrontArray[index + 1]?.name || ''} color2={uniqueFrontArray[index + 1]?.color || ''} />,
        )}
      </Box>
      <Box mt='40px' mb={'1px'} display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} lineHeight={'20px'} color={colors.textcolor}>
          Hind
        </Text>
      </Box>
      <Box gap={'23px'} display='flex'>
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='hind'
          data={chartData}
          checkValue={6}
          selectedItem={selectedItem}
          deficitLabel={hindImpactData?.absoluteDeficit}
          leftData={
            presentedExtrema('left', hindImpactData?.healtyhLeg, minBarHeight, hindImpactData?.clampedLeft, hindImpactData?.clampedRight) * 100 >= 94
              ? 100
              : presentedExtrema('left', hindImpactData?.healtyhLeg, minBarHeight, hindImpactData?.clampedLeft, hindImpactData?.clampedRight) * 100
          }
          rightData={
            presentedExtrema('right', hindImpactData?.healtyhLeg, minBarHeight, hindImpactData?.clampedLeft, hindImpactData?.clampedRight) * 100 >= 94
              ? 100
              : presentedExtrema('right', hindImpactData?.healtyhLeg, minBarHeight, hindImpactData?.clampedLeft, hindImpactData?.clampedRight) * 100
          }
          text='Impact'
          color1={colors.mehron}
          color2={colors.mediumGreen}
        />
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='hind'
          data={chartData}
          checkValue={6}
          selectedItem={selectedItem}
          deficitLabel={hindPushoffData?.absoluteDeficit}
          leftData={
            presentedExtrema('left', hindPushoffData?.healtyhLeg, minBarHeight, hindPushoffData?.clampedLeft, hindPushoffData?.clampedRight) * 100 >= 94
              ? 100
              : presentedExtrema('left', hindPushoffData?.healtyhLeg, minBarHeight, hindPushoffData?.clampedLeft, hindPushoffData?.clampedRight) * 100
          }
          rightData={
            presentedExtrema('right', hindPushoffData?.healtyhLeg, minBarHeight, hindPushoffData?.clampedLeft, hindPushoffData?.clampedRight) * 100 >= 94
              ? 100
              : presentedExtrema('right', hindPushoffData?.healtyhLeg, minBarHeight, hindPushoffData?.clampedLeft, hindPushoffData?.clampedRight) * 100
          }
          text='Push off'
          color1={colors.lightYellow}
          color2={colors.mediumGreen}
        />
      </Box>
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='12px'>
        {uniqueHindArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueHindArray[index + 1]?.name || ''} color2={uniqueHindArray[index + 1]?.color || ''} />,
        )}
      </Box>
    </Box>
  )
}

export default StrideSymmetry
