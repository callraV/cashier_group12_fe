import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CartItem from "../components/CartItem";
// import CartTable from "../components/CartTable";
// import { getTotalPrice } from "../features/store/cartSlice";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from "@chakra-ui/react";

function Transaction() {
  //----------------------------------------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <p className="font-bold text-2xl px-8 pt-4">Transaction History</p>
      <div className="grid grid-cols-5">
        {/* Total in cart */}
        <div className=" text-black m-7 col-span-2 max-h-fit">
          <div className="bg-white rounded-lg">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Items</Th>
                    <Th>Quantity</Th>
                    <Th isNumeric>Price (IDR)</Th>
                  </Tr>
                </Thead>
                <Tbody>{/* Tabled items */}</Tbody>
                <Tbody>
                  <Tr>
                    <Td></Td>
                    <Th>TOTAL</Th>
                    <Td isNumeric>Total</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Button colorScheme="blue" className="m-2">
              Checkout
            </Button>
          </div>
        </div>

        <div className="col-span-3 pr-8 py-2">
          <p>{/* Items */}</p>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
