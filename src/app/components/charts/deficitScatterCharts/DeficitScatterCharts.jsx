import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import DeficitScatter from './DeficitScatter'
import colors from '../../../config/colors'
import assets from '../../../assets/assests'
import Icon from '../../form/Icon'
// import chartData from '../chartData'

function DeficitScatterCharts({ chartData, handleItemClick }) {
  return (
    <Box w='100%' paddingY={'32px'}>
      <Box paddingX={'16px'} paddingY={'7px'} alignItems={'center'} display={'flex'} gap={'6px'}>
        <Text color={colors.dullblack} lineHeight={'22px'} fontSize='16px' fontWeight={700} fontFamily='Nunito'>
          Deficit Scatter Chart
        </Text>
        <Icon onClick={() => handleItemClick('deficit-scatter-chart')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
      </Box>
      <DeficitScatter
        chartData={chartData}
        straightData={chartData?.deficitScatter?.straightFore}
        leftData={chartData?.deficitScatter?.leftFore}
        rightData={chartData?.deficitScatter?.rightFore}
        max={75}
        min={-75}
        type='front'
      />

      <DeficitScatter
        chartData={chartData}
        straightData={chartData?.deficitScatter?.straighthind}
        leftData={chartData?.deficitScatter?.leftHind}
        rightData={chartData?.deficitScatter?.rightHind}
        max={45}
        min={-45}
        type='hind'
      />
    </Box>
  )
}

export default DeficitScatterCharts
