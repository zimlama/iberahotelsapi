import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  CardFooter,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoBedSharp } from "react-icons/io5";

import allActions from "../../Redux/actions/";
const { takeDate } = allActions;

function DetailsRoom({
  idRooms,
  name,
  bed_quantity,
  description,
  price,
  image,
}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const dates = useSelector((state) => state.dates);
  console.log(dates);

  function restarFechas(fecha1, fecha2) {
    let diferencia = new Date(fecha2).getTime() - new Date(fecha1).getTime();
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  }

  let diferenciaEnDias = restarFechas(dates[0], dates[1]);

  function handleBanana() {
    let room = {
      idRooms: idRooms,
      name: name,
      bed_quantity: bed_quantity,
      price: price,
      image: image,
      quantity: diferenciaEnDias,
    };

    window.localStorage.setItem("roomcart", JSON.stringify(room)); //a localSt solo le podemos enviar strings
    window.localStorage.setItem(
      "totalprice",
      JSON.stringify(room.price * room.quantity)
    );
    return navigate("/shoppingcart");
  }
  const bed_icons = [];
  for (let i = 0; i < bed_quantity; i++) {
    bed_icons.push(<Icon key={i} as={IoBedSharp} />);
  }

  useEffect(() => {
    dispatch(takeDate());
  }, []);

  return (
    <Box mt="20px" padding="20px" boxSize="">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="fill"
          maxW={{ base: "100%", sm: "450px" }}
          mb="40px"
          mt="30px"
          padding="20px"
          ml="10px"
          alt="hotelIbera"
          src={image[0]}
        />

        <Stack>
          <CardBody ml="40px">
            <Heading color="teal" size="md" mr="70%">
              {name}
            </Heading>

            <Text fontSize="xl" py="12" mb="50px">
              Beds quantity <Text color="teal">{bed_icons}</Text>
              <Text mt="10px" fontSize="md">
                {description}
              </Text>
            </Text>
            <Text mr="70%" color="teal" mt="10px">
              {" "}
              Price per night: ${price}
            </Text>
          </CardBody>

          <CardFooter>
            <Button
              ml="70%"
              variant="solid"
              colorScheme="teal"
              onClick={() => handleBanana()}
            >
              Reserve
            </Button>
            <Text>Days: {diferenciaEnDias}</Text>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default DetailsRoom;
