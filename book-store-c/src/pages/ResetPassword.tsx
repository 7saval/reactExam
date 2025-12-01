import { useForm } from "react-hook-form";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { resetPassword, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";

export interface SignupProps {
    email: string;
    password: string;
}

function ResetPassword() {
    const navigate = useNavigate();
    const {showAlert} = useAlert();

    // 리셋 요청 여부
    const [resetRequested, setResetRequested] = useState(false);

    // react-hook-form 이용해 form 관리 
    const { register, 
            handleSubmit, 
            formState: { errors}
          } = useForm<SignupProps>();

    const onSubmit = (data: SignupProps) => {
        if(resetRequested){
            // 초기화
            resetPassword(data).then(() => {
                // 성공
                showAlert('비밀번호 초기화되었습니다.');
                navigate('/login');
            }).catch((err) => {
                // 실패
                showAlert('비밀번호 초기화에 실패했습니다.');
            })
        } else {
            // 초기화 요청
            resetRequest(data).then(() => {
                // 성공
                setResetRequested(true);
            }).catch((err) => {
                // 실패
                showAlert('비밀번호 초기화 요청에 실패했습니다.');
            })
        }
    }

  return (
    <>
        <Title size="large">비밀번호 초기화</Title>
        <SignupStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <InputText  placeholder="이메일"
                        // inputType="email" value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        inputType="email" 
                        {...register("email", {required: true})}    // "필드명", 필수 여부
                    />
                    {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                </fieldset>
                {/* 리셋 요청 있을 때 비밀번호 필드 노출 */}
                {resetRequested && (
                    <fieldset>
                        <InputText  placeholder="비밀번호"
                            inputType="password" 
                            {...register("password", {required: true})}    // "필드명", 필수 여부
                        />
                        {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                    </fieldset>
                )}
                <fieldset>
                    <Button type="submit" size="large" scheme="primary">
                        {resetRequested ? "비밀번호 초기화" : "비밀번호 초기화 요청"}
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

export default ResetPassword;