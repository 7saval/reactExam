import styled from "styled-components"
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize,
    color?: ColorKey;
}

function Title({children, size, color}: Props){
    return <TitleStyle size={size} color={color}>{children}</TitleStyle>
}

// 여기서 {theme}은 themeProvider에서 props로 넘겨주고 있는 값
const TitleStyle = styled.h1<Omit<Props, 'children'>>`
    font-size: ${({theme, size}) => theme.heading[size].fontSize};
    color: ${({theme, color}) => color ? theme.color[color] : theme.color.primary};
`;

export default Title;