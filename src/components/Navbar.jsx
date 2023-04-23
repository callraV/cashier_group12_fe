import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
//Chakra icons
import { Icon } from "@chakra-ui/react";
import { MdReceipt, MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";

function Navigation() {
  const nav = useNavigate();
  const userId = useSelector((state) => state.user);
  console.log(userId);

  //-----------------------------

  useEffect(() => {
    //
  }, []);

  //------------------------------

  return (
    <div className="sticky top-0 z-40 bg-black text-white flex px-4 py-3 ">
      <div className="flex flex-row gap-4">
        <button
          className="hover:text-gray-500"
          onClick={() => nav("/Dashboard")}
        >
          Dashboard
        </button>
        <button
          className="hover:text-gray-500"
          onClick={() => nav("/Transaction")}
        >
          <Icon as={MdReceipt} boxSize={5} />
        </button>
        <div className="flex flex-row gap-10 items-center h-10">
          <button className="hover:text-gray-500" onClick={() => nav("/Login")}>
            <Icon as={MdAccountCircle} boxSize={5} />
          </button>
          <div className="flex flex-row gap-5 ">
            <button
              className="hover:cursor-pointer"
              onClick={() => nav(`/Register`)}
            >
              Register
            </button>
            <button
              className="hover:cursor-pointer"
              onClick={() => nav(`/Login`)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
