// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdAccessTime } from "react-icons/md";
import React from "react";

export default function FoodTasks(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex alignItems='center' w='100%' mb='30px'>
        <IconBox
          me='12px'
          w='38px'
          h='38px'
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w='24px' h='24px' />}
        />

        <Text color={textColor} fontSize='lg' fontWeight='700'>
          Upcoming Pickups
        </Text>
        <Menu ms='auto' />
      </Flex>
      
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Box>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='md'
              textAlign='start'>
              Fresh Vegetables Pickup
            </Text>
            <Text fontSize='sm' color='gray.500'>Today at 2:00 PM</Text>
          </Box>
          <Badge ml='auto' colorScheme='green'>Urgent</Badge>
        </Flex>
        
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Box>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='md'
              textAlign='start'>
              Bakery Items Collection
            </Text>
            <Text fontSize='sm' color='gray.500'>Tomorrow at 9:00 AM</Text>
          </Box>
          <Badge ml='auto' colorScheme='blue'>Scheduled</Badge>
        </Flex>
        
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Box>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='md'
              textAlign='start'>
              Dairy Products Delivery
            </Text>
            <Text fontSize='sm' color='gray.500'>Tomorrow at 4:00 PM</Text>
          </Box>
          <Badge ml='auto' colorScheme='purple'>Pending</Badge>
        </Flex>
        
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Box>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='md'
              textAlign='start'>
              Non-Perishable Items
            </Text>
            <Text fontSize='sm' color='gray.500'>In 2 days</Text>
          </Box>
          <Badge ml='auto' colorScheme='orange'>Upcoming</Badge>
        </Flex>
    </Card>
  );
}
