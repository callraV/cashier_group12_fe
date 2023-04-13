import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

//local contsants
import App from "./App";
import store from "./app/store";
//CSS Styles
import "./styles/index.css";
//Chakra
import { ChakraProvider } from "@chakra-ui/react";
//DOM
import { BrowserRouter } from "react-router-dom"; // <= membungkus <App> to make navigation
//Redux
import { Provider } from "react-redux"; //<= global state storage

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
