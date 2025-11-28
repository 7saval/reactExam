import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
    book: BookDetail;
    onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle size="small" 
        scheme={book.liked ? "like" : "normal"} 
        onClick={onClick}
    >
        <FaHeart />
        {book.likes}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
        color: inherit; /* 상위 엘리먼트 부모 상속하겠다 */
        * {
            color: inherit;
        }
    }
`;

export default LikeButton;