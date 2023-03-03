import React, { useEffect } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cleanLocalStorage } from "./cleanLocal";

export const Pending = () => {
  useEffect(() => {
    cleanLocalStorage();
  }, []);

  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Box
        marginTop={"10rem"}
        marginBottom={"10rem"}
        backgroundColor={"teal"}
        opacity={"0.8"}
        width={"40rem"}
        height={"20rem"}
        borderRadius={"1rem"}
        color={"black"}
      >
        <Heading marginTop={"3.2rem"}>
          Your purchase is in pending status!
        </Heading>
        <Text padding={"1rem"}>Contact your bank for more info</Text>
        <Text>or contact us for support</Text>

        <Text padding={"1rem"}>Iberá Hotels</Text>
        <Link to={"/"}>
          <Button>Go to home</Button>
        </Link>
      </Box>
    </Flex>
  );
};
