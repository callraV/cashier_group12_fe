import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Center } from "@chakra-ui/react";

//components
import ProductCard from "../components/ProductCard";
import TransactionTable from "../components/TransactionTable";

//features
import { searchCategoryHandler, setFilteredCategory, getProducts } from "../features/productSlice";

function Dashboard() {
  //------declarations--------

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const searchCategory = useSelector((state) => state.product.searchCategory); //get search category from global
  const filteredCategory = useSelector((state) => state.product.filteredCategory); //get search category from global

  //------render product list--------

  const renderProducts = () => {
    if (searchCategory === "") {
      return productList.map((p) => {
        return (
          <ProductCard
            //product ID
            id={p.id}
            //
            productImage={p.productImage}
            //
            productName={p.productName}
            //
            description={p.description}
            //
            category={p.category}
            //
            price={p.price}
          />
        );
      });
    } else {
      return filteredCategory.map((p) => {
        return (
          <ProductCard
            //product ID
            id={p.id}
            //
            productImage={p.productImage}
            //
            productName={p.productName}
            //
            description={p.description}
            //
            category={p.category}
            //
            price={p.price}
          />
        );
      });
    }
  };

  //------render transaction table--------

  // const renderTransactionTable = () => {
  //   return transactionList.map((c) => {
  //     return (
  //       <TransactionTable
  //         productName={c.productName}
  //         //
  //         quantity={c.qty}
  //         //
  //         price={c.price}
  //         //
  //       />
  //     );
  //   });
  // };

  //------category handler--------

  const onChangeCategory = (event) => {
    console.log("Search category: " + event.target.value); //checker
    dispatch(searchCategoryHandler(event.target.value));
    dispatch(
      setFilteredCategory(
        productList.filter((product) => {
          return product.category == event.target.value;
        })
      )
    );
  };

  //------get product's db--------

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  //------------------------------Driver-------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <br />
      <div className="grid grid-cols-5 bg-black">
        {/* // */}

        <div name="ProductList" className="col-span-3">
          <div spacing={3} className="grid grid-cols-3 m-2 pt-5">
            {/* Category selector */}
            <div className="col-span-2 mr-2">
              <Select onChange={onChangeCategory} name="searchCategory" placeholder="Category" size="md">
                <option value="kaos" className="text-black">
                  Kaos
                </option>
                <option value="celana" className="text-black">
                  Celana
                </option>
                <option value="aksesoris" className="text-black">
                  Aksesoris
                </option>
              </Select>
            </div>

            {/* Sort selector */}
            <Select name="sortBy" placeholder="Sort by" size="md">
              <option value="lowPrice" className="text-black">
                Lowest price first
              </option>
              <option value="highPrice" className="text-black">
                Higher price first
              </option>
              <option value="A-Z" className="text-black">
                A-Z
              </option>
              <option value="Z-A" className="text-black">
                Z-A
              </option>
            </Select>
          </div>

          {/* render products */}
          <div className="">{renderProducts()}</div>
        </div>

        {/* // */}

        <div name="TransactionTable" className="col-span-2">
          <div className="text-black p-5 col-span-2">
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
              <Center>
                <Button colorScheme="blue" className="m-2">
                  Checkout To Payment
                </Button>
              </Center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
