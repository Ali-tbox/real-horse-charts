import { Box, Text } from "@chakra-ui/react";
import React from "react";

import BarChart from "./BarChart";
import colors from "../../config/colors";

function StrideSymmetryGraph({ color1, color2, text }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      paddingY="12px"
      paddingX="16px"
      mt={"13px"}
      h="235px"
      w="160px"
      borderRadius="8px"
      border="1px"
      borderColor={colors.faintgray}
    >
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="14px" fontWeight={700} lineHeight={"20px"}>
          {text}
        </Text>
        <Text fontSize="12px" lineHeight={"16px"} color={colors.faintblack}>
          mm
        </Text>
      </Box>
      <Box height={"80%"}>
        <BarChart color1={color1} color2={color2} />
      </Box>
    </Box>
  );
}

export default StrideSymmetryGraph;
