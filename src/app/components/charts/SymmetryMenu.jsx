import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

import Icon from "../form/Icon";
import assets from "../../assets/assests";
import colors from "../../config/colors";

function SymmetryMenu({ label, ml }) {
  return (
    <Menu>
      <MenuButton
        w="122px"
        fontSize="12px"
        _hover={{ bg: colors.searchcolor }}
        _active={{ bg: colors.searchcolor }}
        fontWeight={700}
        color={colors.bluebtn}
        ml={ml}
        bg={colors.searchcolor}
        as={Button}
        colorScheme="blue"
        rightIcon={<Icon image={assets.icons.downarrow} />}
      >
        {label}
      </MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        {/* Add more MenuItems as needed */}
      </MenuList>
    </Menu>
  );
}

export default SymmetryMenu;
