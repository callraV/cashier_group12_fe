import React from "react";
import { Tr, Td } from "@chakra-ui/react";

function TransactionTable(props) {
  const { productName, price, quantity } = props;
  //id = cart id
  //product id = ???
  const total = price * quantity;

  //-------------------------------------------------------------------

  return (
    <Tr>
      <Td>{productName}</Td>
      <Td>{quantity}</Td>
      <Td isNumeric>{total}</Td>
    </Tr>
  );
}

export default TransactionTable;
