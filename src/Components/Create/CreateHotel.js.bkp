



import { useState } from "react";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  FormHelperText,
  HStack,
  FormControl,
} from '@chakra-ui/react';

import { createHotel } from "../../Redux/actions/hotels";
import { useDispatch } from 'react-redux'
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const avatars = [
  {
    name: '1',
    url: 'https://pix10.agoda.net/hotelImages/9907221/-1/b5eabbf74a403be4a168778eb01819e9.jpg?ca=22&ce=0&s=1024x768',
  },
  {
    name: '2',
    url: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391703.jpg?ca=6&ce=1&s=1024x768',
  },
  {
    name: '3',
    url: 'https://pix10.agoda.net/hotelImages/9907221/-1/4882dea6640e3378cedc3724db075df4.jpg?ca=22&ce=0&s=1024x768',
  },
  {
    name: 'Otemuyiwa',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_np0V2k1k8gryl76TAau5zdUT3rS3QZT3pWPTAdu3-WcpHT0DbUS_Cq3y3Q7HwrdS9iA&usqp=CAU',
  },
  {
    name: 'Nwamba',
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
  },
];


export default function CreateHotelIbera() {
  const  breakpoint1 = useBreakpointValue({ base: 'md', md: 'lg' });
  const  breakpoint2 = useBreakpointValue({ base: '44px', md: '60px' });

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [input, setInput] = useState({
    idHotels:"",
    name: "",
    city: "",
    description: "",
    address: "",
    stars: "",
    image: [],
    
  })
  const [errors, setErrors] = useState({})
  const validateName = /^[a-zA-Z\s]+$/


  // const [image, setImage] = useState(null)
  const [image] = useState(null)

  // const uploadImage = (e) => {
  //   const file = e.target.files[0];
  // };

  function validate(input) {
    const errors = {}
    if (!input.name) {
      errors.name = 'Debe ingresar un nombre'
    } else if (input.name.length > 30) {
      errors.name = 'Debe tener menos de 30 caracteres'
    } else if (!validateName.test(input.name)) {
      errors.name = 'Los caracteres especiales no estan permitidos'
    }
    if (!input.city) {
      errors.city = 'Debes indicar la ciudad'
    } else if (input.city.length > 20) {
      errors.city = 'Debe tener menos de 20 caracteres'
    } 
    if (!input.stars) {
      errors.stars = 'Debe ingresar la cantidad de estrellas de su hotel'
    } else if (input.stars > 5) {
      errors.stars = 'Las estrellas debe ser inferior a 5'
    } else if (input.stars < 0) {
      errors.stars = 'Las estrellas no pueden ser negativas'
    }
    return errors
  }
  
  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (!input.name || !input.city || !input.stars) {
      
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Completa los campos obligatorios',
        confirmButtonColor: '#F27474'
      })
    } else {
      
      if (image !== null) {
        input.image = image.url
      }
      setErrors(validate(input))
      dispatch(createHotel(input))
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa!',
        text: 'Creaste el Hotel',
        confirmButtonColor: '#98D035'
     })
      setInput({
        idHotels:"",
        name: "",
        city: "",
        description: "",
        address: "",
        stars: "",
        image: [],
        
      })
      
    }
  }
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Hotels Ibera{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              =
            </Text>{' '}
            Pleasure and Comfort
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={breakpoint1}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={breakpoint2}
              minHeight={breakpoint2}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              Your Hotel
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Create your hotel
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            We're looking for amazing hotels with fabulous destinations!
            Add a new hotel and increase the Ibera experience!
            </Text>
          </Stack>
          <FormControl>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
            <Input
                name= "idHotels"
                placeholder="idHotels"
                onChange={(e) => handleChange(e)}
                value={input.idHotels}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                name= "name"
                placeholder="Hotel name"
                onChange={(e) => handleChange(e)}
                value={input.name}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              {errors.name && (
                    <FormHelperText color='red.400'>{errors.name}</FormHelperText>
              )}
              <Input
                name= "city"
                placeholder="City"
                onChange={(e) => handleChange(e)}
                value={input.city}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              {errors.city && (
                  <FormHelperText color='red.400'>{errors.city}</FormHelperText>
              )}
              <Input
                name= "address"
                placeholder="Hotel Address"
                onChange={(e) => handleChange(e)}
                value={input.address}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
               <Input
                name= "description"
                placeholder="Hotel Description"
                onChange={(e) => handleChange(e)}
                value={input.description}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
                <Input
                name= "stars"
                placeholder="Stars"
                onChange={(e) => handleChange(e)}
                value={input.stars}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              {errors.stars && (
                    <FormHelperText color='red.400'>{errors.stars}</FormHelperText>
              )}
               <Input
                name= "status"
                onChange={(e) => handleChange(e)}
                value={input.status}
                placeholder="Status"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
                <Input
                name= "image"
                onChange={(e) => handleChange(e)}
                value={input.image}
                placeholder="Upload Image"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
             
            </Stack>
            <HStack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              _active={{
                color: '#98D035',
                transition: 'all .5s ease',
                backgroundColor: '#E3FFB2'
              }}
              onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
            <Link to='/home'>
                <Button
                  marginLeft='1rem'>                  
                    Return
                </Button>
            </Link>
            </HStack>
          </Box>
          </FormControl>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  )
}

export const Blur = (IconProps) => {
  const  breakpoint3 = useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' });
  const  breakpoint4 = useBreakpointValue({ base: -1, md: -1, lg: 0 });

  return (
    <Icon
      width={breakpoint3}
      zIndex={breakpoint4}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...IconProps}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};