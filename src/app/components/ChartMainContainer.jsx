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
  const [showWithersToggle, setShowWithersToggle] = useState(false)

  useEffect(() => {
    // Adding event for IOS app
    console.log('Adding iosEvent listener...')
    window.addEventListener('iosEvent', iosEventHandler)
    console.log('Event listener added successfully')
    return () => {
      console.log('Cleaning up: Removing iosEvent listener')
      window.removeEventListener('iosEvent', iosEventHandler)
      console.log('Event listener removed')
    }
  }, [])

  // useEffect(() => {
  //   window.addEventListener('iosEvent', iosEventHandler)

  //   // Auto-load dummy data in web browser
  //   const isWebBrowser = !window?.webkit?.messageHandlers?.IOS_BRIDGE

  //   if (isWebBrowser) {
  //     setTimeout(() => {
  //       // Simulate actual iOS event dispatch
  //       const customEvent = new CustomEvent('iosEvent', {
  //         detail: {
  //           data: chartData,
  //           withersToggle: true,
  //         },
  //       })
  //       window.dispatchEvent(customEvent) // This will trigger iosEventHandler properly
  //     }, 100)
  //   }

  //   return () => window.removeEventListener('iosEvent', iosEventHandler)
  // }, [])
  const iosEventHandler = useCallback(
    e => {
      console.log('Full event object:', e)
      console.log('Event type:', e.type)
      console.log('Event detail:', e.detail)
      console.log('Received data from IOS : ' + e.detail.data)
      console.log('Event triggered! Detail:', e.detail)
      console.log('Data received:', e.detail?.data)
      console.log('Data type:', typeof e.detail.data)
      console.log('Toggle received:', e.detail?.withersToggle)
      console.log('Toggle type:', typeof e.detail.withersToggle)

      // Parse data if it's a string
      let parsedData = e.detail.data
      if (typeof e.detail.data === 'string') {
        try {
          parsedData = JSON.parse(e.detail.data)
        } catch (error) {
          console.error('Error parsing data:', error)
        }
      }
      // Check if isWitherData property exists (only in new data)
      const isNewDataFormat = parsedData && 'isWitherData' in parsedData
      console.log('Is new data format:', isNewDataFormat)
      console.log('Available keys:', parsedData ? Object.keys(parsedData) : 'None')
      if (isNewDataFormat) {
        // New data: use isWitherData value (true/false)
        setShowWithersToggle(parsedData.isWitherData)
        console.log('New data - isWitherData:', parsedData.isWitherData)
      } else {
        // Old data: no isWitherData property, hide toggle
        setShowWithersToggle(false)
        console.log('Old data - hiding withers toggle')
      }
      setDataFromIOS(e.detail.data)
      // setShowWithersToggle(isNewDataFormat)
      setWithersToggleValue(e.detail.withersToggle)
      console.log('set states successfully')
    },
    [setDataFromIOS, setWithersToggleValue, setShowWithersToggle],
  )

  const onClickHandler = name => {
    console.log('Sending data to IOS : ' + name)
    // Sending Data to IOS App
    window?.webkit?.messageHandlers?.IOS_BRIDGE?.postMessage({
      message: name,
    })
  }
  const handleWithersToggle = newValue => {
    console.log('=== TOGGLE HANDLER START AT TOGGLE ON CHANGE ===')

    console.log('handleWithersToggle called with:', newValue)
    console.log('Previous toggle state:', withersToggleValue)

    // Update local state
    setWithersToggleValue(newValue)

    // Send toggle state to mobile as string
    const toggleString = newValue ? 'true' : 'false'
    console.log('Sending toggle state to IOS : ' + toggleString)
    if (window?.webkit?.messageHandlers?.IOS_BRIDGE) {
      console.log('WebKit bridge is available')
      window?.webkit?.messageHandlers?.IOS_BRIDGE?.postMessage({
        message: toggleString,
      })
      console.log('Toggle message successfully sent to iOS')
    }
    console.log('=== TOGGLE HANDLER END ===')
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
      {showWithersToggle && (
        <>
          <Box w='100%' paddingX={'16px'} paddingY='32px'>
            <Box
              sx={{
                WebkitTapHighlightColor: 'transparent',
                '&:focus': {
                  boxShadow: 'none',
                  outline: 'none',
                },
                '& .chakra-switch': {
                  WebkitTapHighlightColor: 'transparent',
                },
                '& .chakra-switch__track': {
                  WebkitTapHighlightColor: 'transparent',
                  '&:focus': {
                    boxShadow: 'none',
                  },
                },
                '& .chakra-switch__thumb': {
                  WebkitTapHighlightColor: 'transparent',
                  '&:focus': {
                    boxShadow: 'none',
                  },
                },
              }}
              pb={'7px'}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
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
        </>
      )}
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
