import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components'; 
import { getTheme, ThemeName } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/ThemeContext';

function App() {

  // 지역상태 -> 전역상태 변경
  // const [themeName, setThemeName] = useState<ThemeName>('light');
  // const {themeName, setThemeName} = useContext(ThemeContext);
  
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  )
}

export default App;
