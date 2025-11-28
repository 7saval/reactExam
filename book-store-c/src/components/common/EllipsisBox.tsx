import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
    children: React.ReactNode;
    linelimt: number;
}

function EllipsisBox({children, linelimt}: Props) {
    const [expanded, setExpanded] = useState(false);
  return (
    <EllipsisBoxStyle linelimt={linelimt} $expanded={expanded}>
        <p>{children}</p>
        <div className="toggle">
            <Button size="small" scheme="normal"
                onClick={()=> {setExpanded(!expanded)}}
            >
                {expanded ? "접기" : "더보기"} <FaAngleDown />
            </Button>
        </div>
    </EllipsisBoxStyle>
  );
}

// styled-component에 boolean 선언 x : $ 붙여서 해결
interface EllipsisBoxStyleProps {
    linelimt: number;
    $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({linelimt, $expanded}) => 
            ($expanded ? 'none' : linelimt)};  
        -webkit-box-orient: vertical;  
        padding: 20px 0 0 0;
        margin: 0;
    }

    .toggle {
        display: flex;
        justify-content: end;
        align-items: center;

        svg {
            transform: ${({$expanded}) => $expanded ? 'rotate(180deg)' : 'rotated(0)'};
            transition: transform 0.2s ease-in-out;
            fill: ${({theme}) => theme.color.primary};
        }
    }
`;

export default EllipsisBox;