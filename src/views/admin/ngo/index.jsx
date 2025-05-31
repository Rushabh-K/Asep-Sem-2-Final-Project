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
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Badge,
  HStack,
  VStack,
  IconButton,
  useToast,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon, CalendarIcon } from "@chakra-ui/icons";
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
    category: "Vegetables",
    description: "Fresh assorted vegetables including carrots, tomatoes, and lettuce",
  },
  {
    id: 2,
    name: "Bread and Pastries",
    quantity: "100 pieces",
    expiryDate: "2024-03-10",
    donor: "City Bakery",
    latitude: 19.0825,
    longitude: 72.8867,
    category: "Bakery",
    description: "Fresh bread, croissants, and various pastries",
  },
  {
    id: 3,
    name: "Canned Goods",
    quantity: "200 cans",
    expiryDate: "2024-06-20",
    donor: "SuperMart",
    latitude: 19.0685,
    longitude: 72.8687,
    category: "Non-Perishable",
    description: "Assorted canned vegetables, fruits, and beans",
  },
  {
    id: 4,
    name: "Dairy Products",
    quantity: "30 liters",
    expiryDate: "2024-03-12",
    donor: "Dairy Fresh Co.",
    latitude: 19.0895,
    longitude: 72.8657,
    category: "Dairy",
    description: "Fresh milk, yogurt, and cheese products",
  },
];

// Mock data for pickups
const initialPickups = [
  {
    id: 1,
    foodItem: "Rice and Grains",
    donor: "Wholesale Foods",
    status: "Scheduled",
    pickupDate: "2024-03-10",
    pickupTime: "10:00 AM",
  },
  {
    id: 2,
    foodItem: "Fresh Fruits",
    donor: "Green Market",
    status: "Completed",
    pickupDate: "2024-03-05",
    pickupTime: "2:00 PM",
  },
  {
    id: 3,
    foodItem: "Packaged Meals",
    donor: "Restaurant Chain",
    status: "In Progress",
    pickupDate: "2024-03-08",
    pickupTime: "3:30 PM",
  },
];

export default function NGODashboard() {
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedListing, setSelectedListing] = useState(null);
  const [myPickups, setMyPickups] = useState(initialPickups);
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isScheduleOpen, onOpen: onScheduleOpen, onClose: onScheduleClose } = useDisclosure();
  const [scheduleForm, setScheduleForm] = useState({
    pickupDate: "",
    pickupTime: "",
  });
  
  const toast = useToast();
  const textColor = useColorModeValue("navy.700", "white");
  const cardBg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Filter and search food listings
  const filteredListings = foodListings.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.donor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Convert food listings to map locations
  const mapLocations = filteredListings.map(item => ({
    latitude: item.latitude,
    longitude: item.longitude,
    name: item.name,
    description: `${item.quantity} available at ${item.donor}. Expires: ${item.expiryDate}`,
  }));

  const handleSchedulePickup = (listing) => {
    setSelectedListing(listing);
    onScheduleOpen();
  };

  const handleScheduleSubmit = () => {
    const newPickup = {
      id: myPickups.length + 1,
      foodItem: selectedListing.name,
      donor: selectedListing.donor,
      status: "Scheduled",
      pickupDate: scheduleForm.pickupDate,
      pickupTime: scheduleForm.pickupTime,
    };

    setMyPickups([...myPickups, newPickup]);
    onScheduleClose();
    
    toast({
      title: "Pickup Scheduled",
      description: `Scheduled pickup for ${selectedListing.name} on ${scheduleForm.pickupDate} at ${scheduleForm.pickupTime}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setScheduleForm({ pickupDate: "", pickupTime: "" });
  };

  const updatePickupStatus = (pickupId, newStatus) => {
    const updatedPickups = myPickups.map(pickup => 
      pickup.id === pickupId ? { ...pickup, status: newStatus } : pickup
    );
    setMyPickups(updatedPickups);

    toast({
      title: "Status Updated",
      description: `Pickup status updated to ${newStatus}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

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

      {/* Search and Filter Section */}
      <HStack mb="20px" spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search food listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          maxW="200px"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Bakery">Bakery</option>
          <option value="Non-Perishable">Non-Perishable</option>
          <option value="Dairy">Dairy</option>
        </Select>
      </HStack>

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
          {filteredListings.map((item) => (
            <Card
              key={item.id}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="20px"
              cursor="pointer"
              onClick={() => {
                setSelectedListing(item);
                onDetailOpen();
              }}
              _hover={{ transform: "translateY(-5px)", transition: "all 0.3s" }}
            >
              <CardBody>
                <Stack spacing="3">
                  <Heading size="md" color={textColor}>
                    {item.name}
                  </Heading>
                  <Text color="gray.600">Quantity: {item.quantity}</Text>
                  <Text color="gray.600">Expires: {item.expiryDate}</Text>
                  <Text color="gray.600">Donor: {item.donor}</Text>
                  <Badge colorScheme="blue">{item.category}</Badge>
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
          leftIcon={<CalendarIcon />}
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
                  <Text color="gray.600">Date: {pickup.pickupDate}</Text>
                  <Text color="gray.600">Time: {pickup.pickupTime}</Text>
                  <HStack justify="space-between" align="center">
                    <Badge
                      colorScheme={
                        pickup.status === "Completed"
                          ? "green"
                          : pickup.status === "In Progress"
                          ? "orange"
                          : "blue"
                      }
                    >
                      {pickup.status}
                    </Badge>
                    <HStack spacing={2}>
                      {pickup.status !== "Completed" && (
                        <>
                          <Button
                            size="sm"
                            colorScheme="orange"
                            onClick={() => updatePickupStatus(pickup.id, "In Progress")}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => updatePickupStatus(pickup.id, "Completed")}
                          >
                            Complete
                          </Button>
                        </>
                      )}
                    </HStack>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedListing?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <Text><strong>Description:</strong> {selectedListing?.description}</Text>
              <Text><strong>Quantity:</strong> {selectedListing?.quantity}</Text>
              <Text><strong>Category:</strong> {selectedListing?.category}</Text>
              <Text><strong>Donor:</strong> {selectedListing?.donor}</Text>
              <Text><strong>Expiry Date:</strong> {selectedListing?.expiryDate}</Text>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onDetailClose();
                  handleSchedulePickup(selectedListing);
                }}
              >
                Schedule Pickup
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Schedule Pickup Modal */}
      <Modal isOpen={isScheduleOpen} onClose={onScheduleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule Pickup</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Pickup Date</FormLabel>
                <Input
                  type="date"
                  value={scheduleForm.pickupDate}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, pickupDate: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Pickup Time</FormLabel>
                <Input
                  type="time"
                  value={scheduleForm.pickupTime}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, pickupTime: e.target.value })}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleScheduleSubmit} width="100%">
                Schedule
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 