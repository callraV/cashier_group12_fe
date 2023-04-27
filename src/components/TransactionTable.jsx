import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { removeFromTransaction } from "../features/transactions/transactionSlice";
import { useDispatch } from "react-redux";

function TransactionTable(props) {
  const { id, productName, price, quantity, salesType } = props;
  const total = price * quantity;

  const dispatch = useDispatch();

  //-------------------------------------------------------------------

  return (
    <Tr>
      <Td>{productName}</Td>
      <Td>{quantity}</Td>
      <Td>{salesType}</Td>
      <Td isNumeric>{total}</Td>
      <Td>
        <Button
          onClick={() => {
            console.log({ id });
            dispatch(removeFromTransaction({ id }));
          }}
          colorScheme="red"
          size="sm"
        >
          <DeleteIcon />
        </Button>
      </Td>
    </Tr>
  );
}

export default TransactionTable;
