import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/ThemeContext";

describe("Button 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더 : 가상화면 렌더됨
        // 적적한 props 넣어줘야 함
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        // 2. 확인 : '버튼'이란 텍스트 화면상에 있는지 확인
        expect(screen.getByText("버튼")).toBeInTheDocument();
    });

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({
            fontSize: "1.5rem"
        });
    });
})