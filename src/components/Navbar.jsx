import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
//Chakra icons
import { Icon } from "@chakra-ui/react";
import { MdReceipt, MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";

function Navigation() {
  const nav = useNavigate();
  const userGlobal = useSelector((state) => state.user.user);

  //-----------------------------

  useEffect(() => {}, []);

  //------------------------------

  return (
    <div className="top-0 z-40 bg-black text-white px-4 py-3 ">
      <div className="flex flex-row justify-between gap-4">
        <button className="hover:text-gray-500" onClick={() => nav("/Register")}>
          Logo Ecommerce
        </button>

        <div className="flex flex-row gap-10 items-center h-10">
          <button className="hover:text-gray-500" onClick={() => nav(`/Dashboard/${userGlobal.id}`)}>
            Dashboard
          </button>
          <button className="hover:text-gray-500" onClick={() => nav(`/Products/${userGlobal.id}`)}>
            Products
          </button>
          <button className="hover:text-gray-500" onClick={() => nav(`Transaction/${userGlobal.id}`)}>
            <Icon as={MdReceipt} boxSize={5} />
          </button>
          <div className="flex flex-row gap-5">
            <button className="hover:cursor-pointer" onClick={() => nav(`/Register`)}>
              Register
            </button>
            <button className="hover:cursor-pointer" onClick={() => nav(`/Login`)}>
              Login
            </button>
          </div>
          <button className="hover:text-gray-500" onClick={() => nav("/Login")}>
            <Icon as={MdAccountCircle} boxSize={5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
