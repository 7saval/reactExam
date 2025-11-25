import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/ThemeContext";
import React from "react";

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더 : 가상화면 렌더됨
        // 적적한 props 넣어줘야 함
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력" />
            </BookStoreThemeProvider>
        );

        // 2. 확인 : '여기에 입력'이란 플레이스홀더 텍스트 화면상에 있는지 확인
        expect(screen.getByPlaceholderText("여기에 입력")).toBeInTheDocument();
    });

    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력" ref={ref} />
            </BookStoreThemeProvider>
        );

        // ref.current : ref는 항상 current로 액세스함
        expect(ref.current).toBeInstanceOf(HTMLInputElement);    
    });
})