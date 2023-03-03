import React, { useEffect } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cleanLocalStorage } from "./cleanLocal";

export const Success = () => {
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
        height={"25rem"}
        borderRadius={"1rem"}
        color={"black"}
      >
        <Heading marginTop={"3.5rem"}>Purchase Complete! </Heading>
        <Text padding={"1rem"}>
          In a moment you will recieve an email with the
        </Text>
        <Text padding={"1rem"}>details of your reservation</Text>
        <Text>Thank you for trusting us "</Text>

        <Text padding={"1rem"}>Iberá Hotels</Text>
        <Link to={"/"}>
          <Button>Go to home</Button>
        </Link>
      </Box>
    </Flex>
  );
};
