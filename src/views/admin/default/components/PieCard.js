// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import React from "react";

// Data for food categories
const foodCategoryData = [55, 25, 15, 5];
const foodCategoryOptions = {
  labels: ["Vegetables & Fruits", "Bakery", "Non-Perishable", "Dairy"],
  colors: ["#4318FF", "#6AD2FF", "#82D616", "#EFF4FB"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF", "#82D616", "#EFF4FB"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
  },
};

export default function FoodDistribution() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p="20px" align="center" direction="column" w="100%">
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px">
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Food Category Distribution
        </Text>
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={foodCategoryData}
        chartOptions={foodCategoryOptions}
      />
      
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto">
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#4318FF" borderRadius="50%" me="4px" />
            <Text fontSize="xs" color="secondaryGray.600" fontWeight="700">
              Vegetables & Fruits
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            55%
          </Text>
        </Flex>
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text fontSize="xs" color="secondaryGray.600" fontWeight="700">
              Bakery
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            25%
          </Text>
        </Flex>
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#82D616" borderRadius="50%" me="4px" />
            <Text fontSize="xs" color="secondaryGray.600" fontWeight="700">
              Non-Perishable
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            15%
          </Text>
        </Flex>
        <Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#EFF4FB" borderRadius="50%" me="4px" />
            <Text fontSize="xs" color="secondaryGray.600" fontWeight="700">
              Dairy
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            5%
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
