import { Switch as ChakraSwitch } from '@chakra-ui/react'
import colors from '../../config/colors'

const Switch = ({ size = 'lg', onChange, checked }) => {
  const handleSwitchChange = event => {
    const newChecked = event.target.checked // Get the new checked state from the event
    onChange(newChecked) // Notify the parent component about the change
  }
  return (
    <ChakraSwitch
      value={checked}
      isChecked={checked}
      checked={checked}
      defaultChecked={checked}
      onChange={handleSwitchChange}
      size={size}
      outline={0}
      border={0}
      // colorScheme='blue'
      sx={{
        'span.chakra-switch__track[data-checked]': { backgroundColor: colors.bluebtn },
      }}
      css={{
        'span.chakra-switch__track:focus-visible': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
        'span.chakra-switch__track[data-focus-visible]': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
      }}
    />
  )
}

export default Switch
