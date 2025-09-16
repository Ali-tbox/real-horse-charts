import { Box, Divider, Text } from '@chakra-ui/layout'
import React from 'react'
import Icon from '../../form/Icon'
// import chartData from '../chartData'

import DeficitGraph from './DeficitGraph'

import colors from '../../../config/colors'
import SymmentryRoundLabel from '../SymmentryRoundLabel'
import assets from '../../../assets/assests'
import SymmentryLabel from '../SymmentryLabel'
import { getLabelByRange, getLabelByRangeHind, getLabelByRangeWithers } from '../../../utils/helperFunc'

const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
}
const badgeColor = {
  left: colors.faintblue,
  right: colors.darkpurple,
  straight: colors.mustard,
}

function DeficitCharts({ withersToggleBtn, chartData, handleItemClick }) {
  const FrontLabels = [
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.straight)),
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.right)),
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.left)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.straight)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.right)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.left)),
  ]
  const WithersLabels = [
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersImpact?.straight)),
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersImpact?.right)),
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersImpact?.left)),
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersPushoff?.straight)),
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersPushoff?.right)),
    getLabelByRangeWithers(Math.abs(chartData?.deficit?.withersPushoff?.left)),
  ]
  const HindLabels = [
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.straight)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.right)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.left)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.straight)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.right)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.left)),
  ]
  const uniqueFrontArray = FrontLabels.filter((obj, index, self) => obj.name && index === self.findIndex(o => o.name === obj.name))
  const uniqueWithersArray = WithersLabels.filter((obj, index, self) => obj.name && index === self.findIndex(o => o.name === obj.name))
  const uniqueHindArray = HindLabels.filter((obj, index, self) => obj.name && index === self.findIndex(o => o.name === obj.name))

  console.log('123123123123132', getLabelByRange())
  return (
    <Box paddingX={'16px'} paddingY={'32px'}>
      <Box mb='10px' paddingY={'7px'} alignItems={'center'} display={'flex'} gap={'6px'}>
        <Text fontSize='16px' color={colors.dullblack} lineHeight={'22px'} fontWeight={700} fontFamily='Nunito'>
          Relative Deficit Bar Chart
        </Text>
        <Icon onClick={() => handleItemClick('deficit-bar-chart')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
      </Box>
      {/* front */}
      <Box display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} lineHeight={'20px'} color={colors.textcolor}>
          Front
        </Text>
      </Box>
      <Box maxW={'100%'} gap={'23px'} display='flex'>
        <DeficitGraph horseSide='front' data={chartData?.deficit?.foreImpact} type='Impact' />
        <DeficitGraph horseSide='front' data={chartData?.deficit?.forePushoff} type='Push Off' />
      </Box>
      <Box mt='12px' display={'flex'} gap={'20px'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
        <Box display={'flex'} gap={'4px'} alignItems={'center'}>
          <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
          <Text ml='2px' fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack} paddingTop={'2px'}>
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt='8px' />
      <Box display={'flex'} flexDir={'column'} gap={'8px'} mt='8px'>
        {uniqueFrontArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueFrontArray[index + 1]?.name || ''} color2={uniqueFrontArray[index + 1]?.color || ''} />,
        )}
      </Box>
      {/* withers */}
      {withersToggleBtn && (
        <>
          <Box mt='40px' display={'flex'} gap='6px'>
            <Icon image={assets.icons.trottingHorse3} />
            <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} lineHeight={'20px'} color={colors.textcolor}>
              Withers
            </Text>
          </Box>
          <Box maxW={'100%'} gap={'23px'} display='flex'>
            <DeficitGraph horseSide='withers' data={chartData?.deficit?.withersImpact} type='Impact' />
            <DeficitGraph horseSide='withers' data={chartData?.deficit?.withersPushoff} type='Push Off' />
          </Box>
          <Box mt='12px' gap='20px' display={'flex'}>
            {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
            <Box display={'flex'} gap={'4px'} alignItems={'center'}>
              <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
              <Text ml='2px' fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack} paddingTop={'2px'}>
                Mean
              </Text>
            </Box>
          </Box>
          <Divider mt='8px' />
          <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='8px'>
            {uniqueWithersArray?.map(
              (item, index) =>
                index % 2 === 0 && (
                  <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueWithersArray[index + 1]?.name || ''} color2={uniqueWithersArray[index + 1]?.color || ''} />
                ),
            )}
          </Box>
        </>
      )}
      {/* hind */}
      <Box mt='40px' display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} lineHeight={'20px'} color={colors.textcolor}>
          Hind
        </Text>
      </Box>
      <Box maxW={'100%'} gap={'23px'} display='flex'>
        <DeficitGraph horseSide='hind' data={chartData?.deficit?.hindImpact} type='Impact' />
        <DeficitGraph horseSide='hind' data={chartData?.deficit?.hindPushoff} type='Push Off' />
      </Box>
      <Box mt='12px' gap='20px' display={'flex'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
        <Box display={'flex'} gap={'4px'} alignItems={'center'}>
          <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
          <Text ml='2px' fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack} paddingTop={'2px'}>
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt='8px' />
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='8px'>
        {uniqueHindArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueHindArray[index + 1]?.name || ''} color2={uniqueHindArray[index + 1]?.color || ''} />,
        )}
      </Box>
    </Box>
  )
}

export default DeficitCharts
