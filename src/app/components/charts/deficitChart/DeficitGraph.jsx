import { Box, Text } from "@chakra-ui/layout";
import React from "react";

import colors from "../../../config/colors";
import PointBarChart from "./PointBarChart";

function DeficitGraph({ type }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      mt={"13px"}
      h="261px"
      w="160px"
      borderRadius="8px"
      border="1px"
      borderColor={colors.faintgray}
    >
      <Box
        paddingY="12px"
        paddingX={"16px"}
        display="flex"
        justifyContent="space-between"
      >
        <Text fontSize="14px" fontWeight={700}>
          {type}
        </Text>
        <Text fontSize="12px" color={colors.faintblack}>
          mm
        </Text>
      </Box>
      <Box display={"flex"} height={"80%"}>
        <Box
          mt="50px"
          h="140px"
          display="flex"
          alignItems={"end"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Text
            whiteSpace={"nowrap"}
            color={colors.faintblack}
            fontSize="11px"
            transform="rotate(-90deg)"
          >
            Right
          </Text>
          <Text
            color={colors.faintblack}
            fontSize={"11px"}
            transform="rotate(-90deg)"
          >
            Left
          </Text>
        </Box>
        <Box w="140px">
          <PointBarChart />
        </Box>
      </Box>
    </Box>
  );
}

export default DeficitGraph;
