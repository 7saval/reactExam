import { render, screen } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/ThemeContext";

const dumyBook = {
    id: 1,
    title: "어린왕자들",
    img: 7,
    category_id: 0,
    form: "종이책",
    isbn: "0",
    summary: "어리다..",
    detail: "많이 어리다..",
    author: "김어림",
    pages: 100,
    contents: "목차입니다.",
    price: 20000,
    likes: 3,
    pub_date: "2025-10-01",
};

describe("BookItem", () => {
    it('렌더 여부', () => {
        const { getByText, getByAltText } = render(
            <BookStoreThemeProvider>
                <BookItem book={dumyBook} />
            </BookStoreThemeProvider>
        );

        expect(getByText(dumyBook.title)).toBeInTheDocument();
        expect(getByText(dumyBook.summary)).toBeInTheDocument();
        expect(getByText(dumyBook.author)).toBeInTheDocument();
        expect(getByText("20,000원")).toBeInTheDocument();
        expect(getByText(dumyBook.likes)).toBeInTheDocument();
        expect(getByAltText(dumyBook.title)).toHaveAttribute("src", 
            `https://picsum.photos/id/${dumyBook.img}/600/600`
        );
    });
})