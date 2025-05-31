// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Text,
  Card,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdPeople,
  MdFoodBank,
  MdVolunteerActivism,
  MdDeliveryDining,
  MdTrendingUp,
  MdAccessTime,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

// Mock data for statistics
const mockStats = {
  totalDonors: 150,
  totalNGOs: 45,
  activeDonations: 324,
  completedDeliveries: 892,
  monthlyGrowth: "+23%",
  avgResponseTime: "2.5 hrs"
};

export default function MainDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const containerBg = useColorModeValue("white", "navy.700");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Stats Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        {/* Total Donors */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdVolunteerActivism} color={brandColor} />
              }
            />
          }
          name='Total Donors'
          value={mockStats.totalDonors}
        />
        
        {/* Total NGOs */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdPeople} color={brandColor} />
              }
            />
          }
          name='Total NGOs'
          value={mockStats.totalNGOs}
        />

        {/* Active Donations */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFoodBank} color={brandColor} />
              }
            />
          }
          name='Active Donations'
          value={mockStats.activeDonations}
        />

        {/* Completed Deliveries */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdDeliveryDining} color={brandColor} />
              }
            />
          }
          name='Completed Deliveries'
          value={mockStats.completedDeliveries}
        />

        {/* Monthly Growth */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdTrendingUp} color='white' />}
            />
          }
          name='Monthly Growth'
          value={mockStats.monthlyGrowth}
        />

        {/* Average Response Time */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAccessTime} color={brandColor} />
              }
            />
          }
          name='Avg Response Time'
          value={mockStats.avgResponseTime}
        />
      </SimpleGrid>

      {/* Food Donations and Delivery Status */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <Card p="0" borderWidth="1px" borderColor={borderColor}>
          <CheckTable 
            columnsData={columnsDataCheck} 
            tableData={tableDataCheck} 
          />
        </Card>
        <Card p="0" borderWidth="1px" borderColor={borderColor}>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
        </Card>
      </SimpleGrid>

      {/* Recent Activity and Upcoming Pickups */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* Recent Activity */}
        <Card p="6" h="100%">
          <Text fontSize="xl" fontWeight="600" mb="4">Recent Activity</Text>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <DailyTraffic />
            <PieCard />
          </SimpleGrid>
        </Card>

        {/* Upcoming Pickups */}
        <Card p="0" h="100%">
          <Tasks />
        </Card>
      </SimpleGrid>

      {/* Calendar Section */}
      <Card 
        p="0" 
        maxW={{ base: "100%", xl: "50%" }}
        mx="auto"
        mb='20px'
      >
        <MiniCalendar 
          selectRange={false}
        />
      </Card>
    </Box>
  );
}
