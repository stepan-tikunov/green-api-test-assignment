import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "./page/RootPage";
import { ErrorPage } from "./page/ErrorPage";
import { PageLayout } from "./page/PageLayout";
import { LoginPage } from "./page/LoginPage";

export enum RouterPaths {
    ROOT = "/",
    LOGIN = "/login"
}

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: RouterPaths.ROOT,
                element: <RootPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: RouterPaths.LOGIN,
                element: <LoginPage />
            },
        ],
    },
]);
