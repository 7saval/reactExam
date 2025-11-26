import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components'; 
import { getTheme, ThemeName } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/ThemeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';

// 라우터 생성 : 라우터의 세부 내용, 경로 지정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout>
                <Home />
             </Layout>,
    // errorElement: <div>페이지를 찾을 수 없습니다.</div>,
    errorElement: <Error />,
  },
  {
      path: '/books',
      element: <Layout>
                  <div>도서 목록</div>
               </Layout>,
  },
  {
      path: '/signup',
      element: <Layout>
                  <Signup />
               </Layout>,
  },
]);


function App() {

  // 지역상태 -> 전역상태 변경
  // const [themeName, setThemeName] = useState<ThemeName>('light');
  // const {themeName, setThemeName} = useContext(ThemeContext);
  
  return (
    <BookStoreThemeProvider>
      {/* <ThemeSwitcher /> */}
        <RouterProvider router={router} />
    </BookStoreThemeProvider>
  )
}

export default App;
