import { Component, ReactNode } from "react";

// 컴포넌트 클래스 상속받기
class ClassCom extends Component{
    // render 메소드 선언 : 화면 반환하겠다.
    render(): ReactNode {
        return (
            <div>
                클래스형 컴포넌트
            </div>
        )
    }
}

// 다른 파일에서 컴포넌트 사용하기 위해 외부 export
export default ClassCom;