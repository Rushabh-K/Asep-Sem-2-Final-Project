import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
import FoodLinkLogo from "components/icons/FoodLinkLogo";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <FoodLinkLogo h='300px' w='auto' my='32px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
