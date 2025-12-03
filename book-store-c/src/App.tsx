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
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import ToastContainer from './components/common/toast/ToastContainer';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
      path: '/books',
      element: <Books />
               
  },
  {
      path: '/signup',
      element: <Signup />
               
  },
  {
      path: '/reset',
      element: <ResetPassword />
               
  },
  {
      path: '/login',
      element: <Login />
               
  },
  {
      path: '/book/:bookId',
      element: <BookDetail />
               
  },
  {
      path: '/cart',
      element: <Cart />
               
  },
  {
      path: '/order',
      element: <Order />
               
  },
  {
      path: '/orderlist',
      element: <OrderList />
               
  },
];

// 라우터 생성 : 라우터의 세부 내용, 경로 지정
const router = createBrowserRouter(routeList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />,
  }
}));


function App() {

  // 지역상태 -> 전역상태 변경
  // const [themeName, setThemeName] = useState<ThemeName>('light');
  // const {themeName, setThemeName} = useContext(ThemeContext);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        {/* <ThemeSwitcher /> */}
          <RouterProvider router={router} />
          <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
