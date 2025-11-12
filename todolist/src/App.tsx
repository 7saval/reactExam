import React from 'react';
import logo from './logo.svg';
import './App.css';

{/* 
  작성자 : kyj
  작성일 : 2025.02.10.
  내용 : 기능에 대한 내용
  */}

// jsx 문법 : 리액트에서 제공하는 문법
// 가상돔에서 컴포넌트 변화를 빠르게 감지하기 위해 최상위 div 한개만 지정
function App() {
  // 자바스크립트 코드 작성
  let name = "리액트";
  // 인라인 스타일링 : 공유하고 싶지 않을 때
  const style = {
    backgroundColor : 'black',
    color : 'white',
    fontSize : '48px',
    fontWeight : 'bold',
    padding : '20px'
  }

  return (
    // 최상위 부모 태그가 반드시 있어야 <></>
    <div className="container">
      {/* 자바스크립트 코드는 {}안에서 표현 */}
      <h1 style={style} className='test'>Hello, 
        {
          name === '리액트' ? (<h1>YES</h1>) : null
        }!!</h1>
      <p>반갑습니다</p>
      {/* 반드시 태그 클로징 해야 */}
      <br/>
      {/* 주석문 작성 */}
    </div>
  );
  // const port = undefined;
  // return (
  //   <div>
  //     {
  //       port || '포트를 설정하지 않았습니다.'
  //     }
  //   </div>
  // )
}
// function App() {
//   return React.createElement("div", null, "Hello, 리액트!!"
//   )
// }
export default App;
