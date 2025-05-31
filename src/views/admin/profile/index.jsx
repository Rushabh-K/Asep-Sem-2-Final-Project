// Chakra imports
import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import DonationHistory from "views/admin/profile/components/DonationHistory";
import ContactInfo from "views/admin/profile/components/ContactInfo";
import PreferenceSettings from "views/admin/profile/components/PreferenceSettings";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Profile() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Profile Banner */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Rushabh Kalme'
          role='Food Donor'
          organization='Fresh Foods Market'
          location='San Francisco, CA'
          email='rushabh.kalme@freshfoods.com'
        />
      </Grid>

      {/* Profile Content */}
      <Box mt="20px">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="20px">
            <Tab>Personal Info</Tab>
            <Tab>Donation History</Tab>
            <Tab>Contact Details</Tab>
            <Tab>Preferences</Tab>
          </TabList>

          <TabPanels>
            {/* Personal Information */}
            <TabPanel>
              <General />
            </TabPanel>

            {/* Donation History */}
            <TabPanel>
              <DonationHistory />
            </TabPanel>

            {/* Contact Information */}
            <TabPanel>
              <ContactInfo />
            </TabPanel>

            {/* Preferences */}
            <TabPanel>
              <PreferenceSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
