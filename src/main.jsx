import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

//mantine
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colors: {
          vittlo: [
            "#B3DAEF",
            "#A6D4EC",
            "#99CEEA",
            "#8CC8E7",
            "#2A564E",
            "#2A564E",
            "#2A564E",
          ],
        },
        primaryColor: "vittlo",
      }}
    >
      <Notifications position="top-right" zIndex={99999999999999} />
      <NavigationProgress />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
