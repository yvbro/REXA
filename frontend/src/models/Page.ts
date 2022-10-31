export interface Page<T> {
    content: T[];
    size: number;
    first: boolean;
    last: boolean;
    totalPages: number;
    totalElements: number;
}
