import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { selectCredentials, useAppSelector } from "../state";
import { useEffect } from "react";
import { useServices } from "../service";

export const PageLayout: React.FC = () => {
    const { loggedIn } = useAppSelector(selectCredentials);
    const { greenApi } = useServices();

    useEffect(() => {
        if (loggedIn) {
            const poll = async () => {
                await greenApi.receiveNotification();
                setTimeout(poll, 0);
            };

            greenApi.addLoginHook(poll);
        }
    }, [loggedIn, greenApi])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};
