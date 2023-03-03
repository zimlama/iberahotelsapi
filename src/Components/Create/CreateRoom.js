import axios from "axios";
import {
  Box, Button, FormHelperText,
  FormControl, FormLabel, Input,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const { REACT_APP_GET_ALL_USERS, REACT_APP_CREATE_ROOMS, REACT_APP_FRONT } = process.env;


function CreateRoom() {

  const [logUser, setLogUser] = useState("users")
  // #13 76.10 src/Components/Create/CreateRoom.js
  // ﻿#13 76.10   Line 15:34:  'isLoading' is assigned a value but never used  no-unused-vars
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [input, setInput] = useState({
    name: "",
    bed_quantity: "",
    description: "",
    price: "",
    idHotels: ""
  })

  if (!document.cookie) {
    window.location.href = REACT_APP_FRONT
  };

  if (isAuthenticated) {

    if (logUser === "users") {

      setLogUser("")

      axios.get(REACT_APP_GET_ALL_USERS)
        .then((res) => {
          console.log("get axios", res.data)

          const logUser = res.data.find((u) => {
            return u.email === user.email
          })

          if (res.data) {
            if (logUser.privilige !== true) {
              window.location.href = REACT_APP_FRONT
            };
          };
        })
        .catch((err) => console.log(err));

    }

    function handleChange(e) {

      console.log(input)

      setInput({
        ...input,
        [e.target.name]: e.target.value
      })

    }

    function handleSubmit(e) {

      e.preventDefault()

      if (errorBsuccessful && errorDsuccessful && errorIdSuccessful && errorNsuccessful
        && errorPsuccessful) {

        if (input.name && input.bed_quantity && input.price && input.description) {

          axios.post(`${REACT_APP_CREATE_ROOMS}`, input)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))


          alert("room crated")

          setInput({
            name: "",
            bed_quantity: "",
            description: "",
            price: "",
            idHotels: ""
          })

        } else {

          alert("Error missing send mandatory data")

        }

      } else {

        alert("Error missing send mandatory data")

      }

    };


    if (input.idHotels.length >= 3) {
      var errorIdSuccessful = "error"
    };


    if (input.name.length >= 3) {
      var errorNsuccessful = "error"
    };

    if (input.description.length >= 3) {
      var errorDsuccessful = "error"
    };

    if (input.price.length === 3 && !isNaN(input.price)) {
      var errorPsuccessful = "error"
    };

    if (input.bed_quantity.length === 1 && !isNaN(input.bed_quantity) &&
      input.bed_quantity > 0 && input.bed_quantity < 6) {
      var errorBsuccessful = "error"
    };

    return (

      <div>

        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={400}
          p={6}
          m="10px auto"
          as="form"
        >

          <FormControl>

            <FormLabel>idHotels</FormLabel>
            <Input type='text' value={input.idHotels} name="idHotels" onChange={handleChange} borderWidth='3px' />
            {!errorIdSuccessful ? (
              <FormHelperText>
                Name should have 3 letters.
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
            {errorIdSuccessful ? (
              <FormHelperText color="red" className="letter" fontWeight='bold'>
                Successful
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}

            <FormLabel>Name</FormLabel>
            <Input type='text' value={input.name} name="name" onChange={handleChange} borderWidth='3px' />
            {!errorNsuccessful ? (
              <FormHelperText>
                Name should have 3 letters.
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
            {errorNsuccessful ? (
              <FormHelperText color="red" className="letter" fontWeight='bold'>
                Successful
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}

            <FormLabel>Bed_quantity</FormLabel>
            <Input type='text' value={input.bed_quantity} name="bed_quantity" onChange={handleChange} borderWidth='3px' />
            {!errorBsuccessful ? (
              <FormHelperText>
                Bed_quantity should have 1 number.
                Less than 6 and greater than 0
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
            {errorBsuccessful ? (
              <FormHelperText color="red" className="letter" fontWeight='bold'>
                Successful
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}

            <FormLabel>Description</FormLabel>
            <Input type='text' value={input.description} name="description" onChange={handleChange} borderWidth='3px' />
            {!errorDsuccessful ? (
              <FormHelperText>
                Description should have 3 letters.
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
            {errorDsuccessful ? (
              <FormHelperText color="red" className="letter" fontWeight='bold'>
                Successful
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}

            <FormLabel>Price</FormLabel>
            <Input type='text' value={input.price} name="price" onChange={handleChange} borderWidth='3px' />
            {!errorPsuccessful ? (
              <FormHelperText>
                Price can only have numbers.
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
            {errorPsuccessful ? (
              <FormHelperText color="red" className="letter" fontWeight='bold'>
                Successful
              </FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}

          </FormControl>

          <Button onClick={handleSubmit}>Submit</Button>

        </Box>

      </div>
    );

  } else {

    return (

      <div>
        Loading....
      </div>

    );

  };

};

export default CreateRoom;
