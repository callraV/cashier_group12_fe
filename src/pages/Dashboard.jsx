import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Stack, Button, Text, Center } from "@chakra-ui/react";

//components
import ProductCard from "../components/ProductCard";
import TransactionTable from "../components/TransactionTable";

//features
import { searchCategoryHandler, setFilteredCategory, getProducts, nextPageHandler, prevPageHandler } from "../features/products/productSlice";
import ProductCategory from "../components/ProductCategory";

function Dashboard() {
  //------declarations--------

  const dispatch = useDispatch();

  //product
  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.product.categoryList);
  const searchCategory = useSelector((state) => state.product.searchCategory); //get search category from global
  const filteredCategory = useSelector((state) => state.product.filteredCategory); //get search category from global
  const page = useSelector((state) => state.product.page);
  const itemsPerPage = useSelector((state) => state.product.itemsPerPage);
  const maxPage = useSelector((state) => state.product.maxPage);

  //transaction
  const transactionList = useSelector((state) => state.transaction.transactionList);
  const totalEnd = useSelector((state) => state.transaction.totalEnd);

  //------get product's db--------

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  //------render product list--------

  const renderProducts = () => {
    //-------pagination-------
    const beginningIndex = (page - 1) * itemsPerPage;
    const currentData = productList.slice(beginningIndex, beginningIndex + itemsPerPage);
    //-------------------------
    if (searchCategory === "") {
      return currentData.map((p) => {
        return (
          <ProductCard
            //product ID
            id={p.idproduct}
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

  // const renderCategory = () => {
  //   return categoryList.map((category) => {
  //     return <ProductCategory name={category.name} />;
  //   });
  // };
  //------render transaction table--------

  const renderTransactionTable = () => {
    return transactionList.map((c) => {
      return (
        <TransactionTable
          id={c.id}
          //
          productName={c.productName}
          //
          quantity={c.qty}
          //
          price={c.price}
          //
          //
          salesType={c.salesType}
        />
      );
    });
  };

  //------category handler--------

  const onChangeCategory = (event) => {
    console.log("Search category: " + event.target.value); //checker
    dispatch(searchCategoryHandler(event.target.value));
    dispatch(
      setFilteredCategory(
        productList.filter((product) => {
          return product.category === event.target.value;
        })
      )
    );
  };

  //------------------------------Driver-------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <div className="grid grid-cols-6">
        {/* // */}

        <div name="ProductList" className="col-span-3">
          <div spacing={3} className="grid grid-cols-3 m-5">
            {/*  */}
            {/* Category selector */}
            <div className="col-span-2 mr-2">
              <Select onChange={onChangeCategory} name="searchCategory" placeholder="All products" size="md">
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

          {/* --------- pagination ------- */}

          <Center>
            <Stack direction="row" spacing={4} align="center" mb="5">
              <Button
                onClick={() => {
                  dispatch(prevPageHandler());
                }}
                colorScheme="gray"
                color="black"
                size="sm"
              >
                Prev
              </Button>
              <Text color="white" size="sm">
                {page} out of {maxPage}
              </Text>
              <Button
                onClick={() => {
                  dispatch(nextPageHandler());
                }}
                colorScheme="gray"
                color="black"
                size="sm"
              >
                Next
              </Button>
            </Stack>
          </Center>

          {/* ------------------------------ */}
        </div>

        {/* TRANSACTION TABLE */}

        <div name="TransactionTable" className="col-span-3">
          <div className="text-black p-5 col-span-2">
            <div className="bg-white rounded-lg">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Items</Th>
                      <Th>Quantity</Th>
                      <Th>Sales Type</Th>
                      <Th isNumeric>Price (IDR)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{renderTransactionTable()}</Tbody>
                  <Tbody>
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Th>TOTAL</Th>
                      <Td isNumeric>{totalEnd}</Td>
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
