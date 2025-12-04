import { useForm } from "react-hook-form";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { login, resetPassword, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "@/hooks/useAuth";

export interface LoginProps {
    email: string;
    password: string;
}

function Login() {
    // const navigate = useNavigate();
    // const {showAlert} = useAlert();
    const { userLogin } = useAuth();
    // zustand 상태관리 모듈
    // const { isloggedIn, storeLogin, storeLogout } = useAuthStore();

    // react-hook-form 이용해 form 관리 
    const { register, 
            handleSubmit, 
            formState: { errors}
          } = useForm<LoginProps>();

    const onSubmit = (data: LoginProps) => {
        userLogin(data);
    }

  return (
    <>
        <Title size="large">로그인</Title>
        <SignupStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <InputText  placeholder="이메일"
                        // inputType="email" value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        inputType="email" 
                        {...register("email", {required: true})}    // "필드명", 필수 여부
                        inputMode="email"
                    />
                    {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                </fieldset>
                <fieldset>
                    <InputText  placeholder="비밀번호"
                        inputType="password" 
                        {...register("password", {required: true})}    // "필드명", 필수 여부
                        inputMode="text"
                    />
                    {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                </fieldset>
                <fieldset>
                    <Button type="submit" size="large" scheme="primary">
                        로그인
                    </Button>
                </fieldset>
                <div className="info">
                    <Link to="/reset">비밀번호 초기화</Link>
                </div>
            </form>
        </SignupStyle>
    </>
    
  );
}

export default Login;