import { useForm } from "react-hook-form";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";

export interface SignupProps {
    email: string;
    password: string;
}

function Signup() {
    const navigate = useNavigate();
    const {showAlert} = useAlert();

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault(); // form submit 시 action에 의해 페이지 이동 막음
    //     console.log(email, password);
    // }

    // react-hook-form 이용해 form 관리 
    const { register, 
            handleSubmit, 
            formState: { errors}
          } = useForm<SignupProps>();

    const onSubmit = (data: SignupProps) => {
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

  return (
    <>
        <Title size="large">회원가입</Title>
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
                <fieldset>
                    <InputText  placeholder="비밀번호"
                        // inputType="password" value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        inputType="password" 
                        {...register("password", {required: true})}    // "필드명", 필수 여부
                    />
                    {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                </fieldset>
                <fieldset>
                    <Button type="submit" size="large" scheme="primary">
                        회원가입
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

export const SignupStyle = styled.div`
    max-width: ${({theme}) => theme.layout.width.small};
    margin: 80px auto;

    fieldset {
        border: 0;
        padding: 0 0 8px 0;
        .error-text {
            color: red;
        }
    }

    input {
        width: 100%;
    }

    button {
        width: 100%;
    }

    .info {
        text-align: center;
        padding: 16px 0 0 0;
    }
`;

export default Signup;