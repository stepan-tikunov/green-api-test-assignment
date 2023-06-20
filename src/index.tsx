import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { configI18n } from "./i18n";

import "./style/index.css";
import { ServiceProvider, Services } from "./service/context";
import { GreenApi } from "./service/GreenApi";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./state";

const container = document.getElementById("root")!;
const root = createRoot(container);

configI18n();

const services: Services = {
    greenApi: new GreenApi(),
};

root.render(
    <React.StrictMode>
        <ServiceProvider services={services}>
            <StoreProvider store={store}>
                <RouterProvider router={router} />
            </StoreProvider>
        </ServiceProvider>
    </React.StrictMode>
);
