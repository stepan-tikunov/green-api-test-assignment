import { createContext, useContext } from "react";
import { GreenApi } from "./GreenApi";

export interface Services {
    greenApi: GreenApi;
}

const ServiceContext = createContext<Services>({} as Services);

interface ServiceProviderProps {
    services: Services;
    children: React.ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = (props) => {
    const { services, children } = props;

    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext);
