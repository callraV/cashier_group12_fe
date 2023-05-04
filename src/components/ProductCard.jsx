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
//Yup and formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//Features
import { addToCart } from "../features/cartSlice";
import { addCart, incQuantity } from "../features/cartSlice";
import { addQuantity, decrsQuantity, resetQuantity, salesTypeHandler } from "../features/productSlice";

function ProductCard(props) {
  //---------------------Javascript Functions------------------------

  const { stock, imagePath, productName, description, category, price, idproduct, id } = props; //get values from localhost/.../products
  const productImage = `http://localhost:8000${imagePath}`;
  const dispatch = useDispatch();
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  //
  const quantity = useSelector((state) => state.product.quantity); //get quanntity global
  const salesType = useSelector((state) => state.product.salesType);
  const cartList = useSelector((state) => state.cart.cartList);

  const onChangeSalesType = (event) => {
    dispatch(salesTypeHandler(event.target.value));
  };

  const addItemToCart = (item) => {
    // console.log(id);
    const result = cartList.findIndex((itemInCart) => {
      return itemInCart.idproduct === id;
    });

    if (result === -1) {
      let tempValue = {
        ...item,
        idproduct: id,
        productName,
        category,
        quantity,
        price: quantity * price,
      };
      dispatch(addCart(tempValue));
    } else {
      let temp = {
        ...cartList[result],
        quantity: cartList[result].quantity + quantity,
      };
      let data = {
        result,
        quantity,
        addedPrice: quantity * price,
      };
      dispatch(incQuantity(data));
    }
  };

  //schema
  const SalesTypeSchema = Yup.object().shape({
    SalesType: Yup.string().required("Please select sales type"),
  });

  //-------------------------------------------------------------------

  return (
    <div>
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" m="5" p="3">
        <Image src={productImage} objectFit="cover" maxH="180px" alt={productName} borderRadius="lg" />

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
            <Text color="gray.400" py="1">
              Stock: {stock}
            </Text>
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

          <AlertDialogBody className="text-gray-400">{category}</AlertDialogBody>
          <AlertDialogBody color="blue.600" fontSize="xl">
            IDR {price * quantity}
          </AlertDialogBody>

          {/* Formik */}

          <AlertDialogBody className="pb-3">
            <Formik
              initialValues={{
                SalesType: "",
              }}
              validationSchema={SalesTypeSchema}
              onSubmit={(value) => {
                addItemToCart(value);
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
