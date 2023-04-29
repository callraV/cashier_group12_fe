import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Center } from "@chakra-ui/react";

//components
import ProductCard from "../components/ProductCard";
import TransactionTable from "../components/TransactionTable";

//features
import { searchCategoryHandler, setFilteredCategory, getProducts, getProductCategory, sortByHandler, setProduct } from "../features/productSlice";
import ProductCategory from "../components/ProductCategory";
import TabledItems from "../components/TabledItems";
import { addTransaction, addTransactionProduct } from "../features/transaction/transactionSlice";

function Payment() {
  //------declarations--------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.product.categoryList);
  const searchCategory = useSelector((state) => state.product.searchCategory); //get search category from global
  const filteredCategory = useSelector((state) => state.product.filteredCategory);
  const userGlobal = useSelector((state) => state.user.user);
  // const sortBy = useSelector((state) => state.product.sortBy); //get search category from global
  const cartList = useSelector((state) => state.cart.cartList);

  //------render cart list--------

  const getCartList = () => {
    return cartList.map((item) => {
      return <TabledItems idproduct={item.idproduct} name={item.productName} quantity={item.quantity} price={item.price} />;
    });
  };

  //----dispatching user transactino

  const dispatchTransaction = () => {
    const { id } = userGlobal;
    let totalPrice = 0;
    let cartListWithId = cartList.map((item) => {
      totalPrice += item.price;
      return { ...item, iduser: id };
    });
    if (totalPrice === 0) {
      alert("Please add item in the cart");
    } else {
      dispatch(addTransaction({ iduser: id, totalPrice }));
      dispatch(addTransactionProduct(cartListWithId));
    }
    // cartList.forEach((item) => {
    //   dispatch(addTransaction(item));
    // });
  };

  //------get product's db--------

  useEffect(() => {
    if (userGlobal.id > 0) {
      dispatch(getProductCategory());
      dispatch(getProducts());
    } else {
      navigate(`/Login`);
    }
  }, []);

  //------------------------------Driver-------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <br />

      {/* // */}

      <div name="TransactionTable">
        <div className="text-black p-5">
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
                <Tbody>{getCartList()}</Tbody>
                <Tbody>
                  <Tr>
                    <Td></Td>
                    <Th>TOTAL</Th>
                    <Td isNumeric>Total</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Center>
              <Button colorScheme="blue" className="m-2" onClick={dispatchTransaction}>
                Pay now
              </Button>
            </Center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
