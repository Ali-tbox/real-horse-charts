import React from "react";

import { Box, Text } from "@chakra-ui/react";

import SymmentryLabel from "./SymmentryLabel";

import Icon from "../form/Icon";
import StrideSymmetryGraph from "./StrideSymmetryGraph";
import SymmetryMenu from "./SymmetryMenu";
import assets from "../../assets/assests";
import colors from "../../config/colors";

function StrideSymmetry() {
  return (
    <Box paddingX={"16px"} paddingY="32px">
      <Box mb="24px" alignItems={"center"} display={"flex"} gap={"6px"}>
        <Text
          fontSize="16px"
          color={colors.dullblack}
          lineHeight={"22px"}
          fontWeight={700}
          fontFamily="Nunito"
        >
          Stride Symmetry
        </Text>
        <Icon
          imageHeight={"14px"}
          imageWidth={"14px"}
          image={assets.icons.darkInfo}
        />
        <SymmetryMenu ml="69px" label={"Straight line"} />
      </Box>
      <Box display={"flex"} gap="6px">
        <Icon image={assets.icons.trottingHorse} />
        <Text
          fontFamily={"Nunito"}
          fontWeight={700}
          lineHeight={"20px"}
          fontSize={"16px"}
          color={colors.textcolor}
        >
          Front
        </Text>
      </Box>
      <Box gap={"23px"} display="flex">
        <StrideSymmetryGraph
          text="Impact"
          color1={colors.mediumGreen}
          color2={colors.mediumRed}
        />
        <StrideSymmetryGraph
          text="Push off"
          color1={colors.paleYellow}
          color2={colors.darkGreen}
        />
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"10px"} mt="12px">
        <SymmentryLabel
          text1="Normal symmetry"
          color1={colors.mediumGreen}
          text2={"Mild asymmetry"}
          color2={colors.darkGreen}
        />
        <SymmentryLabel
          text1="Moderate asymmety"
          color1={colors.paleYellow}
          text2={"Moderate to severe asymmetry"}
          color2={colors.mediumRed}
        />
      </Box>
      <Box mt="40px" mb={"14px"} display={"flex"} gap="6px">
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
        <StrideSymmetryGraph
          text="Impact"
          color1={colors.mehron}
          color2={colors.mediumGreen}
        />
        <StrideSymmetryGraph
          text="Push off"
          color1={colors.lightYellow}
          color2={colors.mediumGreen}
        />
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"10px"} mt="12px">
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

export default StrideSymmetry;
