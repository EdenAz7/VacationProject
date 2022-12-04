import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout/Layout";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';
import interceptorsService from "./utils/interceptorsService";
import socketIoService from "./utils/SocketIoService";

interceptorsService.createInterceptors(); // create access to token service

socketIoService.connect(); //connect to SocketIoService

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Layout />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();