// Chakra imports
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FoodMap from "components/map/FoodMap";

// Mock data for food listings
const foodListings = [
  {
    id: 1,
    name: "Fresh Vegetables",
    quantity: "50 kg",
    expiryDate: "2024-03-15",
    donor: "Fresh Foods Market",
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    id: 2,
    name: "Bread and Pastries",
    quantity: "100 pieces",
    expiryDate: "2024-03-10",
    donor: "City Bakery",
    latitude: 19.0825,
    longitude: 72.8867,
  },
  {
    id: 3,
    name: "Canned Goods",
    quantity: "200 cans",
    expiryDate: "2024-06-20",
    donor: "SuperMart",
    latitude: 19.0685,
    longitude: 72.8687,
  },
  {
    id: 4,
    name: "Dairy Products",
    quantity: "30 liters",
    expiryDate: "2024-03-12",
    donor: "Dairy Fresh Co.",
    latitude: 19.0895,
    longitude: 72.8657,
  },
];

// Mock data for pickups
const myPickups = [
  {
    id: 1,
    foodItem: "Rice and Grains",
    donor: "Wholesale Foods",
    status: "Scheduled",
  },
  {
    id: 2,
    foodItem: "Fresh Fruits",
    donor: "Green Market",
    status: "Completed",
  },
  {
    id: 3,
    foodItem: "Packaged Meals",
    donor: "Restaurant Chain",
    status: "In Progress",
  },
];

export default function NGODashboard() {
  const [showMap, setShowMap] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const cardBg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Convert food listings to map locations
  const mapLocations = foodListings.map(item => ({
    latitude: item.latitude,
    longitude: item.longitude,
    name: item.name,
    description: `${item.quantity} available at ${item.donor}. Expires: ${item.expiryDate}`,
  }));

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Heading */}
      <Heading
        mb="20px"
        color={textColor}
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
      >
        NGO Dashboard
      </Heading>

      {/* Available Food Listings Section */}
      <Box mb="20px">
        <Heading
          size="md"
          mb="4"
          color={textColor}
          fontSize="xl"
          fontWeight="600"
        >
          Available Food Listings
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing="20px">
          {foodListings.map((item) => (
            <Card
              key={item.id}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="20px"
            >
              <CardBody>
                <Stack spacing="3">
                  <Heading size="md" color={textColor}>
                    {item.name}
                  </Heading>
                  <Text color="gray.600">Quantity: {item.quantity}</Text>
                  <Text color="gray.600">Expires: {item.expiryDate}</Text>
                  <Text color="gray.600">Donor: {item.donor}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Map Section */}
      <Box mb="20px">
        <Button
          variant="brand"
          minW="185px"
          fontSize="sm"
          fontWeight="500"
          onClick={() => setShowMap(!showMap)}
          mb="4"
        >
          {showMap ? "Hide Map" : "Browse Food on Map"}
        </Button>
        {showMap && (
          <Card bg={cardBg} boxShadow={cardShadow} borderRadius="20px">
            <CardBody>
              <FoodMap locations={mapLocations} />
            </CardBody>
          </Card>
        )}
      </Box>

      {/* My Pickups Section */}
      <Box mb="20px">
        <Heading
          size="md"
          mb="4"
          color={textColor}
          fontSize="xl"
          fontWeight="600"
        >
          My Pickups
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing="20px">
          {myPickups.map((pickup) => (
            <Card
              key={pickup.id}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="20px"
            >
              <CardBody>
                <Stack spacing="3">
                  <Heading size="sm" color={textColor}>
                    {pickup.foodItem}
                  </Heading>
                  <Text color="gray.600">Donor: {pickup.donor}</Text>
                  <Text
                    color={
                      pickup.status === "Completed"
                        ? "green.500"
                        : pickup.status === "In Progress"
                        ? "orange.500"
                        : "blue.500"
                    }
                    fontWeight="500"
                  >
                    Status: {pickup.status}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 