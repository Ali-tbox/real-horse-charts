import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DeficitScatter from "./DeficitScatter";
import colors from "../../../config/colors";

function DeficitScatterCharts() {
  return (
    <Box paddingX={"16px"} paddingY={"32px"}>
      <Box paddingY={"7px"} alignItems={"center"} display={"flex"} gap={"6px"}>
        <Text
          color={colors.dullblack}
          lineHeight={"22px"}
          fontSize="16px"
          fontWeight={700}
          fontFamily="Nunito"
        >
          Deficit Scatter Chart
        </Text>
      </Box>
      <DeficitScatter type="front" />

      <DeficitScatter type="hind" />
    </Box>
  );
}

export default DeficitScatterCharts;
