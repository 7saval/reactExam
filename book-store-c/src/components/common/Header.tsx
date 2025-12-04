import { styled } from "styled-components";
import logo from "../../assets/images/bookStore logo.png";
import { FaSignInAlt, FaRegUser, FaUserCircle, FaBars, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Category } from "../../models/category.model";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../api/category.api";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwitcher";

// const CATEGORY = [
//     {
//         id: null,
//         name: "전체"
//     },
//     {
//         id: 0,
//         name: "동화"
//     },
//     {
//         id: 1,
//         name: "소설"
//     },
//     {
//         id: 2,
//         name: "사회"
//     },
// ]

function Header(){

    // 커스텀 훅으로 빼주기
    const { category } = useCategory();
    // zustand 상태관리 모듈
    const { isloggedIn, storeLogout } = useAuthStore();
    // 모바일 오픈 여부
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // const [category, setCategory] = useState<Category[]>([]);

    // // 첫 렌더링 시 카테고리 데이터 가져오기
    // useEffect(() => {
    //   fetchCategory().then((category) => {
    //     setCategory(category);
    //   });
    // }, []);
    

    return (
        <HeaderStyle $isMobileOpen={isMobileOpen}>
            <h1 className="logo">
                <Link to="/">
                    <img src={logo} alt="book store"/>
                </Link>
            </h1>
            {/* 카테고리 영역 */}
            <nav className="category">
                <button 
                    className="menu-button" 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {
                        isMobileOpen ? <FaAngleRight /> : <FaBars />
                    }
                </button>
                <ul>
                    {category.map((item) => (
                        <li key={item.category_id}>
                            <Link to={item.category_id === null ? `/books` : 
                                `/books?category_id=${item.category_id}`}>
                                {item.category_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* 개인화 영역 */}
            <nav className="auth">
                <Dropdown 
                    toggleButton={<FaUserCircle />} 
                    // isOpen={true}
                >
                    <>
                        {
                            isloggedIn && (
                                <ul>
                                    <li>
                                        <Link to="/cart">장바구니</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">주문내역</Link>
                                    </li>
                                    <li>
                                        <button onClick={storeLogout}>로그아웃</button>
                                    </li>
                                </ul>
                            )
                        }
                        {!isloggedIn && (
                            <ul>
                                <li>
                                    <Link to="/login">
                                    <FaSignInAlt /> 
                                    로그인
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        <FaRegUser />
                                        회원가입
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <ThemeSwitcher />
                    </>
                </Dropdown>                
            </nav>
        </HeaderStyle>
    )
}

interface HeaderStyleProps {
    $isMobileOpen?: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
    width: 100%;
    margin: 0 auto;
    max-width: ${({theme}) => theme.layout.width.large};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({theme}) => theme.color.background};

    .logo {
        img {
            width: 200px;
        }
    }
        
    .category {
        .menu-button {
            display: none;
        }       
        ul {
            display: flex;
            gap: 32px;
            li {
                a {
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    color: ${({theme}) => theme.color.text};
                    &:hover {
                        color: ${({theme}) => theme.color.primary};
                    }
                }
            }
        }
    }

    .auth {
        ul {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100px;
            li {
                a, button {
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    line-height: 1;
                    background: none;
                    border: 0;
                    cursor: pointer;

                    svg {
                        margin-right: 6px;
                    }
                }
            }
        }
    }

    @media screen AND ${({theme}) => theme.mediaQuery.mobile} {
        height: 52px;

        .logo {
            padding: 0 0 0 12px

            img {
                width: 140px;
            }
        }
        
        .auth {
            position: absolute;
            top: 12px;
            right: 12px;
        }

        .category {

            .menu-button {
                display: flex;
                position: absolute;
                top: 14px;
                right: ${({$isMobileOpen}) => $isMobileOpen ? "62%" : "52px"};
                background: #fff;
                border: 0;
                font-size: 1.5rem;
                cursor: pointer;
            }

            ul {
                position: fixed;
                top: 0;
                right: ${({$isMobileOpen}) => $isMobileOpen ? 0 : "-100%"};
                transition: right 0.3s ease-in-out;
                width: 60%;
                height: 100vh;
                background: #fff;
                box-shadw: 0 0 10px rgba(0, 0, 0, 0.2);
                margin: 0;
                padding: 24px;
                z-index: 1000;
                flex-direction: column;
                gap: 16px;
            }
        }
    }
`;

export default Header;