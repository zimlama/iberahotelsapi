import React, { useEffect } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cleanLocalStorage } from "./cleanLocal";

export const Error = () => {
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
        <Heading marginTop={"3.5rem"}>Ups! </Heading>
        <Text padding={"1rem"}>
          something goes wrong with the payment process
        </Text>
        <Text>try again later or contact us for support</Text>

        <Text padding={"1rem"}>Iberá Hotels</Text>
        <Link to={"/"}>
          <Button>Go to home</Button>
        </Link>
      </Box>
    </Flex>
  );
};
