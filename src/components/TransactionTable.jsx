import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tr, Td } from "@chakra-ui/react";
import { setGrossIncome } from "../features/transaction/transactionSlice";

function TransactionTable(props) {
  const {
    category,
    date,
    idtransaction,
    name,
    pricePerPiece,
    quantity,
    totalPrice,
  } = props.transData;

  // console.log(
  //   category,
  //   date,
  //   idtransaction,
  //   name,
  //   pricePerPiece,
  //   quantity,
  //   totalPrice
  // );
  //id = cart id
  //product id = ???
  const total = pricePerPiece * quantity;

  //-------------------------------------------------------------------

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{quantity}</Td>
      <Td isNumeric>Rp.{pricePerPiece * quantity},00</Td>
    </Tr>
  );
}

export default TransactionTable;
