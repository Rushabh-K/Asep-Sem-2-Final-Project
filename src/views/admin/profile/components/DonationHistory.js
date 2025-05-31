import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Mock data for donation history
const mockDonations = [
  {
    id: "D001",
    date: "2024-03-15",
    items: "Fresh Vegetables, Bread",
    quantity: "25 kg",
    status: "Completed",
    receiver: "Local Food Bank"
  },
  {
    id: "D002",
    date: "2024-03-14",
    items: "Canned Goods",
    quantity: "15 kg",
    status: "In Transit",
    receiver: "Homeless Shelter"
  },
  {
    id: "D003",
    date: "2024-03-13",
    items: "Dairy Products",
    quantity: "10 kg",
    status: "Scheduled",
    receiver: "Community Center"
  }
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green';
    case 'in transit':
      return 'blue';
    case 'scheduled':
      return 'orange';
    default:
      return 'gray';
  }
};

export default function DonationHistory() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Mock statistics
  const stats = {
    totalDonations: 45,
    totalWeight: "850 kg",
    avgPerMonth: "170 kg",
    impactedPeople: "2,500+"
  };

  return (
    <Card>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
        Donation History
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Track your food donation history and impact in the community
      </Text>

      {/* Statistics */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap='20px' mb='20px'>
        <Stat>
          <StatLabel>Total Donations</StatLabel>
          <StatNumber>{stats.totalDonations}</StatNumber>
          <StatHelpText>All time</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Weight</StatLabel>
          <StatNumber>{stats.totalWeight}</StatNumber>
          <StatHelpText>Of food donated</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Monthly Average</StatLabel>
          <StatNumber>{stats.avgPerMonth}</StatNumber>
          <StatHelpText>Per month</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>People Impacted</StatLabel>
          <StatNumber>{stats.impactedPeople}</StatNumber>
          <StatHelpText>Lives touched</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Donation Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Date</Th>
              <Th>Items</Th>
              <Th>Quantity</Th>
              <Th>Receiver</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockDonations.map((donation) => (
              <Tr key={donation.id}>
                <Td>{donation.id}</Td>
                <Td>{donation.date}</Td>
                <Td>{donation.items}</Td>
                <Td>{donation.quantity}</Td>
                <Td>{donation.receiver}</Td>
                <Td>
                  <Badge
                    colorScheme={getStatusColor(donation.status)}
                    borderRadius="full"
                    px="2"
                  >
                    {donation.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
} 