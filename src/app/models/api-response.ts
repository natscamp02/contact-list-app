export interface APIResponse<T = any> {
    // Response status message
    status: string;

    // Success responses
    results?: number;
    data?: { [key: string]: T };

    // Error responses
    message?: string;
    error?: any;
}