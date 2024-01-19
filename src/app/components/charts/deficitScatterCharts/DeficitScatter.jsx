import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../../../config/colors";
import SymmetryMenu from "../SymmetryMenu";
import assets from "../../../assets/assests";
import Icon from "../../form/Icon";
import SymmentryLabel from "../SymmentryLabel";
import SymmentryRoundLabel from "../SymmentryRoundLabel";
import ScatterPieChart from "./ScatterPieChart";

function DeficitScatter({ type }) {
  return (
    <Box mt="24px">
      <Box display={"flex"} gap="6px">
        <Icon
          image={
            type === "front"
              ? assets.icons.trottingHorse
              : assets.icons.trottingHorse1
          }
        />
        <Text
          fontFamily={"Nunito"}
          fontWeight={700}
          fontSize={"14px"}
          color={colors.textcolor}
        >
          {type === "front" ? "Front" : "Hind"}
        </Text>
      </Box>
      <Box mt="16px" gap="20px" display={"flex"}>
        <SymmetryMenu label="All footage" />
        <SymmetryMenu label="All strides" />
      </Box>
      <Box mt="16px" w="337px" h="337px">
        <ScatterPieChart />
      </Box>

      <Box mt="16px" gap="20px" display={"flex"}>
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
      <Box
        mt="32px"
        borderRadius="8px"
        padding={"12px"}
        bg={colors.faint}
        w="343px"
      >
        <Text
          fontFamily="Nunito"
          fontSize="14px"
          color={colors.textcolor}
          lineHeight={"20px"}
        >
          We recommend you repeat left circle for more accurate results.
        </Text>
      </Box>
    </Box>
  );
}

export default DeficitScatter;
