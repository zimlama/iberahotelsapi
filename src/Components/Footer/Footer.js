import React from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import logo from "../../images/ibera.jpeg";
import { Icon, Link } from "@chakra-ui/react";
import { RiFacebookCircleFill, RiTwitterFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <div>
      <Box backgroundColor="grey" opacity="0.5" mt="30px">
        <Flex align="flex-start" justify="flex-start">
          <Image
            src={logo}
            boxSize="150px"
            borderRadius="full"
            ml="10px"
            alt="logo"
          />
        </Flex>
        <Box>
          <Text mb="10px" color="black" mr="19px">
            {" "}
            Find Us
            <Link href="#">
              <Icon mr="10px" fontSize="3em" as={RiFacebookCircleFill}></Icon>
            </Link>
            <Link href="#">
              <Icon mr="10px" fontSize="3em" as={RiTwitterFill}></Icon>
            </Link>
            <Link href="#">
              <Icon mr="10px" fontSize="3em" as={BsInstagram}></Icon>
            </Link>
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
