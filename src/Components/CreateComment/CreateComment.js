import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Select,
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";

function CreateComent() {
  const [name, setName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [select, setSelect] = useState(1);
  const [text, setText] = useState("");

  function handleHotelName(e) {
    setHotelName(e.target.name);
  }
  function handleName(e) {
    setName(e.target.name);
  }
  function handleSelect(e) {
    setSelect(e.target.name);
  }
  function handleComment(e) {
    setText(e.target.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Box>
      <Heading color="teal" mt="20px" mb="40px">
        {" "}
        How was your experience with us ?
      </Heading>
      <Text as="i" fontSize="xl" mr="39%">
        {" "}
        Our clients deserve the best, that`s why we want to know about your
        experience with us
      </Text>
      <Grid templateColumns="1fr 1fr">
        <Box mt="20px">
          <Card mt="20px" ml="40px">
            <CardBody alignItems="center" justifyContent="center">
              <FormControl isRequired onSubmit={(e) => handleSubmit(e)}>
                <FormLabel ml="25px"> First Name </FormLabel>
                <Input
                  onChange={(e) => handleName(e)}
                  mr="50%"
                  width="38%"
                  placeholder="First Name"
                />
                <FormLabel mt="20px" ml="25px">
                  Hotel
                </FormLabel>
                <Input
                  onChange={(e) => handleHotelName(e)}
                  mr="50%"
                  width="38%"
                  placeholder="Hotel Name"
                ></Input>
                <Select
                  onSelect={handleSelect}
                  width="70%"
                  mt="30px"
                  ml="35px"
                  mb="40px"
                >
                  <option>We want you to rate us!</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
                <Text mt="60px" mr="80%" as="i">
                  {" "}
                  Comments :{" "}
                </Text>
                <Input
                  onChange={() => handleComment()}
                  ml="10px"
                  mt="20px"
                  type="textarea"
                ></Input>
                <Button type="submit" color="teal">
                  Submit
                </Button>
              </FormControl>
            </CardBody>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
}

export default CreateComent;
