import type { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from "@/models/book.model";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (reviewData: BookReviewItemWrite) => void;
}

function BookReview({reviews, onAdd}: Props) {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {
        reviews.map((review) => (
            <BookReviewItem key={review.id} review={review} />     
        ))
      }
      {
        reviews.length === 0 && 
        <div>
          리뷰가 없습니다.
        </div>
      }
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;