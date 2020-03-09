export class APIData<T> {
    constructor(public data: T, public  error?: Error, public meta?: any) {
    }
}

export interface Status {
    status: DataStatus;
    error?: Error;
}

export interface Error {
    errorCode: string;
    errorMsg: string;
    errorDetail?: string;
}

export enum DataStatus {
    Loading = "Loading",
    Loaded = "Loaded",
    ErrorState = "ErrorState"
}