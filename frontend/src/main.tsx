import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root";
import App from "./App";
import Layout from "./Components/Layout";
import "./css/style.css";

import { ApplicationContextProvider } from "./Contexts/ApplicationContext";
import AppBar from "./Components/AppBar";
const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <ApplicationContextProvider>
    <AppBar />
    <Layout />
  </ApplicationContextProvider>
);
