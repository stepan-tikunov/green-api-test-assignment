import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    DeleteNotificationResponse,
    GetStateInstanceResponse,
    GreenApiCredentials,
    ReceiveNotificationResponse,
    SendMessageRequest,
    SendMessageResponse,
    isGreenApiCredentials,
} from "../interfaces";
import {
    clearCredentials,
    selectCredentials,
    setCredentials,
    setLoggedIn,
    store,
} from "../state";
import { GreenApiUnauthorizedException } from "../exceptions";

type Method<Resp, Req = undefined> = {
    request: Req;
    response: Resp;
};

type GreenApiGetMethods = {
    getStateInstance: Method<GetStateInstanceResponse>;
    receiveNotification: Method<ReceiveNotificationResponse>;
};

type GreenApiPostMethods = {
    sendMessage: Method<SendMessageResponse, SendMessageRequest>;
};

type GreenApiDeleteMethods = {
    deleteNotification: Method<DeleteNotificationResponse, number>;
};

type LoginHook = () => any;

export class GreenApi {
    private api: AxiosInstance | null = null;
    private credentials: GreenApiCredentials | null = null;
    private loginHooks: LoginHook[] = [];

    constructor() {
        const { credentials } = selectCredentials(store.getState());

        if (isGreenApiCredentials(credentials)) {
            this.login(credentials);
        }
    }

    async login(credentials: GreenApiCredentials) {
        this.credentials = credentials;
        this.api = axios.create({
            baseURL: `https://api.green-api.com/waInstance${credentials.idInstance}/`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        try {
            const response = await this.apiGet("getStateInstance");
            console.log(response.data);

            if (response.data.stateInstance === "authorized") {
                store.dispatch(setCredentials(credentials));
                store.dispatch(setLoggedIn(true));
                this.loginHooks.forEach((callback) => {
                    callback()
                });
            }
        } catch (e) {
            throw new GreenApiUnauthorizedException();
        }
    }

    async addLoginHook(callback: LoginHook) {
        if (this.api !== null && this.credentials !== null) {
            callback();
        } else {
            this.loginHooks.push(callback);
        }
    }

    async sendMessage(request: SendMessageRequest) {
        return await this.apiPost("sendMessage", request);
    }

    async receiveNotification() {
        const notification = (await this.apiGet("receiveNotification")).data;

        if (notification === null) {
            return;
        }

        console.log(notification.body);

        return this.apiDelete("deleteNotification", notification.receiptId);
    }

    logout() {
        store.dispatch(clearCredentials());
        store.dispatch(setLoggedIn(false));
    }

    private async apiGet<K extends keyof GreenApiGetMethods>(
        method: K,
        body?: GreenApiGetMethods[K]["request"]
    ): Promise<AxiosResponse<GreenApiGetMethods[K]["response"]>> {
        if (this.api === null || this.credentials === null) {
            throw new GreenApiUnauthorizedException();
        }

        let urlBody = "";

        if (body) {
            urlBody = `/${body}`;
        }

        const response = await this.api.get<GreenApiGetMethods[K]["response"]>(
            `${method}/${this.credentials.apiTokenInstance}${urlBody}`
        );

        return response;
    }

    private async apiPost<K extends keyof GreenApiPostMethods>(
        method: K,
        body?: GreenApiPostMethods[K]["request"]
    ) {
        if (this.api === null || this.credentials === null) {
            throw new GreenApiUnauthorizedException();
        }

        const response = await this.api.post<
            GreenApiPostMethods[K]["response"]
        >(`${method}/${this.credentials.apiTokenInstance}`, body);

        return response;
    }

    private async apiDelete<K extends keyof GreenApiDeleteMethods>(
        method: K,
        body?: GreenApiDeleteMethods[K]["request"]
    ) {
        if (this.api === null || this.credentials === null) {
            throw new GreenApiUnauthorizedException();
        }

        let urlBody = "";

        if (body) {
            urlBody = `/${body}`;
        }

        const response = await this.api.delete<
            GreenApiDeleteMethods[K]["response"]
        >(`${method}/${this.credentials.apiTokenInstance}${urlBody}`);

        return response;
    }
}
