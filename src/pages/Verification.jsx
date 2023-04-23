import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function Verification() {
  //destructuring the token from useParams
  let { token } = useParams();
  const navigate = useNavigate();

  const tokenVerification = async () => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/user/verification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate(`/Login`);
      }
    } catch (error) {}
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <div>{token}</div>
      <div>This is verification page</div>
    </div>
  );
}

export default Verification;
