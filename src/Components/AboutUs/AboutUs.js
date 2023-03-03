import React from "react";
import { Image, Box, Grid, Text, Icon, Link } from "@chakra-ui/react";
import jujuy from "../../images/jujuy.jpg";
import atardecer from "../../images/atardecer.jpg";

import { RiFacebookCircleFill, RiTwitterFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

function AboutUs() {
  return (
    <Box position="relative">
      {" "}
      <Box
        height="400px"
        background={`url('${jujuy}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          position="relative"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="6xl"
          fontWeight="bold"
          color="white"
          mr="75%"
        >
          {" "}
          What is Iberá ?{" "}
        </Text>
      </Box>
      <Box height="2px" width="50%" ml="25%" backgroundColor="teal" mt="20px" />
      <Box mt="40px" mb="50px">
        <Text fontSize="2xl" color="teal" as="b">
          We’re glad you asked
        </Text>

        <Text mt="20px" width="70%" ml="300px">
          Iberá Hotels offers its guests beautiful places to stay, travel and
          work abroad indefinitely. In addition, we use our in-depth local
          knowledge to continuously create authentic activities and experiences
          in more than 20 destinations around the country. From the heart of the
          urban centers to the depths of the Perito Moreno Glacier , we put soul
          and heart to introduce nomads, those who take a break and those who
          prefer to stay inside with a new and exciting way to explore the world
        </Text>
      </Box>
      <Box height="2px" width="50%" ml="25%" backgroundColor="teal" mt="20px" />
      <Grid templateColumns="1fr 1fr">
        <Box mt="70px" ml="50px">
          <Box mb="40px" mt="40px">
            <Text as="b" fontSize="3xl" ml="100px" color="teal">
              WORK, STAY, EXPLORE, COWORK
            </Text>
          </Box>

          <Text ml="60px" mb="30px">
            Building one of the largest hospitality brands in the world with one
            of the fastest conversion models globally. Blending beautifully
            designed accommodation with coworking, recreation, wellness, and
            local experiences, Selina is custom-built for today’s nomadic
            traveler, providing guests with a global infrastructure to travel
            and work abroad seamlessly.
          </Text>
          <Text as="b" color="teal" mt="70px" display="flow">
            Contact Us !{" "}
          </Text>
          <Link>
            <Icon ml="20px" fontSize="2em" as={RiFacebookCircleFill}></Icon>
          </Link>
          <Link>
            <Icon ml="20px" fontSize="2em" as={RiTwitterFill}></Icon>
          </Link>
          <Link>
            <Icon ml="20px" fontSize="2em" as={BsInstagram}></Icon>
          </Link>
        </Box>
        <Box mt="60px" ml="150px" mr="30px" boxSize="600px">
          <Image padding="10px" src={atardecer} />
        </Box>
      </Grid>
      <Box mb="50px" height="2px" width="50%" ml="25%" backgroundColor="teal" />
    </Box>
  );
}

export default AboutUs;
