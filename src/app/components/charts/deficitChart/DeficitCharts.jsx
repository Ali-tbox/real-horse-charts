import { Box, Divider, Text } from "@chakra-ui/layout";
import React from "react";
import Icon from "../../form/Icon";

import DeficitGraph from "./DeficitGraph";

import colors from "../../../config/colors";
import SymmentryRoundLabel from "../SymmentryRoundLabel";
import assets from "../../../assets/assests";
import SymmentryLabel from "../SymmentryLabel";

function DeficitCharts() {
  return (
    <Box paddingX={"16px"} paddingY={"32px"}>
      <Box
        mb="10px"
        paddingY={"7px"}
        alignItems={"center"}
        display={"flex"}
        gap={"6px"}
      >
        <Text
          fontSize="16px"
          color={colors.dullblack}
          lineHeight={"22px"}
          fontWeight={700}
          fontFamily="Nunito"
        >
          Deficit Bar Chart
        </Text>
        <Icon
          imageHeight={"14px"}
          imageWidth={"14px"}
          image={assets.icons.darkInfo}
        />
      </Box>
      <Box display={"flex"} gap="6px">
        <Icon image={assets.icons.trottingHorse} />
        <Text
          fontFamily={"Nunito"}
          fontWeight={700}
          fontSize={"16px"}
          lineHeight={"20px"}
          color={colors.textcolor}
        >
          Front
        </Text>
      </Box>
      <Box gap={"23px"} display="flex">
        <DeficitGraph type="Impact" />
        <DeficitGraph type="Push Off" />
      </Box>
      <Box mt="12px" display={"flex"} gap={"20px"}>
        <SymmentryRoundLabel text={"Left rein"} color={colors.faintblue} />
        <SymmentryRoundLabel text={"Straight line"} color={colors.mustard} />
        <SymmentryRoundLabel text={"Right rein"} color={colors.darkpurple} />
        <Box display={"flex"} alignItems={"center"}>
          <Icon
            imageWidth={"14px"}
            imageHeight={"2px"}
            image={assets.icons.Line}
          />
          <Text
            ml="2px"
            fontSize={"11px"}
            textAlign={"center"}
            lineHeight={"16px"}
            color={colors.faintblack}
            paddingTop={"2px"}
          >
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt="8px" />
      <Box display={"flex"} flexDir={"column"} gap={"8px"} mt="8px">
        <SymmentryLabel
          text1="Normal symmetry"
          color1={colors.mediumGreen}
          text2={"Mild to moderate asymmetry"}
          color2={colors.lightYellow}
        />
        <SymmentryLabel text1="Severe asymmetry" color1={colors.mehron} />
      </Box>
      <Box mt="40px" display={"flex"} gap="6px">
        <Icon image={assets.icons.trottingHorse1} />
        <Text
          fontFamily={"Nunito"}
          fontWeight={700}
          fontSize={"16px"}
          lineHeight={"20px"}
          color={colors.textcolor}
        >
          Hind
        </Text>
      </Box>
      <Box gap={"23px"} display="flex">
        <DeficitGraph type="Impact" />
        <DeficitGraph type="Push Off" />
      </Box>
      <Box mt="12px" gap="20px" display={"flex"}>
        <SymmentryRoundLabel text={"Left rein"} color={colors.faintblue} />
        <SymmentryRoundLabel text={"Straight line"} color={colors.mustard} />
        <SymmentryRoundLabel text={"Right rein"} color={colors.darkpurple} />
      </Box>
      <Divider mt="8px" />
      <Box display={"flex"} flexDir={"column"} gap={"10px"} mt="8px">
        <SymmentryLabel
          text1="Normal symmetry"
          color1={colors.mediumGreen}
          text2={"Mild to moderate asymmetry"}
          color2={colors.lightYellow}
        />
        <SymmentryLabel text1="Severe asymmetry" color1={colors.mehron} />
      </Box>
    </Box>
  );
}

export default DeficitCharts;
