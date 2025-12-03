import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";

interface Props {

}

function Loading(props: Props) {
  return (
    <LoadingStyle>
        <FaSpinner />
    </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
    padding: 40px 0;
    text-align: center;

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    svg {
        width: 70px;
        height: 70px;
        fill: #ccc;
        animation: rotate 1s linear infinite;   // 1초동안 한바퀴
    }
`;

export default Loading;