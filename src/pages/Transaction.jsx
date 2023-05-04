import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Select } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { differenceInDays, add } from "date-fns";
import { resetGrossIncomeList } from "../features/transaction/transactionSlice";
// import CartItem from "../components/CartItem";
// import CartTable from "../components/CartTable";
// import { getTotalPrice } from "../features/store/cartSlice";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  fetchAllTransaction,
  fetchTransactionOnDateRange,
} from "../features/transaction/transactionSlice";
import Datepicker from "react-tailwindcss-datepicker";
import TransactionTable from "../components/TransactionTable";
import TopProduct from "../components/TopProduct";
import {
  getTopProduct,
  getCategoryProduct,
} from "../features/transaction/transactionSlice";
import TopProductCategory from "../components/TopProductCategory";
import { filterCategoryProduct } from "../features/transaction/transactionSlice";

function Transaction() {
  const [sortPlaceHolder, setSortPlaceHolder] = useState("Sort by");
  const [isTopProduct, setIsTopProduct] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const grossIncome = useSelector((state) => state.transaction.grossIncome);
  const transactionList = useSelector(
    (state) => state.transaction.transaction.transactionList
  );
  const topProductList = useSelector((state) => state.transaction.topProduct);
  const categoryProduct = useSelector(
    (state) => state.transaction.categoryProduct
  );

  const filteredProduct = useSelector(
    (state) => state.transaction.filteredProduct
  );
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.user);
  // const { id } = userGlobal;
  const { id } = useParams();

  const handleValueChange = async (newValue) => {
    setIsTopProduct(true);
    setSortPlaceHolder("Sort by");

    if (document.getElementById("sorting").value !== "") {
      document.getElementById("sorting").value = "Sort by";
    }

    // console.log("newValue:", newValue);
    const status = await dispatch(fetchTransactionOnDateRange(id, newValue));
    // dispatch(fetchAllTransaction(id));
    if (status === false) {
      const now = format(Date.now(), "yyyy-MM-dd");
      const sevenDaysAgo = format(add(Date.now(), { days: -7 }), "yyyy-MM-dd");
      dispatch(fetchAllTransaction(id));
      let curval = { startDate: sevenDaysAgo, endDate: now };
      setValue({ ...value, ...curval });
    } else if (status === true) {
      // console.log(newValue);
      setValue(newValue);
    }
  };

  const sortingProductHandler = (event) => {
    setSortPlaceHolder(event.target.value);
    if (event.target.value) {
      dispatch(getTopProduct(id));
      setIsTopProduct(false);
    } else {
      setIsTopProduct(true);
    }
  };

  const sortingProductCategoryHandler = (event) => {
    setProductCategory(event.target.value);
  };

  const renderTransactionList = () => {
    const sortByIdTransaction = transactionList.reduce(
      (accumulator, current, index) => {
        const key = current.idtransaction;
        const curGroup = accumulator[key] ?? [];

        return { ...accumulator, [key]: [...curGroup, current] };
      },
      {}
    );

    const transKeyVal = Object.entries(sortByIdTransaction);
    // console.log(transKeyVal);
    return transKeyVal.map(([idtrans, transData]) => {
      return (
        <div className="bg-white rounded-lg mb-5">
          <div className="flex flex-row justify-between">
            <Text as="b" fontSize={"md"} ml={"6"} my={"4"}>
              ID Transaction: {idtrans}
            </Text>
            <Text as="b" fontSize={"md"} mr={"6"} my={"4"}>
              Date: {format(parseISO(transData[0].date), "dd-MMMM-yyyy")}
            </Text>
          </div>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Items</Th>
                  <Th>Quantity</Th>
                  <Th isNumeric>Price (IDR)</Th>
                </Tr>
              </Thead>
              <Tbody>{tabledTransaction(transData)}</Tbody>
              <Tbody>
                <Tr>
                  <Td></Td>
                  <Th>TOTAL</Th>
                  <Td isNumeric>Rp.{transData[0].totalPrice},00</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      );
    });
  };

  const renderTopProduct = () => {
    if (productCategory === "") {
      return (
        <div>
          <div className="flex flex-row relative rounded-t-lg h-14 bg-white text-black justify-between mx-32 mt-14 font-bold font-roboto text-xl">
            <div className="my-auto absolute bg-blue-400 text-black rounded rounded-md -top-10 -left-14 p-2">
              Top Selling Product for All Category
            </div>
            <div className="ml-5 my-auto">Product Name</div>
            <div className="mr-5 my-auto">Sold Quantity</div>
          </div>
          <TopProduct props={topProductList} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="flex flex-row relative rounded-t-lg h-14 bg-white text-black justify-between mx-32 mt-14 font-bold font-roboto text-xl">
            <div className="my-auto absolute bg-blue-400 text-black rounded rounded-md -top-10 -left-14 p-2">
              Top Selling Product for Category: {productCategory}
            </div>
            <div className="ml-5 my-auto">Product Name</div>
            <div className="mr-5 my-auto">Sold Quantity</div>
          </div>
          <TopProductCategory props={filteredProduct} />
        </div>
      );
    }
  };

  const renderCategoryList = () => {
    return categoryProduct.map((val) => {
      return (
        <option
          onClick={(e) => {
            setProductCategory(e.target.value);
            dispatch(filterCategoryProduct(productCategory));
          }}
        >
          {val}
        </option>
      );
    });
  };

  const tabledTransaction = (data) => {
    // console.log(data);
    return data.map((transaction) => {
      return <TransactionTable transData={transaction} />;
    });
  };

  useEffect(() => {
    setIsTopProduct(true);
    dispatch(fetchAllTransaction(id));
  }, []);

  //----------------------------------------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <p className="font-bold text-2xl px-8 pt-4">TRANSACTION HISTORY</p>
      <div className="flex flex-row max-w-lg ml-6 mt-6">
        <Datepicker
          primaryColor="rose"
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
        />
        <Select
          id="sorting"
          name="sortBy"
          value={sortPlaceHolder}
          placeholder="Sort by"
          onChange={sortingProductHandler}
        >
          <option value="topProduct">Top Product</option>
        </Select>
        {!isTopProduct ? (
          <Select
            id="sortingCategory"
            name="sortByCategory"
            value={productCategory}
            placeholder="Sort By Category"
            onChange={sortingProductCategoryHandler}
          >
            {renderCategoryList()}
          </Select>
        ) : null}
      </div>
      <div>
        {differenceInDays(
          parseISO(value.endDate),
          parseISO(value.startDate)
        ) ? (
          <h2 className="font-bold flex flex-col justify-center text-xl h-24 px-8 mt-8 text-black bg-gray-300">
            GROSS INCOME : Rp.{grossIncome},00
          </h2>
        ) : (
          <h2 className="font-bold flex flex-col justify-center text-xl h-24 px-8 mt-8 text-black bg-gray-300">
            GROSS INCOME : Rp.{grossIncome},00
          </h2>
        )}
      </div>
      <div>
        {isTopProduct === true ? (
          <div className="grid grid-cols-1 text-black m-7 gap-x-5 col-span-5 max-h-fit md:grid-cols-2">
            {renderTransactionList()}
          </div>
        ) : (
          renderTopProduct()
        )}

        <div className="col-span-3 pr-8 py-2">
          <p>{/* Items */}</p>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
