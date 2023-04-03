export type PaginationResponse<T> = {
    statusCode: number;
    message: string;
    data: {
        pageNumber: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        items: T[];
    };
};

export type Response<T> = {
    code: number;
    message: string;
    data: T;
};

export type ListResponse<T> = {
    code: number;
    message: string;
    data: T[];
};
