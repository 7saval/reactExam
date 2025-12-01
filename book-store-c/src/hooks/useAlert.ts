import { useCallback } from "react"

export const useAlert = () => {
    // useCallback : 렌더링이 반복될 때마다 
    // 함수가 새로 생성되는 것을 방지하기 위해 
    // 함수를 '기억(memoization)'하는 데 사용
    const showAlert = useCallback((message: string) => {
        window.alert(message);
    }, []);

    const showConfirm = useCallback((message: string, onConfirm: () => void) => {
        if(window.confirm(message)){
            onConfirm();
        };
    }, []);

    return {showAlert, showConfirm};
};