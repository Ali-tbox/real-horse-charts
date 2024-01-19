import { Box } from "@chakra-ui/react";
import BarChart from "./charts/BarChart";
import React from "react";
import StrideSymmetryGraph from "./charts/StrideSymmetryGraph";
import StrideSymmetry from "./charts/StrideSymmetry";
import DeficitCharts from "./charts/deficitChart/DeficitCharts";
import DeficitScatterCharts from "./charts/deficitScatterCharts/DeficitScatterCharts";
import SineCurvedCharts from "./charts/sineCurvedCharts/SineCurvedCharts";

function ChartMainContainer() {
  return (
    <Box w="375px" bg="white">
      <StrideSymmetry />
      <DeficitCharts />
      <DeficitScatterCharts />
      <SineCurvedCharts />
    </Box>
  );
}

export default ChartMainContainer;
