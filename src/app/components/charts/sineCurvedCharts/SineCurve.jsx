import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../../../config/colors";
import CurvedLineChart from "./CurvedLineChart";
import SymmetryMenu from "../SymmetryMenu";
import assets from "../../../assets/assests";
import Icon from "../../form/Icon";
import SymmentryLabel from "../SymmentryLabel";
import SymmentryRoundLabel from "../SymmentryRoundLabel";

function SineCurve({ type }) {
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
          fontSize={"16px"}
          color={colors.textcolor}
        >
          {type === "front" ? "Front" : "Hind"}
        </Text>
      </Box>
      <Box mt="16px" gap="20px" display={"flex"}>
        <SymmetryMenu label="All footage" />
        <SymmetryMenu label="All strides" />
      </Box>
      <Box
        mt="18px"
        border="1px"
        borderRadius="8px"
        borderColor={colors.dullsilver}
        w="352px"
        h="256px"
      >
        <Box w="317px" display={"flex"} h="256px">
          <Box
            mt="55px"
            h="140px"
            display="flex"
            alignItems={"center"}
            flexDir={"column"}
            justifyContent={"space-between"}
          >
            <Text
              whiteSpace={"nowrap"}
              color={colors.faintblack}
              fontSize="11px"
              transform="rotate(-90deg)"
            >
              Push off
            </Text>
            <Text fontWeight={700} fontSize={"12px"}>
              0
            </Text>
            <Text
              color={colors.faintblack}
              fontSize={"11px"}
              transform="rotate(-90deg)"
            >
              Impact
            </Text>
          </Box>
          <CurvedLineChart />
        </Box>
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
    </Box>
  );
}

export default SineCurve;
