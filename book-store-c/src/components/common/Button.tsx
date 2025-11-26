import styled from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme; // 기본적인 디자인 프리셋
  disabled?: boolean;
  isLoading?: boolean; // 버튼 여러번 클릭 안되도록
}

function Button({ children, size, scheme, 
  disabled, isLoading }: Props) {
  return (
    <ButtonStyle size={size} scheme={scheme} 
      disabled={disabled} isLoading={isLoading}
    >
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
    font-size: ${({theme, size}) => theme.button[size].fontSize};
    color: ${({theme, scheme}) => theme.buttonScheme[scheme].color};
    background-color: ${({theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
    border: 0;
    border-radius: ${({theme}) => theme.borderRadius.default};
    padding: ${({theme, size}) => theme.button[size].padding};
    opacity: ${({disabled}) => disabled ? 0.5 : 1};
    pointer-events: ${({disabled}) => disabled ? "none" : "auto"};
    cursor: ${({disabled}) => disabled ? "default" : "pointer"};
`;

export default Button;