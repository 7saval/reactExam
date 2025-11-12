import React, {} from "react";

const MapTest = () => {
    const fruits = ['apple', 'banana', 'orange'];

    return (
        <div>
            <h2>과일</h2>
            <ul>
                {
                    fruits.map((fruit, idx) => (
                        // key 할당 : 동적으로 생성된 엘리먼트의 변화를 
                        // 효율적으로 추적하고 관리하기 위해
                        <li key={idx}>{fruit}</li>
                    ))
                }
                {/* <li>{fruits[0]}</li>
                <li>{fruits[1]}</li>
                <li>{fruits[2]}</li> */}
            </ul>
        </div>
    )
}

export default MapTest;