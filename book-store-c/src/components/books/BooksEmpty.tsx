import styled from "styled-components";
import { FaSmileWink } from "react-icons/fa";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import Empty from "../common/Empty";


function BooksEmpty() {
  return (
    // <BooksEmptyStyle>
    //     <div className="icon">
    //         <FaSmileWink />
    //     </div>
    //     <Title size="large" color="secondary">
    //         검색 결과가 없습니다.
    //     </Title>
    //     <p>
    //         <Link to="/books">전체 검색 결과로 이동</Link>
    //     </p>
    // </BooksEmptyStyle>
    <Empty title="검색 결과가 없습니다." 
        description={<Link to="/books">전체 검색 결과로 이동</Link>}
        icon={<FaSmileWink />}
    />
  );
}

export default BooksEmpty;