import { use, useEffect, useState } from "react";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId:string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const { isloggedIn }= useAuthStore();
    const {showAlert} = useAlert();
    const { showToast } = useToast();

    // 좋아요 토글 버튼
    const likeToggle = () => {
        // 권한 확인
        if(!isloggedIn){
            showAlert("로그인이 필요합니다.");
            return;
        }

      if(!book) return;

      if(book.liked){
        // like => unlike
        unlikeBook(book.id).then(() => {
            // 성공 처리
            setBook({
                ...book,
                liked: false,
                likes: book.likes - 1
            });
            showToast('좋아요가 최소되었습니다.');
        })
      } else {
        // unlike => like
        likeBook(book.id).then(() => {
            // 성공 처리
            setBook({
                ...book,
                liked: true,
                likes: book.likes + 1
            });
            showToast('좋아요가 성공했습니다.');
        }).catch((err) => {
            // 실패 처리
            console.log(err.response?.data);
        })
      }
    }

    const addToCart = (quantity:number) => {
        if(!book) return;
        
        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(()=> {
            // showAlert('장바구니에 추가되었습니다.');
            setCartAdded(true);
            // 1초 뒤 박스 사라짐
            setTimeout(() => {
                setCartAdded(false);
            }, 1000);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
      if(!bookId) return;
      fetchBook(bookId).then((book)=> {
        setBook(book);
      })

      // 리뷰 내용
      fetchBookReview(bookId).then((reviews) => {
        setReviews(reviews);
      })
    }, [bookId])

    const addReview = (reviewData:BookReviewItemWrite) => {
        if(!book) return;

        addBookReview(book.id.toString(), reviewData).then((res) => {
            fetchBookReview(book.id.toString()).then((reviews) => {
                setReviews(reviews);
            });
            showAlert(res?.message);
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return {book, likeToggle, addToCart, cartAdded, reviews, addReview}; 
}