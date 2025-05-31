// Chakra Imports
import { Button, Icon, useColorMode } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import React from "react";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      {...rest}
      h='50px'
      w='50px'
      zIndex='99'
      bg={colorMode === "light" ? "blue.500" : "blue.200"}
      position='fixed'
      variant='solid'
      left={document.documentElement.dir === "rtl" ? "35px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "35px"}
      bottom='30px'
      borderRadius='full'
      onClick={toggleColorMode}
      display='flex'
      p='0px'
      align='center'
      justify='center'
      _hover={{
        bg: colorMode === "light" ? "blue.600" : "blue.300"
      }}
      _active={{
        bg: colorMode === "light" ? "blue.700" : "blue.400"
      }}>
      <Icon
        h='20px'
        w='20px'
        color='white'
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
