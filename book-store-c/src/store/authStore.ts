import { create } from "zustand";

// zustand는 상태함수와 액션 함수 같이 선언함
interface StoreState {
    isloggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

// 토큰 가져오기
export const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
};

// 로컬 스토리지에 토큰 저장
const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

// 토큰 클리어
export const removeToken = () => {
    localStorage.removeItem("token");
};

// set : isloggedIn과 같은 상태 정보를 변경할 수 있게 된다.
export const useAuthStore = create<StoreState>((set) => ({
    isloggedIn: getToken() ? true : false,  // 초기값
    storeLogin: (token:string) => {
        set(() => ({ isloggedIn: true }))
        setToken(token);
    },  // 액션함수
    storeLogout: () => {
        set(() => ({ isloggedIn: false }))
        removeToken();
    }
}));