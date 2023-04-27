import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Stack, Button, Text, Center } from "@chakra-ui/react";

//components
import ProductUpdateCard from "../components/ProductUpdateCard";
import TransactionTable from "../components/TransactionTable";

//features
import { searchCategoryHandler, setFilteredCategory, getProducts, nextPageHandler, prevPageHandler } from "../features/products/productSlice";
import ProductCategory from "../components/ProductCategory";

function Products() {
  //------declarations--------

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.product.categoryList);
  const searchCategory = useSelector((state) => state.product.searchCategory); //get search category from global
  const filteredCategory = useSelector((state) => state.product.filteredCategory); //get search category from global
  const page = useSelector((state) => state.product.page);
  const itemsPerPage = useSelector((state) => state.product.itemsPerPage);
  const maxPage = useSelector((state) => state.product.maxPage);

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
          <ProductUpdateCard
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
          <ProductUpdateCard
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
      {/* // */}

      <div spacing={3} className="grid grid-cols-3 pt-5 px-5">
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
  );
}

export default Products;
