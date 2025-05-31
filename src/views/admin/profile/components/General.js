// Chakra imports
import { SimpleGrid, Text, useColorModeValue, Box, Select } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  const [userType, setUserType] = useState('donor'); // or 'receiver'

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const donorFields = (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
      <Information
        boxShadow={cardShadow}
        title='Business Type'
        value='Restaurant'
      />
      <Information
        boxShadow={cardShadow}
        title='Food Categories'
        value='Fresh Produce, Prepared Meals'
      />
      <Information
        boxShadow={cardShadow}
        title='Donation Frequency'
        value='Daily'
      />
      <Information
        boxShadow={cardShadow}
        title='Operating Hours'
        value='9:00 AM - 10:00 PM'
      />
      <Information
        boxShadow={cardShadow}
        title='Storage Facilities'
        value='Refrigerated, Dry Storage'
      />
      <Information
        boxShadow={cardShadow}
        title='Food Safety Certification'
        value='ServSafe Certified'
      />
      <Information
        boxShadow={cardShadow}
        title='Preferred Pickup Times'
        value='After 9:00 PM'
      />
      <Information
        boxShadow={cardShadow}
        title='Tax ID'
        value='XX-XXXXXXX'
      />
    </SimpleGrid>
  );

  const receiverFields = (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
      <Information
        boxShadow={cardShadow}
        title='Organization Type'
        value='Food Bank'
      />
      <Information
        boxShadow={cardShadow}
        title='Service Area'
        value='San Francisco Bay Area'
      />
      <Information
        boxShadow={cardShadow}
        title='People Served'
        value='500+ weekly'
      />
      <Information
        boxShadow={cardShadow}
        title='Storage Capacity'
        value='2000 sq ft'
      />
      <Information
        boxShadow={cardShadow}
        title='Food Preferences'
        value='All Types'
      />
      <Information
        boxShadow={cardShadow}
        title='Pickup Capability'
        value='Own Vehicle Fleet'
      />
      <Information
        boxShadow={cardShadow}
        title='Operating Hours'
        value='8:00 AM - 6:00 PM'
      />
      <Information
        boxShadow={cardShadow}
        title='Non-Profit Status'
        value='501(c)(3)'
      />
    </SimpleGrid>
  );

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Box mb={6}>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Profile Information
        </Text>
        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
          Manage your profile information and preferences to help us better coordinate food donations and pickups.
        </Text>
        <Select 
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
          mb={4}
          width="200px"
        >
          <option value="donor">Donor Profile</option>
          <option value="receiver">Receiver Profile</option>
        </Select>
      </Box>

      {/* Common Fields */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb={6}>
        <Information
          boxShadow={cardShadow}
          title='Full Name'
          value='Rushabh Kalme'
        />
        <Information
          boxShadow={cardShadow}
          title='Organization'
          value='Fresh Foods Market'
        />
        <Information
          boxShadow={cardShadow}
          title='Contact Email'
          value='rushabh.kalme@freshfoods.com'
        />
        <Information
          boxShadow={cardShadow}
          title='Phone'
          value='(555) 123-4567'
        />
        <Information
          boxShadow={cardShadow}
          title='Address'
          value='123 Market St, San Francisco, CA'
        />
        <Information
          boxShadow={cardShadow}
          title='Registration Date'
          value='January 15, 2024'
        />
      </SimpleGrid>

      {/* Role-specific Fields */}
      {userType === 'donor' ? donorFields : receiverFields}
    </Card>
  );
}
