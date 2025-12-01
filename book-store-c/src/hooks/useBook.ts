import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { set } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId:string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false);
    const { isloggedIn }= useAuthStore();
    const {showAlert} = useAlert();

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
    }, [bookId])
    
    return {book, likeToggle, addToCart, cartAdded}; 
}