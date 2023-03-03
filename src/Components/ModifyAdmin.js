import axios from "axios";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    FormLabel, Select, Input, Box, Stack, Button,
    Alert, AlertIcon, AlertTitle, FormErrorMessage,
    Card, CardBody, Image, FormHelperText,
    Heading, Text, Divider, FormControl
} from '@chakra-ui/react';
const { REACT_APP_GET_ALL_HOTELS, REACT_APP_GET_ALL_USERS, REACT_APP_FRONT,
    REACT_APP_MODIFY_HOTELS, REACT_APP_MODIFY_ROOMS } = process.env;


function Modify() {

    if (!document.cookie) {
        window.location.href = REACT_APP_FRONT
    };

    const [render, setRender] = useState("");
    const { user, isAuthenticated } = useAuth0();
    const [errorSubmit, setErrorSubmit] = useState("");

    const hotels = [];
    const [stateHotel, setStateHotel] = useState([]);
    const [state2Hotel, setState2Hotel] = useState([]);
    const [inputHotel, setInputHotel] = useState("");
    const [alertHotel, setAlertHotel] = useState("");
    const [alert2Hotel, setAlert2Hotel] = useState("");
    const [newHotel, setNewHotel] = useState("");
    const [modifyHotel, setModifyHotel] = useState("");
    const [cleanHotel, setCleanHotel] = useState("");
    const [inputHotelForm, setInputHotelForm] = useState({
        name: "",
        address: "",
        city: "",
        description: "",
        stars: ""
    });

    const rooms = [];
    const [stateRoom, setStateRoom] = useState([]);
    const [state2Room, setState2Room] = useState([]);
    const [inputRoom, setInputRoom] = useState("");
    const [alertRoom, setAlertRoom] = useState("");
    const [alert2Room, setAlert2Room] = useState("");
    const [newRoom, setNewRoom] = useState("");
    const [newRoom2, setNewRoom2] = useState("");
    const [modifyRoom, setModifyRoom] = useState("");
    const [cleanRoom, setCleanRoom] = useState("");
    const [inputRoomForm, setInputRoomForm] = useState({
        name: "",
        bed_quantity: "",
        price: "",
        description: ""
    });

    const onClickHotel = (e) => {
        setRender("hotel")
    };


    const onClickRoom = (e) => {
        setRender("room")
    };

    const onClickRefresh = (e) => {
        setRender("")
        setInputRoom("");
        setNewRoom("");
        setNewRoom2("");
        setModifyRoom("");
        setInputHotel("");
        setNewHotel("");
        setModifyHotel("");
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
                    maxWidth={400}
                    p={6}
                    m="10px auto"
                    as="form"
                >

                    <Stack direction='row' spacing={4} align='center'>

                        <Button colorScheme='teal' variant='solid' onClick={onClickHotel}>
                            Modify Hotlel
                        </Button>

                        <Button colorScheme='teal' variant='solid' onClick={onClickRoom}>
                            Modify Room
                        </Button>

                    </Stack>

                </Box >

            </div>

        )

    } else if (render === "hotel") {

        //------------------Modify Hotel--------------------------------------------------

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
            setModifyHotel("");
            setInputHotelForm({
                name: "",
                address: "",
                city: "",
                description: "",
                stars: ""
            });

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

            setCleanHotel("hotel")
            setAlertHotel("");
            setModifyHotel("");
            setInputHotelForm({
                name: "",
                address: "",
                city: "",
                description: "",
                stars: ""
            });

        };

        const handleFormChangeHotel = (e) => {

            setInputHotelForm({
                ...inputHotelForm,
                [e.target.name]: e.target.value
            });

            console.log(inputHotelForm)

        };

        const SubmitModifyHotel = (e) => {

            if (errorNsuccessful && errorAsuccessful && errorDsuccessful && errorSsuccessful &&
                errorCsuccessful) {

                if (!inputHotelForm.name || !inputHotelForm.address || !inputHotelForm.city ||
                    !inputHotelForm.description || !inputHotelForm.stars) {

                    setErrorSubmit("error")

                } else {

                    axios.put(`${REACT_APP_MODIFY_HOTELS}${newHotel[0].idHotels}`, inputHotelForm)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));


                    setInputHotel("");
                    setNewHotel("");
                    setModifyHotel("");
                    setInputHotelForm({
                        name: "",
                        address: "",
                        city: "",
                        description: "",
                        stars: ""
                    });
                    setAlertHotel("submit");
                    setAlert2Hotel("submit");
                    setErrorSubmit("");

                }

            } else {

                setErrorSubmit("error")

            }

        };

        const ButtonModifyHotel = (e) => {
            setModifyHotel("modify");
        };

        const HandleCleanHotel = (e) => {
            setCleanHotel("")
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


        if (inputHotelForm.name.length >= 3) {
            var errorNsuccessful = "error"
        };

        if (inputHotelForm.address.length >= 3) {
            var errorAsuccessful = "error"
        };


        if (inputHotelForm.city.length >= 3) {
            var errorCsuccessful = "error"
        };

        if (inputHotelForm.description.length >= 3) {
            var errorDsuccessful = "error"
        };

        if (inputHotelForm.stars.length === 1 && !isNaN(inputHotelForm.stars) && inputHotelForm.stars > 0
            && inputHotelForm.stars < 6) {
            var errorSsuccessful = "error"
        };


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
                                    Hotel Modify!
                                </AlertTitle>
                            </Alert> :

                            <div></div>

                        }

                        <FormLabel>Modify Hotel</FormLabel>

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

                                <Button colorScheme='teal' variant='solid' onClick={ButtonModifyHotel}>
                                    Modify
                                </Button>

                            </Box>
                            :
                            <div></div>}

                        <br></br>

                        <Stack direction='row' spacing={4} align='center'>

                            <Button colorScheme='teal' variant='solid' onClick={onClickRefresh}>
                                Return
                            </Button>

                        </Stack>

                        <br></br>
                        <br></br>

                        {modifyHotel ?

                            <div>

                                <FormControl>

                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' name="name" borderWidth='3px' value={inputHotelForm.name}
                                        onChange={handleFormChangeHotel} />
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

                                    <FormLabel>Address</FormLabel>
                                    <Input type='text' name="address" borderWidth='3px' value={inputHotelForm.address}
                                        onChange={handleFormChangeHotel} />
                                    {!errorAsuccessful ? (
                                        <FormHelperText>
                                            Address should have 3 letters.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorAsuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                    <FormLabel>City</FormLabel>
                                    <Input type='text' name="city" borderWidth='3px' value={inputHotelForm.city}
                                        onChange={handleFormChangeHotel} />
                                    {!errorCsuccessful ? (
                                        <FormHelperText>
                                            City should have 3 letters.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorCsuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                    <FormLabel>Description</FormLabel>
                                    <Input type='text' name="description" borderWidth='3px' value={inputHotelForm.description}
                                        onChange={handleFormChangeHotel} />
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

                                    <FormLabel>Stars</FormLabel>
                                    <Input type='text' name="stars" borderWidth='3px' value={inputHotelForm.stars}
                                        onChange={handleFormChangeHotel} />
                                    {!errorSsuccessful ? (
                                        <FormHelperText>
                                            Stars should have 1 number.
                                            Less than 6 and greater than 0
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorSsuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                </FormControl>

                                <br></br>

                                <Button colorScheme='teal' variant='solid' onClick={SubmitModifyHotel}>
                                    Submit
                                </Button>

                                {errorSubmit ?

                                    <div>

                                        <Alert status='error'>
                                            <AlertIcon />
                                            Missing send mandatory data
                                        </Alert>

                                    </div>

                                    :

                                    <div></div>

                                }

                            </div> :

                            <div></div>

                        }

                    </Box>

                </div>

            )
        }

    } else if (render === "room") {

        //------------------Modify Room--------------------------------------------------

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
            setModifyRoom("");
            setInputRoomForm({
                name: "",
                bed_quantity: "",
                price: "",
                description: ""
            });

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

            setCleanRoom("room")
            setAlertRoom("");
            setModifyRoom("");
            setInputRoomForm({
                name: "",
                bed_quantity: "",
                price: "",
                description: ""
            });

        };

        const handleFormChangeRoom = (e) => {

            setInputRoomForm({
                ...inputRoomForm,
                [e.target.name]: e.target.value
            });

            console.log(inputRoomForm)

        };

        const SubmitModifyRoom = (e) => {

            if (errorNamSuccessful && errorDesSuccessful && errorPsuccessful && errorBedSuccessful) {

                if (!inputRoomForm.name || !inputRoomForm.bed_quantity || !inputRoomForm.price ||
                    !inputRoomForm.description) {

                    setErrorSubmit("error")

                } else {

                    axios.put(`${REACT_APP_MODIFY_ROOMS}${newRoom2[0].idRooms}`, inputRoomForm)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));


                    setInputRoom("");
                    setNewRoom("");
                    setNewRoom2("");
                    setModifyRoom("");
                    setInputRoomForm({
                        name: "",
                        bed_quantity: "",
                        price: "",
                        description: ""
                    });
                    setAlertRoom("submit");
                    setAlert2Room("submit");
                    setErrorSubmit("");

                }

            } else {

                setErrorSubmit("error")

            }

        };


        if (inputRoomForm.name.length >= 3) {
            var errorNamSuccessful = "error"
        };


        if (inputRoomForm.bed_quantity.length === 1 && !isNaN(inputRoomForm.bed_quantity)
            && inputRoomForm.bed_quantity > 0 && inputRoomForm.bed_quantity < 6) {
            var errorBedSuccessful = "error"
        };


        if (inputRoomForm.price.length === 3 && !isNaN(inputRoomForm.price)) {
            var errorPsuccessful = "error"
        };


        if (inputRoomForm.description.length >= 3) {
            var errorDesSuccessful = "error"
        };


        const HandleCleanRoom = (e) => {
            setCleanRoom("")
        };

        const ButtonModifyRoom = (e) => {
            setModifyRoom("modify");
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

        };

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
                                    Room Modify!
                                </AlertTitle>
                            </Alert> :

                            <div></div>

                        }

                        <FormLabel>Modify Room</FormLabel>

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

                                    {state2Room && state2Room?.map((r) => {
                                        return (
                                            <Button id="button-filter-room" colorScheme='blue' variant='ghost' onClick={handleFilterRoom}>
                                                {r.name}
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

                                <Button colorScheme='teal' variant='solid' onClick={ButtonModifyRoom}>
                                    Modify
                                </Button>

                            </Box> :

                            <div></div>

                        }

                        <br></br>

                        <Stack direction='row' spacing={4} align='center'>

                            <Button colorScheme='teal' variant='solid' onClick={onClickRefresh}>
                                Return
                            </Button>

                        </Stack>

                        <br></br>
                        <br></br>

                        {modifyRoom ?

                            <div>

                                <FormControl>

                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' name="name" borderWidth='3px' value={inputRoomForm.name}
                                        onChange={handleFormChangeRoom} />
                                    {!errorNamSuccessful ? (
                                        <FormHelperText>
                                            Name should have 3 letters.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorNamSuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                    <FormLabel>Bed_quantity</FormLabel>
                                    <Input type='text' name="bed_quantity" borderWidth='3px' value={inputRoomForm.bed_quantity}
                                        onChange={handleFormChangeRoom} />
                                    {!errorBedSuccessful ? (
                                        <FormHelperText>
                                            Bed_quantity should have 1 number.
                                            Less than 6 and greater than 0
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorBedSuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                    <FormLabel>Price</FormLabel>
                                    <Input type='text' name="price" borderWidth='3px' value={inputRoomForm.price}
                                        onChange={handleFormChangeRoom} />
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

                                    <FormLabel>Description</FormLabel>
                                    <Input type='text' name="description" borderWidth='3px' value={inputRoomForm.description}
                                        onChange={handleFormChangeRoom} />
                                    {!errorDesSuccessful ? (
                                        <FormHelperText>
                                            Description should have 3 letters.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorDesSuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                </FormControl>

                                <br></br>

                                <Button colorScheme='teal' variant='solid' onClick={SubmitModifyRoom}>
                                    Submit
                                </Button>

                                {errorSubmit ?

                                    <div>

                                        <Alert status='error'>
                                            <AlertIcon />
                                            Missing send mandatory data
                                        </Alert>

                                    </div>

                                    :

                                    <div></div>

                                }

                            </div> :

                            <div></div>

                        }

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

export default Modify;
