// ts아닌 tsx로 한 이유
// 추후 provider를 만들어서 이쪽으로 이동시킬 예정

import React, { createContext, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME: ThemeName = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";


interface State {
    themeName: ThemeName;
    // toggleTheme: (themeName: ThemeName) => void;
    toggleTheme: () => void;
}

export const state = {
    themeName: DEFAULT_THEME_NAME as ThemeName,
    // toggleTheme: (themeName: ThemeName) => {},
    toggleTheme: () => {},  // 파라메터 제거

}

// context는 일종의 레퍼런스 : 
// provider 하위의 컴포넌트들이 이를 구독하고 언제든지 꺼내 쓸 수 있다.
// 꺼내 쓰는 방법은 useContext 훅 이용
export const ThemeContext = createContext<State>(state);
// 테마 provider를 커스터마이징
export const BookStoreThemeProvider = ({children}: {
    children: React.ReactNode }) => {
        const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

        const toggleTheme = () => {
            setThemeName(themeName === "light" ? "dark" : "light");
            localStorage.setItem(THEME_LOCALSTORAGE_KEY, 
                themeName === "light" ? "dark" : "light");
        };

        useEffect(() => {
            const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
            setThemeName(savedThemeName || DEFAULT_THEME_NAME);
          }, []);
        

        return (
            <ThemeContext.Provider value={{themeName, 
                toggleTheme
            }}>
                <ThemeProvider theme={getTheme(themeName)}>
                    <GlobalStyle themeName={themeName} />
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        )
    }
