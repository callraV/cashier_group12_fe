import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
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

function Transaction() {
  const grossIncome = useSelector((state) => state.transaction.grossIncome);
  const transactionList = useSelector(
    (state) => state.transaction.transaction.transactionList
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
      console.log(newValue);
      setValue(newValue);
    }
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

    // console.log(unique);
  };

  const tabledTransaction = (data) => {
    // console.log(data);
    return data.map((transaction) => {
      return <TransactionTable transData={transaction} />;
    });
  };

  useEffect(() => {
    dispatch(fetchAllTransaction(id));
  }, []);

  //----------------------------------------------------------------
  return (
    <div className="bg-neutral-800 text-white min-h-screen">
      <p className="font-bold text-2xl px-8 pt-4">Transaction History</p>
      <div className="max-w-fit ml-6 mt-6">
        <Datepicker
          primaryColor="rose"
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
        />
      </div>
      <div>
        {differenceInDays(
          parseISO(value.endDate),
          parseISO(value.startDate)
        ) ? (
          <h2 className="font-bold text-xl px-8 pt-4">
            Gross Income : Rp.{grossIncome},00
          </h2>
        ) : (
          <h2 className="font-bold text-xl px-8 pt-4">
            Gross Income for the pass 7 days : Rp.{grossIncome},00
          </h2>
        )}
      </div>
      <div className="grid grid-cols-5">
        {/* Total in cart */}
        <div className=" text-black m-7 col-span-3 max-h-fit">
          {renderTransactionList()}
        </div>

        <div className="col-span-3 pr-8 py-2">
          <p>{/* Items */}</p>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
