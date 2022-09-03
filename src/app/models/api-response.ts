export interface APIResponse<T = any> {
    status: string;

    results?: number;
    data?: { [key: string]: T };

    message?: string;
    error?: any;
}