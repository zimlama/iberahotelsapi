import axios from "axios";
import {
    Box, Stack, Button,
    Card, CardBody, Image,
    Heading, Text, Divider, Select,
    FormControl, FormLabel, Input,
    FormHelperText, FormErrorMessage,
    Alert, AlertIcon
} from '@chakra-ui/react';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const { REACT_APP_GET_ALL_USERS, REACT_APP_MODIFY_USERS } = process.env;


function Profile() {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [newUser, setNewUser] = useState("");
    const [buttonModify, setButtonModify] = useState("");
    const [errorSubmit, setErrorSubmit] = useState("");
    const [input, setInput] = useState({
        first_name: "",
        last_name: "",
        date_birth: "",
        mobile: "",
        nationality: "",
        image: ""
    });

    const PaisesArray = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Palestina", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"];
    const DayArray = [];
    const MonthArray = [];
    const YearArray = [];

    for (let i = 1; i < 32; i++) {
        DayArray.push(i);
    };

    for (let i = 1; i < 13; i++) {
        MonthArray.push(i);
    };

    for (let i = 1922; i < 2024; i++) {
        YearArray.push(i);
    };

    if (isLoading) {
        return (

            <div>Loading...</div>

        )

    } else if (isAuthenticated) {

        if (isAuthenticated && !newUser) {

            var axiosUser;
            var email = user.email;


            axios
                .get(REACT_APP_GET_ALL_USERS)
                .then((res) => {
                    console.log("get axios profile", res.data);

                    axiosUser = res.data.find((u) => {
                        return (
                            u.email === email
                        )
                    });

                    if (!newUser) {
                        setNewUser(axiosUser)
                        console.log(axiosUser);
                    };

                })
                .catch((err) => console.log(err));

        };

        const handleInputChange = (e) => {

            setInput({
                ...input,
                [e.target.name]: e.target.value
            });

            console.log(input)

        };

        const HandleModify = (e) => {

            if (buttonModify === "") {
                setButtonModify("modify")
            } else {
                setButtonModify("")
                errorBsuccessful = "";
                errorNsuccessful = "";
                errorLNsuccessful = "";
                errorMsuccessful = "";
                errorNTsuccessful = "";
                errorIsuccessful = "";
                setInput({
                    first_name: "",
                    last_name: "",
                    date_birth: "",
                    mobile: "",
                    nationality: "",
                    image: ""
                })
            }

        };

        const handleBirthdayChange = (e) => {

            const selectDay = document.getElementById('select-day');
            const selectMonth = document.getElementById('select-month');
            const selectYear = document.getElementById('select-year');

            setInput({
                ...input,
                [e.target.name]: `${selectYear.value}-${selectMonth.value}-${selectDay.value}`
            });

            console.log(input)

        };

        const SubmitModifyUser = (e) => {

            const selectDay = document.getElementById('select-day');
            const selectMonth = document.getElementById('select-month');
            const selectYear = document.getElementById('select-year');

            if (
                errorMsuccessful && errorNsuccessful && errorLNsuccessful && input.nationality
                && input.date_birth && selectDay.value && selectMonth.value && selectYear.value
            ) {

                if (!input.first_name || !input.last_name || !input.nationality || !input.date_birth ||
                    !input.mobile) {

                    setErrorSubmit("error");

                } else {
                    axios.put(`${REACT_APP_MODIFY_USERS}${newUser.email}`, input)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));

                    window.location.reload();
                };

            } else {
                setErrorSubmit("error");
            }

        };


        if (input.date_birth.length >= 8) {
            var errorBsuccessful = "error";
        };


        if (input.nationality) {
            var errorNTsuccessful = "error";
        };


        if (input.first_name.length >= 3) {
            var errorNsuccessful = "error"
        };


        if (input.last_name.length >= 3) {
            var errorLNsuccessful = "error"
        };


        if (input.mobile.length >= 10 && !isNaN(input.mobile)) {
            var errorMsuccessful = "error"
        };

        if (input.image.length >= 3) {
            var errorIsuccessful = "error"
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

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src={newUser.image}
                                alt='User Image'
                                borderRadius='lg'
                                maxWidth={200}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>User Information</Heading>
                                <Text>
                                    First_name: {newUser.first_name}
                                </Text>
                                <Text>
                                    Last_name: {newUser.last_name}
                                </Text>
                                <Text>
                                    Email: {newUser.email}
                                </Text>
                                <Text>
                                    Nationality: {newUser.nationality}
                                </Text>
                                <Text>
                                    Date_birth: {newUser.date_birth}
                                </Text>
                                <Text>
                                    Mobile: {newUser.mobile}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                    </Card>

                    <br></br>

                    <Stack>

                        <Button onClick={HandleModify}>Modify</Button>

                    </Stack>

                    {buttonModify ?

                        <div>

                            <FormControl>

                                <FormLabel>Name</FormLabel>
                                <Input type='text' value={input.first_name} name="first_name" onChange={handleInputChange} borderWidth='3px' />
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

                                <FormLabel>Last Name</FormLabel>
                                <Input type='text' value={input.last_name} name="last_name" onChange={handleInputChange} borderWidth='3px' />
                                {!errorLNsuccessful ? (
                                    <FormHelperText>
                                        Last Name should have 3 letters.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}
                                {errorLNsuccessful ? (
                                    <FormHelperText color="red" className="letter" fontWeight='bold'>
                                        Successful
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}

                                <FormLabel>Mobile</FormLabel>
                                <Input type='text' value={input.mobile} name="mobile" onChange={handleInputChange} borderWidth='3px' />
                                {!errorMsuccessful ? (
                                    <FormHelperText>
                                        Mobile should have 10 numbers.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}
                                {errorMsuccessful ? (
                                    <FormHelperText color="red" className="letter" fontWeight='bold'>
                                        Successful
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}

                                <FormLabel>Image</FormLabel>
                                <Input type='text' value={input.image} name="image" onChange={handleInputChange} borderWidth='3px' />
                                {!errorIsuccessful ? (
                                    <FormHelperText>
                                        Complete Image
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}
                                {errorIsuccessful ? (
                                    <FormHelperText color="red" className="letter" fontWeight='bold'>
                                        Successful
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage></FormErrorMessage>
                                )}


                            </FormControl>

                            <div>

                                <FormLabel>Birthday</FormLabel>

                                <Select placeholder='day' id="select-day" name="date_birth" onChange={handleBirthdayChange} borderWidth='3px' maxW='sm'>
                                    {DayArray && DayArray.map((d) => {
                                        return (
                                            <option> {d} </option>
                                        )
                                    })}
                                </Select>

                                <Select placeholder='month' id="select-month" name="date_birth" onChange={handleBirthdayChange} borderWidth='3px' maxW='sm'>
                                    {MonthArray && MonthArray.map((m) => {
                                        return (
                                            <option> {m} </option>
                                        )
                                    })}
                                </Select>

                                <Select placeholder='year' id="select-year" name="date_birth" onChange={handleBirthdayChange} borderWidth='3px' maxW='sm'>
                                    {YearArray && YearArray.map((y) => {
                                        return (
                                            <option> {y} </option>
                                        )
                                    })}
                                </Select>

                            </div>

                            <div>

                                <FormControl>

                                    {!errorBsuccessful ? (
                                        <FormHelperText>
                                            Complete Birthday.
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

                                </FormControl>

                            </div>

                            <div>

                                <FormLabel>Nationality</FormLabel>

                                <Select placeholder='Select option' id="select-nation" name="nationality" value={input.nationality} onChange={handleInputChange} borderWidth='3px'>
                                    {PaisesArray && PaisesArray.map((p) => {
                                        return (
                                            <option> {p} </option>
                                        )
                                    })}
                                </Select>

                            </div>

                            <div>

                                <FormControl>

                                    {!errorNTsuccessful ? (
                                        <FormHelperText>
                                            Complete Nationality.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
                                    {errorNTsuccessful ? (
                                        <FormHelperText color="red" className="letter" fontWeight='bold'>
                                            Successful
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}

                                </FormControl>

                            </div>

                            <br></br>

                            <Stack>

                                <Button onClick={HandleModify}>Return</Button>

                                <Button colorScheme="teal" variant="solid"
                                    onClick={SubmitModifyUser}
                                >
                                    Submit
                                </Button>

                            </Stack>

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

                        </div>

                        :

                        <div></div>

                    }

                </Box >

            </div>

        );

    }

};

export default Profile;
