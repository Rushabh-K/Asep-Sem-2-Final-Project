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
  useToast,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

// Mock data for donations
const initialDonations = [
  {
    id: 1,
    name: "Fresh Vegetables",
    quantity: "50 kg",
    expiryDate: "2024-03-15",
    status: "Available",
    category: "Vegetables",
    description: "Fresh assorted vegetables including carrots, tomatoes, and lettuce",
    pickupDetails: {
      address: "123 Market Street",
      availableTime: "9 AM - 5 PM",
      contactPerson: "John Doe",
      phone: "123-456-7890"
    }
  },
  {
    id: 2,
    name: "Bread and Pastries",
    quantity: "100 pieces",
    expiryDate: "2024-03-10",
    status: "Claimed",
    category: "Bakery",
    description: "Fresh bread, croissants, and various pastries",
    pickupDetails: {
      address: "456 Bakery Lane",
      availableTime: "7 AM - 3 PM",
      contactPerson: "Jane Smith",
      phone: "234-567-8901"
    }
  },
  {
    id: 3,
    name: "Canned Goods",
    quantity: "200 cans",
    expiryDate: "2024-06-20",
    status: "Available",
    category: "Non-Perishable",
    description: "Assorted canned vegetables, fruits, and beans",
    pickupDetails: {
      address: "789 Store Ave",
      availableTime: "10 AM - 6 PM",
      contactPerson: "Mike Johnson",
      phone: "345-678-9012"
    }
  }
];

export default function DonorDashboard() {
  const [donations, setDonations] = useState(initialDonations);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isNewDonationOpen, onOpen: onNewDonationOpen, onClose: onNewDonationClose } = useDisclosure();
  const [newDonation, setNewDonation] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    category: "",
    description: "",
    pickupDetails: {
      address: "",
      availableTime: "",
      contactPerson: "",
      phone: ""
    }
  });
  
  const toast = useToast();
  const textColor = useColorModeValue("navy.700", "white");
  const cardBg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Filter donations based on search and category
  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleNewDonationSubmit = () => {
    const donation = {
      id: donations.length + 1,
      ...newDonation,
      status: "Available"
    };

    setDonations([...donations, donation]);
    onNewDonationClose();
    
    toast({
      title: "Donation Added",
      description: "Your food donation has been successfully listed",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setNewDonation({
      name: "",
      quantity: "",
      expiryDate: "",
      category: "",
      description: "",
      pickupDetails: {
        address: "",
        availableTime: "",
        contactPerson: "",
        phone: ""
      }
    });
  };

  const updateDonationStatus = (donationId, newStatus) => {
    const updatedDonations = donations.map(donation => 
      donation.id === donationId ? { ...donation, status: newStatus } : donation
    );
    setDonations(updatedDonations);

    toast({
      title: "Status Updated",
      description: `Donation status updated to ${newStatus}`,
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
        Donor Dashboard
      </Heading>

      {/* Action Buttons */}
      <HStack mb="20px" spacing={4}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onNewDonationOpen}
        >
          Add New Donation
        </Button>
      </HStack>

      {/* Search and Filter Section */}
      <HStack mb="20px" spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search donations..."
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

      {/* Donations List */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing="20px">
        {filteredDonations.map((donation) => (
          <Card
            key={donation.id}
            bg={cardBg}
            boxShadow={cardShadow}
            borderRadius="20px"
            cursor="pointer"
            onClick={() => {
              setSelectedDonation(donation);
              onDetailOpen();
            }}
            _hover={{ transform: "translateY(-5px)", transition: "all 0.3s" }}
          >
            <CardBody>
              <Stack spacing="3">
                <Heading size="md" color={textColor}>
                  {donation.name}
                </Heading>
                <Text color="gray.600">Quantity: {donation.quantity}</Text>
                <Text color="gray.600">Expires: {donation.expiryDate}</Text>
                <Badge
                  colorScheme={
                    donation.status === "Available"
                      ? "green"
                      : donation.status === "Claimed"
                      ? "orange"
                      : "red"
                  }
                >
                  {donation.status}
                </Badge>
                <Text color="gray.600" noOfLines={2}>
                  {donation.description}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Donation Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDonation?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <Text><strong>Description:</strong> {selectedDonation?.description}</Text>
              <Text><strong>Quantity:</strong> {selectedDonation?.quantity}</Text>
              <Text><strong>Category:</strong> {selectedDonation?.category}</Text>
              <Text><strong>Expiry Date:</strong> {selectedDonation?.expiryDate}</Text>
              <Text><strong>Status:</strong> {selectedDonation?.status}</Text>
              <Box borderWidth="1px" p={4} borderRadius="md">
                <Heading size="sm" mb={2}>Pickup Details</Heading>
                <Text><strong>Address:</strong> {selectedDonation?.pickupDetails.address}</Text>
                <Text><strong>Available Time:</strong> {selectedDonation?.pickupDetails.availableTime}</Text>
                <Text><strong>Contact Person:</strong> {selectedDonation?.pickupDetails.contactPerson}</Text>
                <Text><strong>Phone:</strong> {selectedDonation?.pickupDetails.phone}</Text>
              </Box>
              {selectedDonation?.status === "Available" && (
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    updateDonationStatus(selectedDonation.id, "Claimed");
                    onDetailClose();
                  }}
                >
                  Mark as Claimed
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* New Donation Modal */}
      <Modal isOpen={isNewDonationOpen} onClose={onNewDonationClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Food Item Name</FormLabel>
                <Input
                  value={newDonation.name}
                  onChange={(e) => setNewDonation({ ...newDonation, name: e.target.value })}
                  placeholder="Enter food item name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={newDonation.quantity}
                  onChange={(e) => setNewDonation({ ...newDonation, quantity: e.target.value })}
                  placeholder="e.g., 50 kg, 100 pieces"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newDonation.category}
                  onChange={(e) => setNewDonation({ ...newDonation, category: e.target.value })}
                  placeholder="Select category"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Non-Perishable">Non-Perishable</option>
                  <option value="Dairy">Dairy</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={newDonation.expiryDate}
                  onChange={(e) => setNewDonation({ ...newDonation, expiryDate: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newDonation.description}
                  onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })}
                  placeholder="Describe the food items"
                />
              </FormControl>
              <Box borderWidth="1px" p={4} borderRadius="md" width="100%">
                <Heading size="sm" mb={2}>Pickup Details</Heading>
                <VStack spacing={3}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      value={newDonation.pickupDetails.address}
                      onChange={(e) => setNewDonation({
                        ...newDonation,
                        pickupDetails: { ...newDonation.pickupDetails, address: e.target.value }
                      })}
                      placeholder="Enter pickup address"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Available Time</FormLabel>
                    <Input
                      value={newDonation.pickupDetails.availableTime}
                      onChange={(e) => setNewDonation({
                        ...newDonation,
                        pickupDetails: { ...newDonation.pickupDetails, availableTime: e.target.value }
                      })}
                      placeholder="e.g., 9 AM - 5 PM"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contact Person</FormLabel>
                    <Input
                      value={newDonation.pickupDetails.contactPerson}
                      onChange={(e) => setNewDonation({
                        ...newDonation,
                        pickupDetails: { ...newDonation.pickupDetails, contactPerson: e.target.value }
                      })}
                      placeholder="Enter contact person name"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      value={newDonation.pickupDetails.phone}
                      onChange={(e) => setNewDonation({
                        ...newDonation,
                        pickupDetails: { ...newDonation.pickupDetails, phone: e.target.value }
                      })}
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                </VStack>
              </Box>
              <Button colorScheme="blue" onClick={handleNewDonationSubmit} width="100%">
                Add Donation
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 