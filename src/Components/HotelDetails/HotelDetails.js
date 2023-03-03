import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Redux/actions";

import {
  Grid,
  Heading,
  Image,
  Text,
  Icon,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { FiWifi } from "react-icons/fi";
import { GiTowel, GiDesk } from "react-icons/gi";
import { MdShower, MdChair } from "react-icons/md";
import { RiStarFill } from "react-icons/ri";

import DetailsRoom from "../DetailsRoom/DetailsRoom";

const { getHotelById, getAmenities } = allActions;

function HotelDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const stars = [];

  const dtHotel = useSelector((state) => state.hotelDetails);

  for (let i = 0; i < dtHotel.stars; i++) {
    stars.push(<Icon key={i} as={RiStarFill} />);
  }

  useEffect(() => {
    dispatch(getHotelById(id));
    dispatch(getAmenities());
  }, [dispatch, id]);

  return (
    <Box>
      <Grid templateColumns="1fr 1fr">
        <Box>
          <Heading color="teal" size="xl" mt="30px">
            {dtHotel.city}
          </Heading>
          <Text py="12">
            {dtHotel.name}
            {stars && <Text fontSize={20}> {stars} Stars Quality </Text>}{" "}
          </Text>
          <Flex display="inline-flex">
            <Text as="b" fontSize="xl" mb="30px" mr="30px" ml="30px">
              Amenities
            </Text>

            <Icon ml="10px" boxSize={7} as={GiTowel}></Icon>
            <Icon ml="10px" boxSize={7} as={GiDesk}></Icon>
            <Icon ml="10px" boxSize={7} as={MdChair}></Icon>
            <Icon ml="10px" boxSize={7} as={MdShower}></Icon>
          </Flex>
          <Box mt="15px">
            <Button boder="solid" color="teal" mr="10px">
              Incredible view
            </Button>
            <Button width="15%" color="teal" mr="10px" rightIcon={FiWifi}>
              Free Wifi
            </Button>
            <Button color="teal" mr="10px">
              Bathtub
            </Button>
            <Button color="teal" mr="10px">
              Gym
            </Button>
          </Box>
        </Box>
        <Box boxSize="60%" ml="80px">
          <Image borderRadius="9px" src={dtHotel.image} />
        </Box>
      </Grid>
      <Box height="2px" width="50%" ml="25%" backgroundColor="teal" mt="20px" />
      <Box mt="20px">
        <Text mr="70%" as="b" fontSize="xl" mt="60px" color="teal" size="4xl">
          Types of Rooms available:{" "}
        </Text>
      </Box>
      <Box mt="30px">
        {dtHotel.rooms &&
          dtHotel.rooms.map((r) => {
            return (
              <DetailsRoom
                bed_quantity={r.bed_quantity}
                description={r.description}
                idRooms={r.idRooms}
                image={r.image}
                name={r.name}
                price={r.price}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default HotelDetails;
