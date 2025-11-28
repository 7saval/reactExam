import { Book, BookDetail } from "../models/book.model";
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

export const fetchBook = async (bookId:string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
}

export const likeBook = async (bookId:number) => {
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
}

export const unlikeBook = async (bookId:number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
}