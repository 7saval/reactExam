import { Book } from "../models/book.model";
import { Pageination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface fetchBooksResponse {
    books: Book[];
    pagination: Pageination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    
    try {
        const response = await httpClient.get<fetchBooksResponse>("/books", 
            {params: params}
        );
        
        return response.data;
    } catch (error) {
        return {
            books : [],
            pagination: {
                totalCount: 0,
                currentPage: 1
            }
        }
    }
}