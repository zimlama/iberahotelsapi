import React, { useEffect, useState } from "react";
import {
  Heading,
  Text,
  Button,
  Box,
  Grid,
  Divider,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Redux/actions";
import CardServices from "../CardServices/CardServices";
import { FaBed } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { v4 } from "uuid";

const { REACT_APP_MERCADOPAGO_CHECKOUT, REACT_APP_ORDER_CREATE } = process.env;
const { getServices } = allActions;

function ShoppingCart() {
  const [local, setLocal] = useState("");
  const [service, setService] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);

  useEffect(() => {
    const cart = window.localStorage.getItem("roomcart");
    setLocal(cart ? JSON.parse(cart) : {});
    const serv = window.localStorage.getItem("servicecart");
    setService(serv ? JSON.parse(serv) : {});
    const priceTotal = window.localStorage.getItem("totalprice");
    setTotalPrice(priceTotal ? parseInt(JSON.parse(priceTotal)) : 0);

    dispatch(getServices());
  }, [dispatch]);

  function handleResetCart() {
    window.localStorage.setItem("servicecart", JSON.stringify({}));
    ///VER ACA ==> un localstorage para los precios de services
    setService({});
    window.localStorage.setItem("roomcart", JSON.stringify({}));
    setLocal({});
    window.localStorage.setItem("totalprice", JSON.stringify(0));
    setTotalPrice(0);
  }

  function handleRemoveItem(id) {
    if (service[id].quantity > 1) {
      const filterService = services.filter((e) => e.id === id);
      let serv = service[`${id}`]?.quantity
        ? (service[`${id}`].quantity -= 1)
        : 1;
      service[id] = {
        id: filterService[0].id,
        name: filterService[0].name,
        price: filterService[0].price,
        quantity: serv,
      };

      setService({ ...service });
      window.localStorage.setItem("servicecart", JSON.stringify(service));
      setTotalPrice((total) => (total -= parseInt(filterService[0].price)));
      console.log(serv);
    } else {
      const filterService = services.filter((e) => e.id === id);
      setTotalPrice((total) => (total -= parseInt(filterService[0].price)));
      delete service[id];
    }

    //window.localStorage.setItem("totalprice"); //precio room y servicios
  }
  async function handleAddToCart(id) {
    const filterService = await services.filter((e) => e.id === id);
    const total = totalPrice + parseInt(filterService[0].price);

    setTotalPrice(total);
    let qty = service[`${id}`]?.quantity ? (service[`${id}`].quantity += 1) : 1;

    service[id] = {
      id: filterService[0].id,
      item: filterService[0].name,
      price: filterService[0].price,
      quantity: qty,
    };

    window.localStorage.setItem("servicecart", JSON.stringify(service));

    setService({ ...service });
    window.localStorage.setItem("totalprice", JSON.stringify(total));
  }

  // function adapt() {
  //   var storeLocal = [];
  //   Object.keys(
  //     service.forEach((key) => {
  //       let id = service[key].id;
  //       let item = service[key].name;
  //       let quantity = service[id].quantity;
  //       let unit_price = service[id].price;
  //       storeLocal.push({
  //         id: id,
  //         item: item,
  //         quantity: quantity,
  //         price: unit_price,
  //       });
  //     })
  //   );
  //   return storeLocal;
  // }
  async function handlePayment() {
    var fechaActual = new Date();
    console.log("esta es fecha actual", fechaActual);
    var anio = fechaActual.getFullYear();
    var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
    var dia = ("0" + fechaActual.getDate()).slice(-2);
    console.log("esta es año", anio);
    console.log("esta es mes", mes);
    console.log("esta es dia", dia);
    var fecha = anio + "-" + mes + "-" + dia;
    var fechaString = fecha.toString();

    console.log("esta es la fecha:", fechaString);

    /* const newBill =
      //token: authUser?.accessToken, ACA VA LO DE LOG IN
      await axios
        .post(REACT_APP_ORDER_CREATE, {
          item: "monto total",
          quantity: 1,
          date: fechaString,
          price: totalPrice,
          idUser: 1,
        })
        .then((res) => res.data);*/

    //async function handlePayment() {
    //   //  setToggle(true); //hace aparecer el boton

    const paymentBasic = await axios
      .post(REACT_APP_ORDER_CREATE, {
        item: "monto total",
        quantity: 1,
        date: fechaString,
        price: totalPrice,
        idUser: 1,
      })
      /*.post(REACT_APP_PAYMENT_CREATE, {
        id,
        item,
        quantity: newBill.quantity,
        price: newBill.price,
      })*/
      .then((res) => (window.location.href = res.data));

    console.log(paymentBasic);

    const script = document.createElement("script");
    const attr_data_preference = document.createAttribute("data-preference-id");
    attr_data_preference.value = paymentBasic.data.id;
    script.src = REACT_APP_MERCADOPAGO_CHECKOUT;
    script.setAttributeNode(attr_data_preference);
    document.getElementById("pay").appendChild(script);
  }
  //   //window.localStorage.removeItem("roomcart");
  // }
  //esta parte seria lo q viene por props);
  //despues le hace un .then((resp)y lo lleva al init point)
  // if (paymentBasic.status === 400) {
  //   window.alert(
  //     "One of more of the seats you selected are already taken, please select new seats"
  //   );
  //   const redirect = `/schedule/${sendPayment.scheduleId.schedule_id}`;
  //   return <Navigate to={redirect} />;
  // }

  return (
    <Box>
      <Box align="center" backgroundColor="teal">
        <Heading size="md" mt="30px" mb="30px" color="white">
          {" "}
          Your shopping cart
        </Heading>
      </Box>

      <Grid templateColumns="1fr 1fr 1fr">
        <Box
          maxW="sm"
          borderColor="white"
          borderWidth="1px"
          borderRadius="lg"
          ml="20px"
        >
          <Box mt="30px" color="teal" fontSize="2xl" mb="30px">
            <Icon ml="5px" mr="40px" as={FaBed} boxSize={5}></Icon>
            <Text>{local.name}</Text>
          </Box>
          <Text ml="1%" mr="20%" as="i" fontSize="xl" color="black">
            {" "}
            Room amount per day ${local.price > 0 ? local.price : 0}
            <Text mt="20px">
              Total price for {local.quantity} days - ${" "}
              {local.price * local.quantity > 0
                ? local.price * local.quantity
                : 0}
            </Text>
          </Text>
          <Divider color="teal" border="solid" borderWidth="1px" mt="10px" />
        </Box>
        <Box mt="20px">
          <Text as="i" fontSize="3xl">
            {" "}
            Add Special Services{" "}
          </Text>

          <Button
            color="teal "
            ml="250px"
            onClick={handleResetCart}
            size="sm"
            mt="20px"
            mb="20px"
          >
            Delete All Items
          </Button>
          {services &&
            services.map((ser) => (
              <CardServices
                key={v4()}
                id={ser.id}
                name={ser.name}
                price={ser.price}
                handleAddToCart={handleAddToCart}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
        </Box>
        <Flex>
          <Box mr="60px">
            <Heading>Your order details</Heading>
            <Flex display="initial">
              <Text mt="30px">Room for {local.quantity} days </Text>

              <Text ml="150px">
                ${" "}
                {local.price * local.quantity > 1
                  ? local.price * local.quantity
                  : 0}
              </Text>

              <Text mt="20px"></Text>
            </Flex>
            {service &&
              Object.keys(service).map((e) => {
                return (
                  <Box key={v4()}>
                    ({service[e].quantity} item) - {service[e].name} $
                    {service[e].quantity * service[e].price}
                  </Box>
                );
              })}
            <Divider color="teal" border="solid" borderWidth="1px" mt="20px" />
            <Text mt="20px">Total amount ${totalPrice}</Text>
            <Button mt="40px" color="teal" onClick={handlePayment}>
              Continue to payment <Icon ml="10px" as={FiArrowRight}></Icon>
            </Button>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}

export default ShoppingCart;
/*{
  /*id: 1,
        item: "monto total",
        quantity: 1,
        price: totalPrice,*/
/*console.log("orden aqui", res.data);
          console.log("id aqui", res.data.id);
          console.log("item aqui", res.data.item);
          console.log("quantity aqui", res.data.quantity);
          console.log("price aqui", res.data.price);*/
