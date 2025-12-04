import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { addCart } from "../../api/carts.api";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
    book: BookDetail;
}

function AddToCart({book}: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const {showAlert} = useAlert();
    // const [cartAdded, setCartAdded] = useState(false);
    const { addToCart, cartAdded } = useBook(book.id.toString());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setQuantity(value);
    }
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        if(quantity === 1) return;
        setQuantity(quantity - 1);
    }

    // const addToCart = () => {
    //     addCart({
    //         book_id: book.id,
    //         quantity: quantity
    //     }).then(()=> {
    //         // showAlert('장바구니에 추가되었습니다.');
    //         setCartAdded(true);
    //         // 1초 뒤 박스 사라짐
    //         setTimeout(() => {
    //             setCartAdded(false);
    //         }, 1000);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

  return (
    <AddToCartStyle $added={cartAdded}>
        <div>
            <InputText inputType="number" value={quantity}
                onChange={handleChange}
            />
            <Button size="medium" scheme="normal"
                onClick={handleIncrease}
            >
                +
            </Button>
            <Button size="medium" scheme="normal"
                onClick={handleDecrease}
            >
                -
            </Button>
        </div>
        <Button size="medium" scheme="primary" 
            onClick={() => addToCart(quantity)}
        >
            장바구니 담기
        </Button>
        <div className="added">
            <p>장바구니에 추가되었습니다.</p>
            <Link to="/cart">
                장바구니로 이동
            </Link>
        </div>
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
    $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    position: relative;

    .added {
        /* 기본: 컴포넌트 바로 위에 툴팁 형태로 표시해서 아래 요소(예: 탭)와 겹치지 않게 함 */
        position: absolute;
        right: 0;
        bottom: calc(100% + 8px);
        background: ${({theme}) => theme.color.background};
        border-radius: ${({theme}) => theme.borderRadius.default};
        padding: 8px 12px;
        opacity: ${({$added}) => $added ? 1 : 0};
        transform: translateY(${({$added}) => $added ? '0' : '6px'});
        pointer-events: ${({$added}) => $added ? 'auto' : 'none'};
        z-index: 10;
        transition: opacity 0.28s ease, transform 0.28s ease;   /* 부드러운 페이드+슬라이드 */

        p {
            padding: 0 0 8px 0;
            margin: 0;
        }
    }

    /* 모바일: 레이아웃 흐름 안에 넣어 다른 요소를 밀어내므로 겹침이 발생하지 않음 */
    @media screen AND ${({theme}) => theme.mediaQuery.mobile} {
        display: flex;
        flex-direction: column;

        .added {
            position: static;
            right: auto;
            bottom: auto;
            margin-top: 8px;
            transform: none;
            opacity: ${({$added}) => $added ? 1 : 0};
            pointer-events: ${({$added}) => $added ? 'auto' : 'none'};
            transition: opacity 0.2s ease;
        }
    }
`;

export default AddToCart;