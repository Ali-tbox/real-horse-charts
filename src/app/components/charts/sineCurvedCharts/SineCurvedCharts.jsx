import React from "react";
import SineCurve from "./SineCurve";
import { Box, Text } from "@chakra-ui/react";
import colors from "../../../config/colors";

function SineCurvedCharts() {
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
          Sine Curve Chart
        </Text>
      </Box>
      <SineCurve type="front" />

      <SineCurve type="hind" />
    </Box>
  );
}

export default SineCurvedCharts;
