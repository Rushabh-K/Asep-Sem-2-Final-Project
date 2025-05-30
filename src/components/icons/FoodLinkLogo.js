import React from "react";
import { Image } from "@chakra-ui/react";

export function FoodLinkLogo(props) {
  const { w, h, ...rest } = props;
  return (
    <Image
      src="/FoodLink Logo.png"
      alt="FoodLink Logo"
      width={w || "auto"}
      height="135px"
      mt="0"
      mb="0"
      {...rest}
    />
  );
}

export default FoodLinkLogo; 