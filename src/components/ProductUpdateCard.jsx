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
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" pb="0">
            {productName}
          </AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody color="gray.500" fontSize="lg"></AlertDialogBody>

          {/*  */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProductUpdateCard;
