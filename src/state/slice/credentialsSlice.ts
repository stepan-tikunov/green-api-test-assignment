import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GreenApiCredentials } from "../../interfaces";

export interface CredentialsState {
    credentials: Partial<GreenApiCredentials>;
    loggedIn: boolean;
}

export const isCredentialsState = (obj: unknown): obj is CredentialsState =>
    typeof obj === "object" &&
    obj !== null &&
    "credentials" in obj &&
    typeof obj.credentials === "object" &&
    obj.credentials !== null &&
    "loggedIn" in obj &&
    typeof obj.loggedIn === "boolean";

const UNSET: CredentialsState = {
    credentials: {
        idInstance: undefined,
        apiTokenInstance: undefined,
    },
    loggedIn: false,
};

const initialState = Object.assign({}, UNSET);

export const credentialsSlice = createSlice({
    name: "credentials",
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload }: PayloadAction<CredentialsState["credentials"]>
        ) => {
            Object.assign(state.credentials, payload);
        },
        setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
            state.loggedIn = payload;
        },
        clearCredentials: (state) => {
            Object.assign(state, UNSET);
        },
    },
});

export const { setCredentials, setLoggedIn, clearCredentials } =
    credentialsSlice.actions;

export const selectCredentials = (state: RootState) => {
    return state.credentials;
};

export const credentialsReducer = credentialsSlice.reducer;
