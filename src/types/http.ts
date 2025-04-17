export interface SuccessResponse<T> {
    success: string;
    data: T;
}

export interface ErrorResponse {
    error: string;
}
