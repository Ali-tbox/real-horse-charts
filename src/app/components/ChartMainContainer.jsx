import { Box, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import StrideSymmetry from './charts/StrideSymmetry'
import DeficitCharts from './charts/deficitChart/DeficitCharts'
import DeficitScatterCharts from './charts/deficitScatterCharts/DeficitScatterCharts'
import SineCurvedCharts from './charts/sineCurvedCharts/SineCurvedCharts'
import StridePrecision from './form/StridePrecision'
import colors from '../config/colors'
import chartData from './charts/chartData'
import Switch from './form/Switch'

function ChartMainContainer() {
  // function sendMessageToNative(data) {
  //   console.log("sendMessageToNative");
  //   window.webkit.messageHandlers.nativeMessageHandler.postMessage(data);
  // }
  // window.handleMessageFromNative = function (data) {
  //   console.log("sendMessageToNative", data);
  // };
  const [dataFromIOS, setDataFromIOS] = useState('')
  const [withersToggleValue, setWithersToggleValue] = useState(false)

  useEffect(() => {
    // Adding event for IOS app

    window.addEventListener('iosEvent', iosEventHandler)

    return () => window.removeEventListener('iosEvent', iosEventHandler)
  }, [])

  const iosEventHandler = useCallback(
    e => {
      console.log('Received data from IOS : ' + e.detail.data)
      setDataFromIOS(e.detail.data)
      setWithersToggleValue(e.detail.withersToggle)
    },
    [setDataFromIOS, setWithersToggleValue],
  )

  const onClickHandler = name => {
    console.log('Sending data to IOS : ' + name)
    // Sending Data to IOS App
    window?.webkit?.messageHandlers?.IOS_BRIDGE?.postMessage({
      message: name,
    })
  }
  const handleWithersToggle = newValue => {
    // Update local state
    setWithersToggleValue(newValue)

    // Send toggle state to mobile as string
    const toggleString = newValue ? 'true' : 'false'
    console.log('Sending toggle state to IOS : ' + toggleString)

    window?.webkit?.messageHandlers?.IOS_BRIDGE?.postMessage({
      message: toggleString,
      // message: 'toggleState',
      // withersToggle: toggleString, // Send as string
      // value: toggleString, // Alternative key in case mobile expects 'value'
    })
  }

  const names = ['Atif', 'Jane', 'Vicky', 'Alice', 'Raj']

  // const rightHindArray = newData.deficitScatter.rightHind;

  // Accessing maxDiff of each item in rightHind array
  // const maxDiffs = rightHindArray.map((item) => item.MaxMinDiff.maxDiff);

  function isJSONString(str) {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <Box w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
      <StridePrecision chartData={dataFromIOS} handleItemClick={onClickHandler} />
      <Box w='100%' bg={colors.silverGray} h={'6px'}></Box>
      {/* withers detail box and toggle */}
      <Box w='100%' paddingX={'16px'} paddingY='32px'>
        <Box pb={'7px'} display='flex' justifyContent='space-between' alignItems='center'>
          <Text color={colors.dullblack} fontSize='16px' fontWeight={700}>
            Show withers data
          </Text>
          <Switch size='lg' checked={withersToggleValue} onChange={handleWithersToggle} />
        </Box>
        <Box>
          <Text
            color={colors.textcolor}
            maxWidth='271px' // Constrain width to force wrapping
            overflow='hidden'
            display='-webkit-box'
            fontSize='14px' // Match the size from image
            lineHeight='1.4'
            sx={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            fontWeight={400}
          >
            Description goes here can to 2 lines maximum...
          </Text>
        </Box>
      </Box>
      <Box w='100%' bg={colors.silverGray} h={'6px'}></Box>
      <StrideSymmetry withersToggleBtn={withersToggleValue} chartData={dataFromIOS} handleItemClick={onClickHandler} />
      <Box w='100%' bg={colors.silverGray} h={'6px'}></Box>
      <DeficitCharts withersToggleBtn={withersToggleValue} chartData={dataFromIOS} handleItemClick={onClickHandler} />
      <Box w='100%' bg={colors.silverGray} h={'6px'}></Box>
      <DeficitScatterCharts withersToggleBtn={withersToggleValue} chartData={dataFromIOS} handleItemClick={onClickHandler} />
      <Box w='100%' bg={colors.silverGray} h={'6px'}></Box>
      <SineCurvedCharts withersToggleBtn={withersToggleValue} chartData={dataFromIOS} handleItemClick={onClickHandler} />
    </Box>
  )
}

export default ChartMainContainer
