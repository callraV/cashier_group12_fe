import { Td, Tr } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { incQuantity, dcsQuantity, deleteCartItem } from "../features/cartSlice";

function TabledItems({ idproduct, name, quantity, price }) {
  const cartItem = useSelector((state) => state.cart.cartList);
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const incItemQty = () => {
    let targetedProduct = productList.find((product) => product.idproduct === idproduct);
    let result = cartItem.findIndex((item) => item.idproduct === idproduct);

    let data = {
      result,
      quantity: 1,
      addedPrice: targetedProduct.price,
    };
    dispatch(incQuantity(data));
  };

  const dcsItemQty = () => {
    let targetedProduct = productList.find((product) => product.idproduct === idproduct);
    let result = cartItem.findIndex((item) => item.idproduct === idproduct);
    if (cartItem[result].quantity === 1) {
      let newCartItem = cartItem.filter((item) => item.idproduct !== idproduct);
      dispatch(deleteCartItem(newCartItem));
    } else {
      let data = {
        result,
        quantity: 1,
        addedPrice: targetedProduct.price,
      };
      dispatch(dcsQuantity(data));
    }
  };

  return (
    <Tr>
      <Td>{name}</Td>
      <Td className="flex flex-row justify-around">
        <button onClick={dcsItemQty}>-</button>
        <p>{quantity}</p>
        <button onClick={incItemQty}>+</button>
      </Td>
      <Td isNumeric>Rp.{price},00</Td>
    </Tr>
  );
}

export default TabledItems;
