import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  CardFooter,
  Heading,
  Button,
  Divider,
  Box,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";

function CardHotel({ id, name, city, img, stars, status }) {
  const star = [];
  for (let i = 0; i < stars; i++) {
    star.push(<Icon key={i} as={RiStarFill} />);
  }
  return (
    <HStack display="inline-flex">
      <Box ml="20px" mb="19px">
        <Card maxW="sm">
          <CardBody>
            <Image
              src={img}
              alt="hotelImg"
              borderRadius="lg"
              width="100%"
              height="200px"
              objectFit="cover"
            />
            <Stack mt="6" spacing="3">
              <Heading color="teal" size="md">
                {city}
              </Heading>
              <Text>{name}</Text>
              <Text fontSize="2em" color="teal">
                {" "}
                {star}{" "}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>

            {status === false ?

              <Button variant="solid" colorScheme="teal">
                Disable
              </Button>

              :

              <Link to={`/hotels/${id}`}>
                <Button variant="solid" colorScheme="teal">
                  View more info
                </Button>
              </Link>

            }

          </CardFooter>
        </Card>
      </Box>
    </HStack>
  );
}

export default CardHotel;
