import React from "react";
import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage: React.FC = () => {
    const error = useRouteError();
    const { t } = useTranslation();

    let message: string;

    if (isRouteErrorResponse(error)) {
        message = error.statusText;
    } else if (error instanceof Error) {
        message = error.message;
    } else {
        message = t("errorPage.unknownError");
    }

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};
