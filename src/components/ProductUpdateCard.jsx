import React, { useState } from "react";
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
import { getProductCategory } from "../features/product/productSlice";
import ProductCategory from "../components/ProductCategory";

import { useDispatch, useSelector } from "react-redux";

//Yup and formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ProductUpdateCard(props) {
  //---------------------Javascript Functions------------------------

  const { id, productName, price, productImage, description, category } = props; //get values from localhost/.../products
  const dispatch = useDispatch();
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const categoryList = useSelector((state) => state.product.categoryList);

  //------photo update--------
  const [file, setFile] = useState(null);
  const onFileChange = (event) => {
    console.log(event.target.files[0]); //checker
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagePrev");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  //send to backend
  const uploadUpdate = async () => {
    //create form data (postman)

    // let formData = new FormData();
    // formData.append("id", JSON.stringify({ id }));
    // formData.append("photo", file);

    let newName = document.getElementById("productName").value;
    let newCategory = document.getElementById("productCategory").value;
    let newPrice = document.getElementById("productPrice").value;
    let newDesc = document.getElementById("productDescription").value;

    if (file) {
      console.log("id: " + id + "\nnew image: " + file.name + "\nnew name: " + newName + "\nnew category: " + newCategory + "\nnew price: " + newPrice + "\nnew desc: " + newDesc);
    } else {
      console.log("id: " + id + "\n" + JSON.stringify({ productImage }) + "\nnew name: " + newName + "\nnew category: " + newCategory + "\nnew price: " + newPrice + "\nnew desc: " + newDesc);
    }
  };

  const renderCategory = () => {
    return categoryList.map((category) => {
      return <ProductCategory name={category.name} />;
    });
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
              Deactivate
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
            <div>
              <div className="border-b border-gray-900/10 pb-5">
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                      Product photo
                    </label>
                    <div className="mt-2 flex justify-center">
                      <div>
                        <Image id="imagePrev" boxSize="350px" objectFit="cover" src={productImage} />

                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="productImage"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Update image</span>
                            <input
                              onChange={(event) => {
                                onFileChange(event);
                              }}
                              id="productImage"
                              name="productImage"
                              type="file"
                              className="sr-only"
                            />
                          </label>
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
                  <div className="sm:col-span-1">
                    <label htmlFor="productId" className="block text-sm font-medium leading-6 text-gray-900">
                      ID
                    </label>
                    <div className="mt-2 py-1 px-3 rounded border border-neutral-300">{id}</div>
                  </div>
                  <div className="sm:col-span-5">
                    <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                      Product name
                    </label>
                    <div className="mt-2">
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        placeholder={productName}
                        defaultValue={productName}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                        <option selected disabled hidden>
                          {category}
                        </option>
                        {renderCategory()}
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
                        <input
                          type="number"
                          name="productPrice"
                          id="productPrice"
                          placeholder={price}
                          defaultValue={price}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="productDescription" className="block text-sm font-medium leading-6 text-gray-900">
                      Stock
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="productDescription"
                        id="productDescription"
                        placeholder={description}
                        defaultValue={description}
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
                onClick={uploadUpdate}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </AlertDialogBody>

          {/*  */}
        </AlertDialogContent>
      </AlertDialog>
      {/*  */}
    </div>
  );
}

export default ProductUpdateCard;
