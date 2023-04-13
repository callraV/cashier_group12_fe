import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
//Chakra icons
import { Icon } from "@chakra-ui/react";
import { MdReceipt, MdAccountCircle } from "react-icons/md";

function Navigation() {
  const nav = useNavigate();

  //-----------------------------

  useEffect(() => {
    //
  }, []);

  //------------------------------

  return (
    <div className="sticky top-0 z-40 bg-black text-white flex px-4 py-3 ">
      <div className="flex flex-row gap-4">
        <button className="hover:text-gray-500" onClick={() => nav("/Dashboard")}>
          Dashboard
        </button>
        <button className="hover:text-gray-500" onClick={() => nav("/Transaction")}>
          <Icon as={MdReceipt} boxSize={5} />
        </button>
        <button className="hover:text-gray-500" onClick={() => nav("/Login")}>
          <Icon as={MdAccountCircle} boxSize={5} />
        </button>
      </div>
    </div>
  );
}

export default Navigation;
