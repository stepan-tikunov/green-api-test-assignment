import React from "react";
import { useServices } from "../service";
import { useTranslation } from "react-i18next";
import { selectCredentials, useAppSelector } from "../state";

export const Header: React.FC = () => {
    const { greenApi } = useServices();
    const { loggedIn } = useAppSelector(selectCredentials);

    const { t } = useTranslation();

    return (
        <header>
            <span>Green API Test Assignment</span>
            {loggedIn && (
                <button type="button" onClick={() => greenApi.logout()}>
                    {t("navbar.logout")}
                </button>
            )}
        </header>
    );
};
