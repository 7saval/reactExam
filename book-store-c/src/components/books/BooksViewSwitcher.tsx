import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";


// 컴포넌트 구조화
const viewOptions = [
  {
    value: "list",
    // icon: <FaList/>,
    label: "리스트",
  },
  {
    value: "grid",
    // icon: <FaTh/>,
    label: "그리드",
  },
]

export type ViewMode = "grid" | "list";

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  }

  // 첫 화면 때 디폴트 값
  useEffect(() => {
    if(!searchParams.get(QUERYSTRING.VIEW)){
      handleSwitch("grid"); // 그리드가 default
    }
  }, [])
  

  return (
    <BooksViewSwitcherStyle>
      {
        viewOptions.map((item) => (
          <Button key={item.value} size="medium" 
            onClick={() => handleSwitch(item.value as ViewMode)}
            scheme={ searchParams.get(QUERYSTRING.VIEW) === item.value ? "primary" : "normal"}>
            {item.label}
            {/* {item.icon} */}
          </Button>
        ))
      }
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;  
  }
`;

export default BooksViewSwitcher;