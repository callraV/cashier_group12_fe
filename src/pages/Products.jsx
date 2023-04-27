import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Divider,
  ButtonGroup,
  Center,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

//components
import ProductUpdateCard from "../components/ProductUpdateCard";
//features
import { searchCategoryHandler, setFilteredCategory, getProducts, nextPageHandler, prevPageHandler } from "../features/products/productSlice";
import ProductCategory from "../components/ProductCategory";

function Products() {
  //------declarations--------

  const dispatch = useDispatch();
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  //

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

        <Button
          onClick={() => {
            onOpen();
          }}
          className="col-span-3"
          colorScheme="blue"
          p="7"
        >
          Add new product
        </Button>

        {/* alert */}
        <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader fontSize="2xl">New product</AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>
              <form>
                <div>
                  <div className="border-b border-gray-900/10 pb-10">
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Product photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      {/* Product name */}
                      <div className="sm:col-span-6">
                        <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                          Product name
                        </label>
                        <div className="mt-2">
                          <input
                            id="productName"
                            name="productName"
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="Category" className="block text-sm font-medium leading-6 text-gray-900">
                          Category
                        </label>
                        <div className="mt-2">
                          <select
                            id="Category"
                            name="Category"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Kaos</option>
                            <option>Celana</option>
                            <option>Aksesoris</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                          Price
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          Description
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="description"
                            id="description"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-6 flex items-center justify-end gap-x-6">
                  <button onClick={onClose} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </AlertDialogBody>

            {/*  */}
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* render products */}
      <div>{renderProducts()}</div>

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
