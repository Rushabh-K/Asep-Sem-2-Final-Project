import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon, Box, useColorModeValue, Flex, VStack } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "components/card/Card.js";

// Mock data for food pickup dates - using current month
const getCurrentMonthDates = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return {
    urgent: [
      new Date(currentYear, currentMonth, today.getDate()), // Today
      new Date(currentYear, currentMonth, today.getDate() + 1), // Tomorrow
    ],
    scheduled: [
      new Date(currentYear, currentMonth, today.getDate() + 3),
      new Date(currentYear, currentMonth, today.getDate() + 4),
    ],
    pending: [
      new Date(currentYear, currentMonth, today.getDate() + 5),
      new Date(currentYear, currentMonth, today.getDate() + 6),
    ],
    upcoming: [
      new Date(currentYear, currentMonth, today.getDate() + 7),
      new Date(currentYear, currentMonth, today.getDate() + 8),
    ],
  };
};

const pickupDates = getCurrentMonthDates();

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
  
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const statusColors = {
    urgent: '#FF4D4D',     // Bright red for urgency
    scheduled: '#4299E1',  // Blue
    pending: '#9F7AEA',    // Purple
    upcoming: '#48BB78'    // Green
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      // Check each status type for the date
      for (const [status, dates] of Object.entries(pickupDates)) {
        const hasPickup = dates.some(
          pickupDate => 
            pickupDate.getDate() === date.getDate() &&
            pickupDate.getMonth() === date.getMonth() &&
            pickupDate.getFullYear() === date.getFullYear()
        );
        
        if (hasPickup) {
          return (
            <Box
              w="6px"
              h="6px"
              borderRadius="50%"
              bg={statusColors[status]}
              mx="auto"
              mt="2px"
            />
          );
        }
      }
    }
    return null;
  };

  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      maxW='max-content'
      p='20px 15px'
      h='max-content'
      {...rest}>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={tileContent}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      />
      <Box mt="4" w="100%" borderTop="1px" borderColor={borderColor} pt="4">
        <Text color={textColor} fontSize="sm" fontWeight="600" mb="3">
          Pickup Schedule Legend:
        </Text>
        <VStack spacing="2" align="stretch">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Box w="8px" h="8px" borderRadius="50%" bg={statusColors.urgent} mr="2" />
              <Text fontSize="sm">Urgent</Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">Today & Tomorrow</Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Box w="8px" h="8px" borderRadius="50%" bg={statusColors.scheduled} mr="2" />
              <Text fontSize="sm">Scheduled</Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">In 3-4 days</Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Box w="8px" h="8px" borderRadius="50%" bg={statusColors.pending} mr="2" />
              <Text fontSize="sm">Pending</Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">In 5-6 days</Text>
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Box w="8px" h="8px" borderRadius="50%" bg={statusColors.upcoming} mr="2" />
              <Text fontSize="sm">Upcoming</Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">In 7+ days</Text>
          </Flex>
        </VStack>
      </Box>
    </Card>
  );
}
