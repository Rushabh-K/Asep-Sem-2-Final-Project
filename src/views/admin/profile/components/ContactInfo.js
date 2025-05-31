import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { MdPhone, MdEmail, MdLocationOn, MdPerson, MdBusinessCenter } from "react-icons/md";

export default function ContactInfo() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <Card>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
        Contact Information
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Manage your contact details and communication preferences
      </Text>

      {/* Primary Contact */}
      <Box mb={8}>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Primary Contact
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <HStack spacing={4} align="flex-start">
            <Icon as={MdPerson} w={6} h={6} color={brandColor} />
            <VStack align="start" spacing={1}>
              <Text fontWeight="500">Contact Person</Text>
              <Text color={textColorSecondary}>Rushabh Kalme</Text>
            </VStack>
          </HStack>

          <HStack spacing={4} align="flex-start">
            <Icon as={MdPhone} w={6} h={6} color={brandColor} />
            <VStack align="start" spacing={1}>
              <Text fontWeight="500">Phone Number</Text>
              <Text color={textColorSecondary}>(555) 123-4567</Text>
            </VStack>
          </HStack>

          <HStack spacing={4} align="flex-start">
            <Icon as={MdEmail} w={6} h={6} color={brandColor} />
            <VStack align="start" spacing={1}>
              <Text fontWeight="500">Email Address</Text>
              <Text color={textColorSecondary}>rushabh.kalme@freshfoods.com</Text>
            </VStack>
          </HStack>

          <HStack spacing={4} align="flex-start">
            <Icon as={MdBusinessCenter} w={6} h={6} color={brandColor} />
            <VStack align="start" spacing={1}>
              <Text fontWeight="500">Organization</Text>
              <Text color={textColorSecondary}>Fresh Foods Market</Text>
            </VStack>
          </HStack>
        </SimpleGrid>
      </Box>

      <Divider my={8} />

      {/* Location Information */}
      <Box mb={8}>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Location Details
        </Text>
        <HStack spacing={4} align="flex-start">
          <Icon as={MdLocationOn} w={6} h={6} color={brandColor} />
          <VStack align="start" spacing={1}>
            <Text fontWeight="500">Address</Text>
            <Text color={textColorSecondary}>123 Market St</Text>
            <Text color={textColorSecondary}>San Francisco, CA 94105</Text>
          </VStack>
        </HStack>
      </Box>

      <Divider my={8} />

      {/* Update Contact Form */}
      <Box>
        <Text color={textColorPrimary} fontSize='lg' fontWeight='500' mb={4}>
          Update Contact Information
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <FormControl>
            <FormLabel>Contact Person</FormLabel>
            <Input placeholder="Enter contact person name" />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="Enter phone number" />
          </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder="Enter email address" />
          </FormControl>

          <FormControl>
            <FormLabel>Organization</FormLabel>
            <Input placeholder="Enter organization name" />
          </FormControl>

          <FormControl gridColumn={{ md: "span 2" }}>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Enter street address" mb={2} />
            <SimpleGrid columns={2} gap={2}>
              <Input placeholder="City" />
              <Input placeholder="State" />
            </SimpleGrid>
          </FormControl>
        </SimpleGrid>

        <Button
          mt={6}
          colorScheme="blue"
          size="lg"
          w={{ base: "100%", md: "auto" }}
        >
          Update Contact Information
        </Button>
      </Box>
    </Card>
  );
} 