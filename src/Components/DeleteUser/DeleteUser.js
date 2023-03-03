import axios from "axios";
import {
    FormLabel, Select, Input, Box, Stack, Button,
    Alert, AlertIcon, AlertTitle,
    Card, CardBody, Image,
    Heading, Text, Divider
} from '@chakra-ui/react';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const { REACT_APP_GET_ALL_HOTELS, REACT_APP_GET_ALL_USERS, REACT_APP_FRONT,
    REACT_APP_DISABLE_USERS, REACT_APP_DELETE_HOTELS, REACT_APP_DISABLE_HOTELS,
    REACT_APP_DELETE_ROOMS, REACT_APP_DISABLE_ROOMS } = process.env;


function DeleteUser() {

    if (!document.cookie) {
        window.location.href = REACT_APP_FRONT
    };

    const [render, setRender] = useState("");
    const { user, isAuthenticated } = useAuth0();

    const users = [];
    const [state, setState] = useState([]);
    const [state2, setState2] = useState([]);
    const [input, setInput] = useState("");
    const [alert, setAlert] = useState("");
    const [alert2, setAlert2] = useState("");
    const [newUser, setNewUser] = useState("");
    const [cleanUser, setCleanUser] = useState("");

    const hotels = [];
    const [stateHotel, setStateHotel] = useState([]);
    const [state2Hotel, setState2Hotel] = useState([]);
    const [inputHotel, setInputHotel] = useState("");
    const [alertHotel, setAlertHotel] = useState("");
    const [alert2Hotel, setAlert2Hotel] = useState("");
    const [newHotel, setNewHotel] = useState("");
    const [cleanHotel, setCleanHotel] = useState("");

    const rooms = [];
    const [stateRoom, setStateRoom] = useState([]);
    const [state2Room, setState2Room] = useState([]);
    const [inputRoom, setInputRoom] = useState("");
    const [alertRoom, setAlertRoom] = useState("");
    const [alert2Room, setAlert2Room] = useState("");
    const [newRoom, setNewRoom] = useState("");
    const [newRoom2, setNewRoom2] = useState("");
    const [cleanRoom, setCleanRoom] = useState("");

    const onClickUser = (e) => {
        setRender("user")
    };

    const onClickHotel = (e) => {
        setRender("hotel")
    };


    const onClickRoom = (e) => {
        setRender("room")
    };

    const onClickRefresh = (e) => {
        setRender("")
    };

    if (isAuthenticated) {

        axios.get(REACT_APP_GET_ALL_USERS)
            .then((res) => {

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

    };

    if (render === "") {

        return (

            <div>

                <Box
                    borderWidth="1px"
                    rounded="lg"
                    shadow="1px 1px 3px rgba(0,0,0,0.3)"
                    maxWidth={800}
                    p={6}
                    m="10px auto"
                    as="form"
                >

                    <Stack direction='row' spacing={4} align='center'>

                        <Button colorScheme='teal' variant='solid' onClick={onClickUser}>
                            Enable / Disable , User
                        </Button>

                        <Button colorScheme='teal' variant='solid' onClick={onClickHotel}>
                            Delete && Enable / Disable , Hotlel
                        </Button>

                        <Button colorScheme='teal' variant='solid' onClick={onClickRoom}>
                            Delete && Enable / Disable , Room
                        </Button>

                    </Stack>

                </Box >

            </div>

        )

    } else if (render === "user") {

        //------------------Delete User--------------------------------------------------

        if (state.length === 0 || alert2 === "submit") {

            axios.get(REACT_APP_GET_ALL_USERS)
                .then((res) => {

                    for (let i = 0; i < res.data.length; i++) {
                        users.push(res.data[i])

                    }
                    if (users.length) {
                        setState(users);
                    };

                    setAlert2("");
                })
                .catch((err) => console.log(err));

        };

        const handleSelectChange = (e) => {

            const select = document.getElementById('select');

            const StateUser = state.filter((u) => {
                return (u.email === e.target.value)
            });

            setNewUser(StateUser);
            setAlert("");
            setInput(e.target.value);

            select.value = "";
        };

        const handeleEnableDisable = (e) => {

            axios.put(REACT_APP_DISABLE_USERS, { email: newUser[0].email })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));


            setInput("");
            setNewUser("");
            setAlert("submit");
            setAlert2("submit");

        };

        const handleFilter = (e) => {

            e.preventDefault();

            const inputFilter = document.getElementById("input-filter");

            const StateFilter = state.filter((u) => {
                return u.email.toLowerCase().includes(inputFilter.value.toLowerCase())
            });

            if (StateFilter.length) {
                setNewUser(StateFilter);
            };

            setAlert("");

        };

        const handleFilter2 = (e) => {

            const inputFilter = document.getElementById("input-filter");

            setState2([...state].filter((u) => {
                return u.email.toLowerCase().includes(inputFilter.value.toLowerCase())
            }))

            setAlert("");
            setCleanUser("user")
        };

        const HandleCleanUser = (e) => {
            setCleanUser("")
        };

        state.sort((a, b) => {

            if (a.email > b.email) {
                return 1;
            }
            if (b.email > a.email) {
                return -1;
            }
            return 0;
        });

        if (state.length !== 0) {

            return (

                <div>

                    <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        as="form"
                        backgroundColor="#F0F8FF"
                    >

                        {alert ?

                            <Alert
                                status='success'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    User modified!
                                </AlertTitle>
                            </Alert> :

                            <div></div>

                        }

                        <FormLabel>Delete User</FormLabel>

                        <br></br>
                        <br></br>

                        <FormLabel>Find User:</FormLabel>

                        <Input id="input-filter" onChange={handleFilter2} />

                        <br></br>
                        <br></br>

                        {cleanUser ?
                            <div>
                                <Button colorScheme='teal' variant='solid' onClick={HandleCleanUser}>
                                    Clean
                                </Button>
                                <Stack id="stack-Button">

                                    {state2 && state2.map((u) => {
                                        return (
                                            <Button id="button-filter" colorScheme='blue' variant='ghost' onClick={handleFilter}>
                                                {u.email}
                                            </Button>
                                        )
                                    })}

                                </Stack>
                            </div>
                            :
                            <div></div>
                        }



                        <br></br>
                        <br></br>

                        <FormLabel>Select User:</FormLabel>

                        <Select id="select" placeholder='Select-User' borderWidth='3px' maxW='sm' onChange={handleSelectChange}>
                            {state && state.map((u) => {
                                return (
                                    <option>{u.email}</option>
                                )
                            })}
                        </Select>

                        <br></br>
                        <br></br>

                        <FormLabel>User:</FormLabel>

                        <Input type='text' value={input} borderWidth='3px' />

                        <br></br>
                        <br></br>

                        {newUser ?
                            <Box
                                borderWidth="1px"
                                rounded="lg"
                                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                                maxWidth={400}
                                p={6}
                                m="10px auto"
                                as="form"
                            >

                                <Card maxW='sm'>
                                    <CardBody>
                                        <Image
                                            src={newUser[0].image}
                                            alt='User Image'
                                            borderRadius='lg'
                                            maxWidth={200}
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>User Information</Heading>
                                            <Text>
                                                Name: {newUser[0].first_name} {newUser[0].last_name}
                                            </Text>
                                            <Text>
                                                Email: {newUser[0].email}
                                            </Text>
                                            <Text>
                                                Privilage: {newUser[0].privilige === true ? "This user is admin" : "Nomal user"}
                                            </Text>
                                            <Text>
                                                Status: {newUser[0].status}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                </Card>

                                <br></br>

                                <Stack direction='row' spacing={4} align='center'>

                                    {newUser.length > 0 && newUser[0].status === "active" ?

                                        <Button colorScheme='teal' variant='solid' onClick={handeleEnableDisable}>
                                            Disable
                                        </Button> :

                                        <div></div>

                                    }

                                    {newUser.length > 0 && newUser[0].status === "disabled" ?

                                        <Button colorScheme='teal' variant='solid' onClick={handeleEnableDisable}>
                                            Enable
                                        </Button> :

                                        <div></div>

                                    }

                                </Stack>

                            </Box>
                            :
                            <div></div>}

                        <Button colorScheme='teal' variant='solid' onClick={onClickRefresh}>
                            Return
                        </Button>

                    </Box>

                </div>

            )
        }

    } else if (render === "hotel") {

        //------------------Delete Hotel--------------------------------------------------

        if (stateHotel.length === 0 || alert2Hotel === "submit") {

            axios.get(REACT_APP_GET_ALL_HOTELS)
                .then((res) => {

                    for (let i = 0; i < res.data.length; i++) {
                        hotels.push(res.data[i])

                    }
                    if (hotels.length) {
                        setStateHotel(hotels);
                    };

                    setAlert2Hotel("");

                })
                .catch((err) => console.log(err));

        };

        const handleSelectChangeHotel = (e) => {

            const selectHotel = document.getElementById('selec-hotel');

            const StateHotel = stateHotel.filter((h) => {
                return (h.name === e.target.value)
            });

            setNewHotel(StateHotel);
            setAlertHotel("");
            setInputHotel(e.target.value);

            selectHotel.value = "";
        };

        const handleFilterHotel = (e) => {

            e.preventDefault();

            const inputFilterHotel = document.getElementById("input-filter-hotel");

            const StateFilterHotel = stateHotel.filter((h) => {
                return h.name.toLowerCase().includes(inputFilterHotel.value.toLowerCase())
            });

            if (StateFilterHotel.length) {
                setNewHotel(StateFilterHotel);
            };

            setAlertHotel("");

        };

        const handleFilterHotel2 = (e) => {

            const inputFilterHotel = document.getElementById("input-filter-hotel");

            setState2Hotel([...stateHotel].filter((u) => {
                return u.name.toLowerCase().includes(inputFilterHotel.value.toLowerCase())
            }))

            setAlertHotel("");
            setCleanHotel("hotel")

        };

        const HandleCleanHotel = (e) => {
            setCleanHotel("")
        };

        const DeleteHotel = (e) => {

            axios.delete(`${REACT_APP_DELETE_HOTELS}${newHotel[0].idHotels}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));


            setInputHotel("");
            setNewHotel("");
            setAlertHotel("submit");
            setAlert2Hotel("submit");

        };

        const DisableHotel = (e) => {

            axios.put(`${REACT_APP_DISABLE_HOTELS}${newHotel[0].idHotels}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));


            setInputHotel("");
            setNewHotel("");
            setAlertHotel("submit");
            setAlert2Hotel("submit");

        };

        stateHotel.sort((a, b) => {

            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });

        console.log("stateHotel", stateHotel);

        if (stateHotel.length !== 0) {

            return (

                <div>

                    <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        as="form"
                        backgroundColor="#F0F8FF"
                    >

                        {alertHotel ?

                            <Alert
                                status='success'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    Hotel Delete!
                                </AlertTitle>
                            </Alert> :

                            <div></div>

                        }

                        <FormLabel>Delete Hotel</FormLabel>

                        <br></br>
                        <br></br>

                        <FormLabel>Find Hotel:</FormLabel>

                        <Input id="input-filter-hotel" onChange={handleFilterHotel2} />

                        <br></br>
                        <br></br>

                        {cleanHotel ?
                            <div>
                                <Button colorScheme='teal' variant='solid' onClick={HandleCleanHotel}>
                                    Clean
                                </Button>
                                <Stack id="stack-Button-hotel">

                                    {state2Hotel && state2Hotel.map((h) => {
                                        return (
                                            <Button id="button-filter-hotel" colorScheme='blue' variant='ghost' onClick={handleFilterHotel}>
                                                {h.name}
                                            </Button>
                                        )
                                    })}

                                </Stack>
                            </div>
                            :
                            <div></div>
                        }



                        <br></br>
                        <br></br>

                        <FormLabel>Select Hotel:</FormLabel>

                        <Select id="selec-hotel" placeholder='Select-Hotel' borderWidth='3px' maxW='sm' onChange={handleSelectChangeHotel}>
                            {stateHotel && stateHotel.map((h) => {
                                return (
                                    <option>{h.name}</option>
                                )
                            })}
                        </Select>

                        <br></br>
                        <br></br>

                        <FormLabel>Hotel:</FormLabel>

                        <Input type='text' value={inputHotel} borderWidth='3px' />

                        <br></br>
                        <br></br>

                        {newHotel ?
                            <Box
                                borderWidth="1px"
                                rounded="lg"
                                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                                maxWidth={400}
                                p={6}
                                m="10px auto"
                                as="form"
                            >

                                <Card maxW='sm'>
                                    <CardBody>
                                        <Image
                                            src={newHotel[0].image}
                                            alt='Hotel Image'
                                            borderRadius='lg'
                                            maxWidth={200}
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>Hotle Information</Heading>
                                            <Text>
                                                Name: {newHotel[0].name}
                                            </Text>
                                            <Text>
                                                City: {newHotel[0].city}
                                            </Text>
                                            <Text>
                                                Address: {newHotel[0].address}
                                            </Text>
                                            <Text>
                                                Description: {newHotel[0].description}
                                            </Text>
                                            <Text>
                                                Stars: {newHotel[0].stars}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                </Card>

                                <br></br>

                                <Stack direction='row' spacing={4} align='center'>

                                    {newHotel.length > 0 && newHotel[0].status === true ?

                                        <Button colorScheme='teal' variant='solid' onClick={DisableHotel}>
                                            Disable
                                        </Button> :

                                        <div></div>

                                    }

                                    {newHotel.length > 0 && newHotel[0].status === false ?

                                        <Button colorScheme='teal' variant='solid' onClick={DisableHotel}>
                                            Enable
                                        </Button> :

                                        <div></div>

                                    }

                                    <Button colorScheme='teal' variant='solid' onClick={DeleteHotel}>
                                        Delete Hotlel
                                    </Button>

                                </Stack>

                            </Box>
                            :
                            <div></div>}

                        <Button colorScheme='teal' variant='solid' onClick={onClickRefresh}>
                            Return
                        </Button>

                    </Box>

                </div>

            )
        }

    } else if (render === "room") {

        //------------------Delete Room--------------------------------------------------

        if (stateRoom.length === 0 || alert2Room === "submit") {

            axios.get(REACT_APP_GET_ALL_HOTELS)
                .then((res) => {

                    for (let i = 0; i < res.data.length; i++) {
                        rooms.push(res.data[i])

                    }
                    if (rooms.length) {
                        setStateRoom(rooms);
                    };

                    setAlert2Room("");

                    console.log(stateRoom)
                })
                .catch((err) => console.log(err));

        };

        const handleSelectChangeRoom = (e) => {

            const selectRoom = document.getElementById('selec-room');

            const StateRoom = stateRoom.filter((h) => {
                return (h.name === e.target.value)
            });

            setNewRoom(StateRoom);
            setAlertRoom("");
            setInputRoom(e.target.value);

            selectRoom.value = "";
        };

        const handleSelectChangeRoom2 = (e) => {

            const selectRoom2 = document.getElementById('selec-room-2');

            const StateRoom2 = newRoom[0].rooms.filter((r) => {
                return (r.name === e.target.value)
            });

            setNewRoom2(StateRoom2);

            selectRoom2.value = "";
        };

        const onClickSelect = (e) => {

            if (setNewRoom2) {
                setNewRoom2("")
            } else {

                console.log("hola")
            }

        };

        const handleFilterRoom = (e) => {

            e.preventDefault();

            const inputFilterRoom = document.getElementById("input-filter-room");

            const StateFilterRoom = stateRoom.filter((h) => {
                return h.name.toLowerCase().includes(inputFilterRoom.value.toLowerCase())
            });

            if (StateFilterRoom.length) {
                setNewRoom(StateFilterRoom);
            };

            setAlertRoom("");

        };

        const handleFilterRoom2 = (e) => {

            const inputFilterRoom = document.getElementById("input-filter-room");

            setState2Room([...stateRoom].filter((u) => {
                return u.name.toLowerCase().includes(inputFilterRoom.value.toLowerCase())
            }))

            setAlertRoom("");
            setCleanRoom("hotel");

        };

        const HandleCleanRoom = (e) => {
            setCleanRoom("")
        };

        const DeleteRoom = (e) => {

            axios.delete(`${REACT_APP_DELETE_ROOMS}${newRoom2[0].idRooms}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));


            setInputRoom("");
            setNewRoom("");
            setNewRoom2("");
            setAlertRoom("submit");
            setAlert2Room("submit");

        };

        const DisableRoom = (e) => {

            axios.put(`${REACT_APP_DISABLE_ROOMS}${newRoom2[0].idRooms}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));

            setInputRoom("");
            setNewRoom("");
            setNewRoom2("");
            setAlertRoom("submit");
            setAlert2Room("submit");

        };

        state2Room.sort((a, b) => {

            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });

        if (newRoom) {
            console.log("newRoom", newRoom)
            console.log("newRoom", newRoom[0].rooms)
        };

        if (newRoom2) {
            console.log("newRoom2", newRoom2)
        };

        stateRoom.sort((a, b) => {

            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });

        if (newRoom) {

            newRoom[0].rooms.sort((a, b) => {

                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            });

        }

        if (stateRoom.length !== 0) {

            return (

                <div>


                    <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="1px 1px 3px rgba(0,0,0,0.3)"
                        maxWidth={800}
                        p={6}
                        m="10px auto"
                        as="form"
                        backgroundColor="#F0F8FF"
                    >

                        {alertRoom ?

                            <Alert
                                status='success'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    Room Delete!
                                </AlertTitle>
                            </Alert> :

                            <div></div>

                        }

                        <FormLabel>Delete Room</FormLabel>

                        <br></br>
                        <br></br>

                        <FormLabel>Find Hotel:</FormLabel>

                        <Input id="input-filter-room" onChange={handleFilterRoom2} />

                        <br></br>
                        <br></br>

                        {cleanRoom ?
                            <div>
                                <Button colorScheme='teal' variant='solid' onClick={HandleCleanRoom}>
                                    Clean
                                </Button>
                                <Stack id="stack-Button-room">

                                    {state2Room && state2Room.map((r) => {
                                        return (
                                            <Button id="button-filter-room" colorScheme='blue' variant='ghost' onClick={handleFilterRoom}>
                                                {r.name}
                                            </Button>
                                        )
                                    })}

                                </Stack></div>
                            :
                            <div></div>}



                        <br></br>
                        <br></br>

                        <FormLabel>Select Hotel:</FormLabel>

                        <Select id="selec-room" placeholder='Select-Room' borderWidth='3px' maxW='sm' onClick={onClickSelect} onChange={handleSelectChangeRoom}>
                            {stateRoom && stateRoom.map((r) => {
                                return (
                                    <option>{r.name}</option>
                                )
                            })}
                        </Select>

                        <br></br>
                        <br></br>

                        <FormLabel>Hotel:</FormLabel>

                        <Input type='text' value={inputRoom} borderWidth='3px' />

                        <br></br>
                        <br></br>

                        {newRoom ?

                            <Box
                                borderWidth="1px"
                                rounded="lg"
                                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                                maxWidth={400}
                                p={6}
                                m="10px auto"
                                as="form"
                            >

                                <Card maxW='sm'>
                                    <CardBody>
                                        <Image
                                            src={newRoom[0].image}
                                            alt='Hotel Image'
                                            borderRadius='lg'
                                            maxWidth={200}
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>Hotle Information</Heading>
                                            <Text>
                                                Name: {newRoom[0].name}
                                            </Text>
                                            <Text>
                                                City: {newRoom[0].city}
                                            </Text>
                                            <Text>
                                                Address: {newRoom[0].address}
                                            </Text>
                                            <Text>
                                                Description: {newRoom[0].description}
                                            </Text>
                                            <Text>
                                                Stars: {newRoom[0].stars}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                </Card>

                                <br></br>

                                <Select id="selec-room-2" placeholder='Select-Room' borderWidth='3px' maxW='sm'
                                    onChange={handleSelectChangeRoom2}
                                >
                                    {newRoom && newRoom[0].rooms.map((r) => {
                                        return (
                                            <option>{r.name}</option>
                                        )
                                    })}
                                </Select>

                            </Box>
                            :
                            <div></div>}

                        <br></br>

                        {newRoom2 ?

                            <Box
                                borderWidth="1px"
                                rounded="lg"
                                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                                maxWidth={400}
                                p={6}
                                m="10px auto"
                                as="form"
                            >

                                <Card maxW='sm'>
                                    <CardBody>
                                        <Image
                                            src={newRoom2[0].image[0]}
                                            alt='Hotel Image'
                                            borderRadius='lg'
                                            maxWidth={200}
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>Hotle Information</Heading>
                                            <Text>
                                                Name: {newRoom2[0].name}
                                            </Text>
                                            <Text>
                                                Price: {newRoom2[0].price}
                                            </Text>
                                            <Text>
                                                Description: {newRoom2[0].description}
                                            </Text>
                                            <Text>
                                                Bed_quantity: {newRoom2[0].bed_quantity}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                </Card>

                                <br></br>

                                <Stack direction='row' spacing={4} align='center'>

                                    <Button colorScheme='teal' variant='solid' onClick={DeleteRoom}>
                                        Delete Room
                                    </Button>

                                    {newRoom2.length > 0 && newRoom2[0].status === true ?

                                        <Button colorScheme='teal' variant='solid' onClick={DisableRoom}>
                                            Disable
                                        </Button> :

                                        <div></div>

                                    }

                                    {newRoom2.length > 0 && newRoom2[0].status === false ?

                                        <Button colorScheme='teal' variant='solid' onClick={DisableRoom}>
                                            Enable
                                        </Button> :

                                        <div></div>

                                    }

                                </Stack>

                            </Box> :

                            <div></div>

                        }

                        <Button colorScheme='teal' variant='solid' onClick={onClickRefresh}>
                            Return
                        </Button>

                    </Box>

                </div>

            )
        }

    } else {

        return (

            <div>

                Loading....

            </div>

        )

    }

}

export default DeleteUser;
