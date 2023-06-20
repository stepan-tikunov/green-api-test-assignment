export interface GreenApiCredentials {
    idInstance: string;
    apiTokenInstance: string;
}

export const isGreenApiCredentials = (
    obj: unknown
): obj is GreenApiCredentials =>
    typeof obj === "object" &&
    obj !== null &&
    "idInstance" in obj &&
    typeof obj.idInstance === "string" &&
    "apiTokenInstance" in obj &&
    typeof obj.idInstance === "string";
