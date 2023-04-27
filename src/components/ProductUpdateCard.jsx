import React from "react";
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
  Stack,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Text,
  Center,
} from "@chakra-ui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { addQuantity, decrsQuantity, resetQuantity, salesTypeHandler } from "../features/products/productSlice";
//Yup and formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//Features
import { addToTransaction } from "../features/transactions/transactionSlice";

function ProductUpdateCard(props) {
  //---------------------Javascript Functions------------------------

  const { id, productName, price, productImage, description, category } = props; //get values from localhost/.../products
  const dispatch = useDispatch();
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  //
  const quantity = useSelector((state) => state.product.quantity); //get quanntity global
  const salesType = useSelector((state) => state.product.salesType);

  const onChangeSalesType = (event) => {
    dispatch(salesTypeHandler(event.target.value));
  };
  //schema
  const SalesTypeSchema = Yup.object().shape({
    SalesType: Yup.string().required("Please select sales type"),
  });
  const addTransaction = () => {
    dispatch(
      addToTransaction({
        productId: id,
        productName: productName,
        description: description,
        category: category,
        price: price,
        salesType: salesType,
        qty: quantity,
        totalPrice: quantity * price,
      })
    );
    // console.log(dispatch(checkCart()));
  };

  //-------------------------------------------------------------------

  return (
    <div>
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" m="5" px="3">
        <Center>
          <Image src={productImage} maxH="180px" alt={productName} borderRadius="lg" />
        </Center>

        <Stack>
          <CardBody>
            <Heading size="md" color="gray.800">
              {productName}
            </Heading>

            <Text color="gray.500" size="xl" py="2">
              {category}
            </Text>

            <Text color="blue.600" fontSize="xl">
              IDR {price}
            </Text>
            <Text py="2">{description} </Text>
            <Button
              onClick={() => {
                onOpen();
              }}
              colorScheme="green"
              mt="3"
            >
              Update
            </Button>
            <Button colorScheme="red" mt="3" mx="2">
              Delete
            </Button>
          </CardBody>
        </Stack>
      </Card>

      {/* ----- */}

      {/* alert */}
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" pb="0">
            Update product
          </AlertDialogHeader>

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
                  Save
                </button>
              </div>
            </form>
          </AlertDialogBody>

          {/*  */}
        </AlertDialogContent>
      </AlertDialog>
      {/*  */}
    </div>
  );
}

export default ProductUpdateCard;
