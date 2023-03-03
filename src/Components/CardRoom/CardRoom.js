import React from "react";
import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";

function CardRoom(props) {
  return (
    <div className="home-card">
      <Card
        maxW="sm"
        _hover={{
          bg: "green.500",
          transform: "scale(0.95)",
        }}
      >
        <CardBody>
          <Image
            src={props.img}
            alt="Green double couch with wooden legs"
            borderRadius="9px"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.name}</Heading>
            <Text>City: {props.city}</Text>
            <Text>Rating: {props.rating}</Text>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardRoom;
