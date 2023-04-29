import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Center } from "@chakra-ui/react";

//components
import ProductCard from "../components/ProductCard";
import TransactionTable from "../components/TransactionTable";

//features
import { searchCategoryHandler, setFilteredCategory, getProducts, getProductCategory, sortByHandler, setProduct } from "../features/product/productSlice";
import ProductCategory from "../components/ProductCategory";
import TabledItems from "../components/TabledItems";
import { addTransaction, addTransactionProduct } from "../features/transaction/transactionSlice";

function Dashboard() {
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
  //------render product list--------

  const renderProducts = () => {
    if (searchCategory === "") {
      return productList.map((p) => {
        return (
          <ProductCard
            //product ID
            id={p.idproduct}
            //
            productImage={p.productImage}
            //
            productName={p.name}
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
            id={p.idproduct}
            //
            productImage={p.productImage}
            //
            productName={p.name}
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

  const renderCategory = () => {
    return categoryList.map((category) => {
      return <ProductCategory name={category.name} />;
    });
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
          return product.category === event.target.value;
        })
      )
    );
    console.log(filteredCategory);
  };

  const sortingHandler = (event) => {
    dispatch(sortByHandler(event.target.value));
    if (searchCategory === "" && event.target.value === "") {
      dispatch(getProducts());
      console.log(productList);
    }
    if (event.target.value === "lowPrice") {
      let tempProductList = [...productList].sort((a, b) => {
        return a.price - b.price;
      });
      let tempFilteredProductList = [...filteredCategory].sort((a, b) => {
        return a.price - b.price;
      });
      dispatch(setProduct(tempProductList));
      dispatch(setFilteredCategory(tempFilteredProductList));
    }
    if (event.target.value === "highPrice") {
      let tempProductList = [...productList].sort((a, b) => {
        return b.price - a.price;
      });
      let tempFilteredProductList = [...filteredCategory].sort((a, b) => {
        return b.price - a.price;
      });
      dispatch(setProduct(tempProductList));
      dispatch(setFilteredCategory(tempFilteredProductList));
    }
    if (event.target.value === "A-Z") {
      let tempProductList = [...productList];
      tempProductList.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
      });
      let tempFilteredProductList = [...filteredCategory];
      tempFilteredProductList.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
      });

      dispatch(setProduct(tempProductList));
      dispatch(setFilteredCategory(tempFilteredProductList));
    }
    if (event.target.value === "Z-A") {
      let tempProductList = [...productList];
      tempProductList.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return 1;
        }
      });
      let tempFilteredProductList = [...filteredCategory];
      tempFilteredProductList.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return 1;
        }
      });

      dispatch(setProduct(tempProductList));
      dispatch(setFilteredCategory(tempFilteredProductList));
    }
  };

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
      <div className="grid grid-cols-5 bg-black">
        {/* // */}

        <div name="ProductList" className="col-span-3">
          <div spacing={3} className="grid grid-cols-3 m-2 pt-5">
            {/* Category selector */}
            <div className="col-span-2 mr-2">
              <Select onChange={onChangeCategory} name="searchCategory" placeholder="Category" size="md">
                {renderCategory()}
              </Select>
            </div>

            {/* Sort selector */}
            <Select name="sortBy" placeholder="Sort by" size="md" onChange={sortingHandler}>
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
                <Button colorScheme="blue" className="m-2" onClick={() => navigate(`/Payment/${userGlobal.id}`)}>
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
