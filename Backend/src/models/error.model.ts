export class ApplicationError extends Error {
    readonly errorCode: number;

    constructor(errorCode: number, errorMessage: string) {
        super(errorMessage);
        this.errorCode = errorCode;
    }
}
