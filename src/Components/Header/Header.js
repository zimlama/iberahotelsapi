import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Link,
  HStack,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,

  PopoverArrow,
} from "@chakra-ui/react";
import logo from "../../images/ibera.jpeg";
import Icon from "@chakra-ui/icon";
import { RiLuggageCartLine } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const { REACT_APP_POST_USERS, REACT_APP_GET_ALL_USERS } = process.env;

function Header() {
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post(REACT_APP_POST_USERS, { email: email })
        .then((res) => console.log("post axios", res))
        .catch((err) => console.log(err));
    }
  });

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [admin, setAdmin] = useState("");

  if (isAuthenticated) {
    var status;
    var name = user.name;
    var email = user.email;

    axios
      .get(REACT_APP_GET_ALL_USERS)
      .then((res) => {
        console.log("get axios", res.data);
        status = res.data.find((u) => {
          return u.email === user.email;
        });

        if (status.privilige === true) {
          setAdmin("admin");
        }

        if (status.status === "disabled") {
          logout();
          window.alert("User disable");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0.9rem"
        bg="white"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Link href="/">
            <Image
              borderRadius="full"
              boxSize="80px"
              src={logo}
              alt="logo"
              ml="25px"
            />
          </Link>
        </Flex>

        <Box color="teal">
          <HStack spacing="30px">
            <Popover trigger="hover">
              <PopoverTrigger>
                <Link fontSize={18} href="/destinations">
                  Destinations
                </Link>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />

                <PopoverHeader>
                  <Link href="/destinations">Reserve Now!</Link>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            {/* <Link fontSize={18} ml="10px" href="/reserve">
              Reserve Now!
            </Link> */}
            <Link fontSize={18} href="/activities">
              Local Experiences
            </Link>

            <Link fontSize={18} href="/aboutus">
              About Us{" "}
            </Link>

            <Link href="/shoppingcart">
              <Icon href="#" as={RiLuggageCartLine} boxSize={7} />
            </Link>

            {isLoading ? (
              <Button colorScheme="teal" variant="outline">
                Loading...
              </Button>
            ) : (
              <div></div>
            )}

            {isAuthenticated && admin ? (

              <Popover trigger="hover">

                <PopoverTrigger>
                  <Link color="red" fontSize={18}>
                    Admin{" "}
                  </Link>
                </PopoverTrigger>

                <PopoverContent>

                  <PopoverHeader>
                    <Link color="red" fontSize={18} href="/delete">
                      Delete / Disable{" "}
                    </Link>
                  </PopoverHeader>

                  <PopoverHeader>
                    <Link color="red" fontSize={18} href="/createHotel">
                      Create Hotel{" "}
                    </Link>
                  </PopoverHeader>

                  <PopoverHeader>
                    <Link color="red" fontSize={18} href="/createRoom">
                      Create Room{" "}
                    </Link>
                  </PopoverHeader>

                  <PopoverHeader>
                    <Link color="red" fontSize={18} href="/modify">
                      Modify{" "}
                    </Link>
                  </PopoverHeader>

                </PopoverContent>

              </Popover>

            ) : (
              <div></div>
            )}

            {!isAuthenticated ? (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            ) : (
              <div></div>
            )}


            {isAuthenticated ? (

              <Popover trigger="hover">

                <PopoverTrigger>

                  <Button colorScheme="teal" variant="outline">
                    {name}
                  </Button>

                </PopoverTrigger>

                <PopoverContent>

                  <PopoverHeader>
                    <Link color="teal" fontSize={18} href="/profile">
                      My profile{" "}
                    </Link>
                  </PopoverHeader>

                  <PopoverHeader>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={() =>
                        logout({ logoutParams: { returnTo: window.location.origin } })
                      }>
                      Logout
                    </Button>
                  </PopoverHeader>

                </PopoverContent>

              </Popover>


            ) : (
              <div></div>
            )}

          </HStack>
        </Box>
      </Flex>
    </div>
  );
}

export default Header;
