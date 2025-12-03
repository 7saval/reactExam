import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pageination } from "../models/pagination.model";
import { useEffect, useState } from "react";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

// 쿼리스트링 감지해서 도서 화면 갱신
export const useBooks = () => {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERYSTRING.CATEGORY_ID);
    const news = params.get(QUERYSTRING.NEWS);
    const page = params.get(QUERYSTRING.PAGE);
    
    const { data: booksData, isLoading: isBooksLoading } = useQuery({
        queryKey: ["books", location.search],
        queryFn: () =>
            fetchBooks({
            category_id: category_id ? Number(category_id) : undefined,
            news: news ? true : undefined,
            currentPage: page ? Number(page) : 1,
            limit: LIMIT,
            }),
    });

    // const [books, setBooks] = useState<Book[]>([])
    // const [pagination, setPagination] = useState<Pageination>({
    //     totalCount: 0,
    //     currentPage: 1
    // });
    // const [isEmpty, setIsEmpty] = useState(true);

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const category_id = params.get(QUERYSTRING.CATEGORY_ID);
    //     const news = params.get(QUERYSTRING.NEWS);
    //     const page = params.get(QUERYSTRING.PAGE);

    //     fetchBooks({
    //         category_id: category_id ? Number(category_id) : undefined,
    //         news: news ? true : undefined,
    //         currentPage: page ? Number(page) : 1,
    //         limit: LIMIT
    //     }).then(({books, pagination}) => {
    //         setBooks(books);
    //         setPagination(pagination);
    //         setIsEmpty(books.length === 0);
    //     })
    // }, [location.search])

    // return { books, pagination, isEmpty }
    return { 
        books: booksData?.books, 
        pagination: booksData?.pagination, 
        isEmpty: booksData?.books.length === 0,
        isBooksLoading 
     }

} 