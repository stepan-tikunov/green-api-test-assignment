import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RouterPaths } from "../router";
import { useTranslation } from "react-i18next";
import { selectCredentials, useAppSelector } from "../state";
import { useServices } from "../service";

export const RootPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { loggedIn } = useAppSelector(selectCredentials);
    const { greenApi } = useServices();

    useEffect(() => {
        if (!loggedIn) {
            navigate(RouterPaths.LOGIN);
        }

        document.title = t("rootPage.title");
    });

    const [chatId, setChatId] = useState("");
    const [message, setMessage] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log(chatId, message);
                greenApi.sendMessage({ chatId, message });
            }}
        >
            <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
            />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">Send</button>
        </form>
    );
};
