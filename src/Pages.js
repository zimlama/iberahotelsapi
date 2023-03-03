import React from "react";
import { Box, Button } from "@chakra-ui/react";

function Pages({ page, hotelsPerPage, hotels, currentPage }) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(hotels.length / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handleNext() {
    pageNumbers.length - 1 === currentPage ? page(1) : page((x) => x + 1);
  }

  function handlePrev() {
    currentPage === 1 ? page(pageNumbers.length - 1) : page((x) => x - 1);
  }

  return (
    <Box mt="20px">
      <Button
        mr="5px"
        color="teal"
        backgroundColor="white"
        size="sm"
        onClick={() => handleNext()}
      >
        {" "}
        Prev
      </Button>
      {pageNumbers?.map((number) => {
        return (
          <Button
            color="teal"
            borderColor="teal"
            backgroundColor="white"
            size="sm"
            onClick={() => page(number)}
          >
            {number}
          </Button>
        );
      })}
      <Button
        ml="5px"
        color="teal"
        backgroundColor="white"
        size="sm"
        onClick={() => handlePrev()}
      >
        {" "}
        Next
      </Button>
    </Box>
  );
}
export default Pages;
