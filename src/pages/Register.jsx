import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Please input your name"),
    password: Yup.string()
      .min(5, "Password minimum 5 character")
      .required("Please input your password"),
    email: Yup.string()
      .required("Please input your email")
      .email("Wrong email format"),
    phone: Yup.number()
      .required("Please input your phone number")
      .min(10, "Phone minimum 10 number"),
    storeName: Yup.string().required("Please input your store name"),
  });

  const navigate = useNavigate();

  const registerAccount = async (data) => {
    try {
      console.log(data);
      setIsLoading(true);
      let response = await Axios.post(
        "http://localhost:8000/user/register",
        data
      );
      console.log(response);
      if (!response.data.success) {
        // console.log("Email already exist");
        alert("Email already exist, Redirecting to Login Page");
        setIsLoading(false);
        navigate("/Login");
      }
      alert("Please verify your account, redirecting to Login Page");
      setIsLoading(false);
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
            storeName: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(value) => {
            // alert("I am Submit!!!");
            // console.log(value);
            registerAccount(value);
          }}
        >
          {(props) => {
            return (
              <>
                <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                  <div className="w-full max-w-md space-y-8">
                    <div>
                      <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register your account
                      </h2>
                    </div>
                    <Form className="mt-8 space-y-6" action="#" method="POST">
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                          <label htmlFor="name" className="sr-only">
                            Name
                          </label>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            autoComplete=""
                            required
                            className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Name"
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>
                        <div>
                          <label htmlFor="email-address" className="sr-only">
                            Email Address
                          </label>
                          <Field
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                          />
                          <ErrorMessage
                            component="div"
                            name="email"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            autoComplete=""
                            required
                            className="relative block w-full rounded-b-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="sr-only">
                            Phone
                          </label>
                          <Field
                            id="phone"
                            name="phone"
                            type="phone"
                            autoComplete=""
                            required
                            className="relative block w-full rounded-b-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            component="div"
                            name="phone"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>
                        <div>
                          <label htmlFor="storeName" className="sr-only">
                            Phone
                          </label>
                          <Field
                            id="storeName"
                            name="storeName"
                            type="storeName"
                            autoComplete=""
                            required
                            className="relative block w-full rounded-b-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Store Name"
                          />
                          <ErrorMessage
                            component="div"
                            name="storeName"
                            style={{ color: "red", fontSize: "12px" }}
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign in
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default Register;
