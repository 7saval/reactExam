import { fetchBanners } from "@/api/banner.api";
import { fetchBestBooks, fetchBooks } from "@/api/books.api";
import { fetchReviewAll } from "@/api/review.api";
import { Banner } from "@/models/banner.model";
import { Book, BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react"

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [bestBooks, setBestBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
      // 전체 리뷰
      fetchReviewAll().then((reviews) => {
        setReviews(reviews);
      });

      // 신간
      fetchBooks({
        category_id: undefined,
        news: true,
        currentPage: 1,
        limit: 4
        }).then(({books}) => {
        setNewBooks(books);
      });

      // 베스트셀러
      fetchBestBooks().then((books) => {
        setBestBooks(books);
      });

      // 배너
      fetchBanners().then((banners) => {
        setBanners(banners);
      });

    }, []);
    
    return { reviews, newBooks, bestBooks, banners };
}