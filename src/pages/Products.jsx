import React, { useEffect, useState } from "react";
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
//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
//Yup
import * as Yup from "yup";

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

    return currentData.map((p) => {
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

  //------new product upload--------
  const [file, setFile] = useState(null);
  const onFileChange = (event) => {
    console.log(event.target.files[0]); //checker
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagePrev");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const uploadNewProduct = async () => {
    //create form data (postman)

    // let formData = new FormData();
    // formData.append("id", JSON.stringify({ id }));
    // formData.append("photo", file);

    let newName = document.getElementById("productName").value;
    let newCategory = document.getElementById("productCategory").value;
    let newPrice = document.getElementById("productPrice").value;
    let newDesc = document.getElementById("productDescription").value;

    console.log("name: " + newName + "\nimage: " + file.name + "\ncategory: " + newCategory + "\nprice: " + newPrice + "\ndesc: " + newDesc);
  };

  //------new product schema--------
  const newProductSchema = Yup.object().shape({
    // productImage: Yup.mixed().required("Please upload an image"), //NOT WORKING
    productName: Yup.string().required("Please input a name"),
    productPrice: Yup.number().min(100, "Min price = IDR 100").required("Please input a price"),
    productDescription: Yup.string().required("Please input a desciption"),
  });

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
              <Formik
                initialValues={{ productImage: "", productName: "", productPrice: "", productDescription: "" }}
                validationSchema={newProductSchema}
                onSubmit={(value) => {
                  uploadNewProduct();
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <div>
                        <div className="border-b border-gray-900/10 pb-5">
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                              <label htmlFor="productImage" className="block text-sm font-medium leading-6 text-gray-900">
                                Product photo
                              </label>
                              <div className="mt-2 flex justify-center">
                                <div>
                                  <Image id="imagePrev" boxSize="350px" objectFit="cover" />

                                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                      htmlFor="productImage"
                                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload image</span>
                                      <Field onChange={onFileChange} id="productImage" name="productImage" type="file" className="sr-only" />
                                      <p className="text-xs mb-2 leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>

                                      <ErrorMessage component="div" name="productImage" style={{ color: "red" }} />
                                    </label>
                                  </div>
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
                                <Field
                                  id="productName"
                                  name="productName"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <ErrorMessage component="div" name="productName" style={{ color: "red" }} />
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="productCategory" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                              </label>
                              <div className="mt-2">
                                <select
                                  id="productCategory"
                                  name="productCategory"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>kaos</option>
                                  <option>celana</option>
                                  <option>aksesoris</option>
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="productPrice" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                              </label>
                              <div className="grid grid-cols-5">
                                <text className="mt-3 col-span-1">IDR</text>
                                <div className="mt-2 col-span-4">
                                  <Field
                                    type="number"
                                    name="productPrice"
                                    id="productPrice"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                <ErrorMessage className="col-span-full" component="div" name="productPrice" style={{ color: "red" }} />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="productDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="productDescription"
                                  id="productDescription"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <ErrorMessage component="div" name="productDescription" style={{ color: "red" }} />
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
                    </Form>
                  );
                }}
              </Formik>
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
