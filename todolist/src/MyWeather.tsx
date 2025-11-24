import React, { Component } from "react";

interface MyProps{
    weather : string;
    children : React.ReactNode; // 리액트의 자식요소
}

// // React.FC의 기능
// const MyWeather : React.FC<MyProps> = ({children, weather}) => {
//     // const {children, weather} = props;

//     return(
//         <div>
//             {children}<p></p>
//             오늘의 날씨는 {weather}
//         </div>
//     )
// }

// 클래스 컴포넌트
class MyWeather extends Component<MyProps>{
    render(){
        // this는 컴포넌트를 호출한 대상 객체 : App.tsx의 MyWeather
        const {children, weather} = this.props;

        return(
            <div>
                {children}<p></p>
                 오늘의 날씨는 {weather}
            </div>
        )
    }
}


export default MyWeather;