export class GreenApiUnauthorizedException extends Error {
    constructor() {
        super("Unauthorized");
    }
}