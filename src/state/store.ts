import { configureStore } from "@reduxjs/toolkit";
import {
    CredentialsState,
    credentialsReducer,
    isCredentialsState,
} from "./slice";
import { loadState, saveState } from "./storage";

export interface RootState {
    credentials: CredentialsState;
}

export const isRootState = (state: unknown): state is RootState => {
    return (
        typeof state === "object" &&
        state !== null &&
        "credentials" in state &&
        isCredentialsState(state.credentials)
    );
};

export const store = configureStore({
    reducer: {
        credentials: credentialsReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
