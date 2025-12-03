import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { SignupProps } from "@/pages/Signup";
import { useAuthStore } from "@/store/authStore"
import { useAlert } from "./useAlert";
import { data, useNavigate } from "react-router-dom";
import { LoginProps } from "@/pages/Login";
import { useState } from "react";

export const useAuth = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    // 상태
    const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

    // 메소드
    // 로그인
    const userLogin = (data: LoginProps) => {
        login(data).then((res) => {
            // 상태 변화
            storeLogin(res.token);

            // 성공
            showAlert('로그인이 완료되었습니다.');
            navigate('/');
        }).catch((err) => {
            // 실패
            showAlert('로그인에 실패했습니다.');
        });
    }

    // 회원가입
    const userSignup = (data: SignupProps) => {
        signup(data).then((res) => {
            // 성공
            // window.alert('회원가입이 완료되었습니다.');
            showAlert('회원가입이 완료되었습니다.');
            navigate('/login');
        }).catch((err) => {
            // 실패
            showAlert('회원가입에 실패했습니다.');
        });
    }

    // 비밀번호 초기화
    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
            // 성공
            showAlert('비밀번호 초기화되었습니다.');
            navigate('/login');
        }).catch((err) => {
            // 실패
            showAlert('비밀번호 초기화에 실패했습니다.');
        });
    }

    // 리셋 요청 여부
    const [resetRequested, setResetRequested] = useState(false);

    // 비밀번호 초기화 요청
    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
            // 성공
            setResetRequested(true);
        }).catch((err) => {
            // 실패
            showAlert('비밀번호 초기화 요청에 실패했습니다.');
        })
    }

    // 리턴
    return { userLogin, 
            userSignup, 
            userResetPassword, 
            userResetRequest, 
            resetRequested
        };
}