import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { state, ThemeContext } from './context/ThemeContext';
// import { GlobalStyle } from './style/global';


async function mountApp() {
  // 개발 환경으로 제한
  if(process.env.NODE_ENV === 'development'){
    const { worker } = require('./mock/browser');
    await worker.start(); // MSW 시작
  }
  
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      {/* <GlobalStyle /> */}
      <ThemeContext.Provider value={state}>
        <App />
      </ThemeContext.Provider>
    </React.StrictMode>
  );
}

mountApp();