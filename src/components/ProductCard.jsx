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
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, decrsQuantity, resetQuantity, salesTypeHandler } from "../features/products/productSlice";
//Yup and formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//Features
import { addToTransaction } from "../features/transactions/transactionSlice";

function ProductCard(props) {
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
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" m="5" p="3">
        <Image src={productImage} maxH="180px" alt={productName} borderRadius="lg" />

        <Stack>
          <CardBody>
            <Heading size="md" color="gray.800">
              {productName}
            </Heading>

            <Text color="gray.500" size="xl" pt="2">
              {category}
            </Text>
            <Text py="2">{description} </Text>
            <Button
              onClick={() => {
                onOpen();
                dispatch(resetQuantity());
              }}
              variant="solid"
              colorScheme="blue"
              mt="3"
            >
              Add
            </Button>
          </CardBody>
        </Stack>
      </Card>

      {/* ----- */}

      {/* alert */}
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" pb="0">
            {productName}
          </AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody color="gray.500" fontSize="lg">
            {category}
          </AlertDialogBody>
          <AlertDialogBody color="blue.600" fontSize="xl">
            IDR {price}
          </AlertDialogBody>

          {/* Formik */}

          <AlertDialogBody className="pb-3">
            <Formik
              initialValues={{
                SalesType: "",
              }}
              validationSchema={SalesTypeSchema}
              onSubmit={() => {
                addTransaction();
                onClose();
              }}
            >
              {() => (
                <Form>
                  <div className="flex gap-2">
                    <div id="my-radio-group">Sales Type: </div>
                    <div role="group" name="SalesType" aria-labelledby="my-radio-group" onChange={onChangeSalesType}>
                      <label>
                        <Field type="radio" name="SalesType" value="Dine-in" className="ml-2" /> Dine-in
                      </label>
                      <label>
                        <Field type="radio" name="SalesType" value="Take Away" className="ml-2" /> Take Away
                      </label>
                      <label>
                        <Field type="radio" name="SalesType" value="Go Food" className="ml-2" /> Go Food
                      </label>
                      <ErrorMessage component="div" name="SalesType" style={{ color: "red" }} />
                    </div>
                  </div>

                  <div className="flex py-5">
                    Quantity:
                    <Button className="ml-6" onClick={() => dispatch(decrsQuantity())}>
                      -
                    </Button>
                    <Text px="5" py="2" className="text-gray-600">
                      {quantity}
                    </Text>
                    <Button onClick={() => dispatch(addQuantity())}>+</Button>
                  </div>

                  <Center>
                    <Button type="submit" colorScheme="blue" mb="3" px="150">
                      Add item
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </AlertDialogBody>

          {/*  */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProductCard;