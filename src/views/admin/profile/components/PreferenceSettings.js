import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  Switch,
  FormControl,
  FormLabel,
  Select,
  VStack,
  HStack,
  Divider,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function PreferenceSettings() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const [foodTypes] = React.useState([
    "Fresh Produce",
    "Dairy",
    "Bread",
    "Canned Goods",
    "Prepared Meals"
  ]);

  return (
    <Card>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
        Preferences & Settings
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Customize your food donation preferences and notification settings
      </Text>

      {/* Notification Preferences */}
      <Box mb={8}>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Notification Preferences
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>Email Notifications</FormLabel>
            <Switch colorScheme='blue' defaultChecked />
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>SMS Notifications</FormLabel>
            <Switch colorScheme='blue' defaultChecked />
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>New Donation Alerts</FormLabel>
            <Switch colorScheme='blue' defaultChecked />
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>Pickup Reminders</FormLabel>
            <Switch colorScheme='blue' defaultChecked />
          </FormControl>
        </SimpleGrid>
      </Box>

      <Divider my={8} />

      {/* Food Preferences */}
      <Box mb={8}>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Food Preferences
        </Text>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Preferred Food Types</FormLabel>
            <Wrap spacing={2}>
              {foodTypes.map((type) => (
                <WrapItem key={type}>
                  <Tag
                    size='lg'
                    borderRadius='full'
                    variant='solid'
                    colorScheme='blue'
                  >
                    <TagLabel>{type}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
            <Input
              placeholder="Add new food type"
              mt={2}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Minimum Quantity (kg)</FormLabel>
            <Select defaultValue="5">
              <option value="1">1 kg</option>
              <option value="5">5 kg</option>
              <option value="10">10 kg</option>
              <option value="20">20 kg</option>
              <option value="50">50 kg</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Maximum Distance</FormLabel>
            <Select defaultValue="10">
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
            </Select>
          </FormControl>
        </VStack>
      </Box>

      <Divider my={8} />

      {/* Schedule Preferences */}
      <Box mb={8}>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Schedule Preferences
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <FormControl>
            <FormLabel>Preferred Pickup Days</FormLabel>
            <Select defaultValue="weekdays">
              <option value="weekdays">Weekdays Only</option>
              <option value="weekends">Weekends Only</option>
              <option value="all">All Days</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Preferred Time Slot</FormLabel>
            <Select defaultValue="morning">
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </Select>
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>Available for Emergency Pickups</FormLabel>
            <Switch colorScheme='blue' defaultChecked />
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>Accept Holiday Deliveries</FormLabel>
            <Switch colorScheme='blue' />
          </FormControl>
        </SimpleGrid>
      </Box>

      {/* Save Button */}
      <HStack justify="flex-end" mt={8}>
        <Button
          colorScheme="gray"
          mr={3}
        >
          Reset to Default
        </Button>
        <Button
          colorScheme="blue"
        >
          Save Preferences
        </Button>
      </HStack>
    </Card>
  );
} 