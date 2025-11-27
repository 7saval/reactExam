import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";


function BooksFilter() {
    // 상태
    // 1. 카테고리
    // 2. 신간 여부 true, false
    // 쿼리스트링 이용하기 : 상태 공유 가능, 재사용성, 검색엔진 최적화, 데이터 추적 분석에 용이

    const { category} = useCategory();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id: number | null) => {
        const newSearchParams = new URLSearchParams(searchParams);

        console.log(newSearchParams);
        console.log(id);
        console.log("BooksFilter: handleCategory -> before setSearchParams", id, newSearchParams.toString());
        if(id === null){
            newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
        } else {
            newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
        }

        setSearchParams(newSearchParams); // 실제 업데이트
    }

    // 현재 선택된 카테고리 가져오기
    // const currentCategory = searchParams.get("category_id");
    // console.log(currentCategory);

    const handeleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        if(newSearchParams.has(QUERYSTRING.NEWS)){
            newSearchParams.delete(QUERYSTRING.NEWS);
        } else {
            newSearchParams.set(QUERYSTRING.NEWS, "true");
        }

        console.log("BooksFilter: handeleNews -> before setSearchParams", newSearchParams.toString());
        setSearchParams(newSearchParams); // 실제 업데이트
    }

  return (
    <BooksFilterStyle>
        <div className="category">
            {
                category.map((item) => (
                    <Button size="medium" scheme={item.isActive ? "primary" : "normal"} 
                        key={item.category_id}
                        onClick={() => handleCategory(item.category_id)}
                    >
                        {item.category_name}
                    </Button>
                ))
            }
        </div>
        <div className="new">
            <Button size="medium" scheme={searchParams.has(QUERYSTRING.NEWS) ? "primary" : "normal"}
                onClick={()=> handeleNews()}
            >
                신간
            </Button>
        </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;