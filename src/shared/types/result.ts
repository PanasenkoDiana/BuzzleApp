export interface Success<T> {
    status: "success",
    data: T
}

export interface Error {
    status: "error",
    message: string
}

export type Result<T> = Success<T> | Error