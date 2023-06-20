import React, { useEffect } from "react";
import {
    selectCredentials,
    setCredentials,
    useAppDispatch,
    useAppSelector,
} from "../state";
import { GreenApiCredentials, isGreenApiCredentials } from "../interfaces";
import { useServices } from "../service";
import { useNavigate } from "react-router";
import { RouterPaths } from "../router";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
    const { credentials, loggedIn } = useAppSelector(selectCredentials);
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const { greenApi } = useServices();

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate(RouterPaths.ROOT);
        }

        document.title = t("loginPage.title");
    });

    const handleInputChange =
        (credentialsKey: keyof GreenApiCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setCredentials({
                    [credentialsKey]: e.target.value,
                })
            );
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isGreenApiCredentials(credentials)) {
            try {
                await greenApi.login(credentials);
                return;
            } catch {}
        }
        alert(t("loginPage.invalidCredentials"));
    };

    return (
        <>
            <h1>{t("loginPage.title")}</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>idInstance: </label>
                    <input
                        type="text"
                        name="idInstance"
                        value={credentials.idInstance ?? ""}
                        onChange={handleInputChange("idInstance")}
                    />
                </div>

                <div className="input-group">
                    <label>apiTokenInstance: </label>
                    <input
                        type="text"
                        name="apiTokenInstance"
                        value={credentials.apiTokenInstance ?? ""}
                        onChange={handleInputChange("apiTokenInstance")}
                    />
                </div>

                <button type="submit">{t("loginPage.login")}</button>
            </form>
        </>
    );
};
