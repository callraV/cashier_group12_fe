import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox, Card, CardBody, Button, Center } from "@chakra-ui/react";
import * as Yup from "yup";
import { loginUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.user);
  //-----------------------Schema---------------------------------

  const logInSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please input your email")
      .email("Please enter your email"),
    password: Yup.string()
      .min(3, "Password too short")
      .required("Please input a password"),
  });

  const logInAccount = (data) => {
    console.log(data);
    setIsLoading(true);
    dispatch(loginUser(data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (userGlobal.id > 0) nav(`/Dashboard`);
  }, [userGlobal]);

  //--------------------------------------------------------------
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="bg-neutral-800 text-white min-h-screen">
          <Center>
            <Card align="center" w="40%" className="my-10">
              <p className="font-bold text-3xl text-center pt-8 pb-5">Log In</p>

              <CardBody>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={logInSchema}
                  onSubmit={(value) => {
                    logInAccount(value);
                  }}
                >
                  {/* Formik return */}
                  {(props) => {
                    return (
                      <Form>
                        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-4">
                          {/* Row 1 */}
                          <label htmlFor="email"> Email </label>
                          <div className="col-span-2">
                            <Field
                              type="text"
                              name="email"
                              className="border-2 rounded-lg text-black"
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                              style={{ color: "red" }}
                            />
                          </div>

                          {/* Row 2 */}
                          <label htmlFor="password"> Password </label>
                          <div className="col-span-2">
                            <Field
                              type="password"
                              name="password"
                              className="border-2 rounded-lg text-black"
                            />
                            <Checkbox ml="2">Show</Checkbox>
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red" }}
                            />
                          </div>

                          {/* Row 3 */}
                          <Button
                            type="submit"
                            colorScheme="blue"
                            my="2"
                            className="col-span-3"
                          >
                            Log In
                          </Button>

                          {/* Row 4 */}
                          <Button
                            onClick={() => nav("/Register")}
                            variant="ghost"
                            colorScheme="blue"
                            my="2"
                            className="col-span-3"
                          >
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
            </Card>
          </Center>
        </div>
      )}
      ;
    </div>
  );
}

export default Login;
