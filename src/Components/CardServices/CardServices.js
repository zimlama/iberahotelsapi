import React from "react";
import { v4 } from "uuid";

import { Box, Text, ButtonGroup, Button, Grid } from "@chakra-ui/react";

function CardServices({ id, name, price, handleAddToCart, handleRemoveItem }) {
  return (
    <Box>
      <Grid templateColumns="1fr 1fr">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          key={v4()}
          ml="100px"
        >
          <Text>
            {name} $ {price}
          </Text>
        </Box>
        <Box ml="1px">
          <ButtonGroup color="teal" size="sm" alignItems="flex-end" mt="5px">
            <Button onClick={() => handleRemoveItem(id)}>-</Button>
            <Button onClick={() => handleAddToCart(id)}>+</Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Box>
  );
}

export default CardServices;
