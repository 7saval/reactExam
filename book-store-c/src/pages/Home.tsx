import Title from "@/components/common/Title";
import styled from "styled-components";

interface Props {

}

function Home(props: Props) {

  return (
    <HomeStyle>
        <Title size="large" color="primary">
            Home
        </Title>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
    color: ${({theme}) => theme.color.primary};
`;

export default Home;