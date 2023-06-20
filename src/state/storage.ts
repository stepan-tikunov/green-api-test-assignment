import { RootState, isRootState } from "./store";

export const loadState = (): RootState | undefined => {
    const json = localStorage.getItem("state");

    if (json === null) {
        return undefined;
    }

    try {
        const state = JSON.parse(json);

        if (isRootState(state)) {
            return state;
        }
    } catch {
        localStorage.removeItem("state");
    }
};

export const saveState = (state: RootState) => {
    localStorage.setItem("state", JSON.stringify(state));
};
