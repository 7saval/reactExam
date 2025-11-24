import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps {
    children: React.ReactNode;  // 리액트로 만든 모든 컴포넌트들 선얼할 수 있다.
}

function Layout({children} : LayoutProps ){
    return (
        <>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
        </>
    )
}

export default Layout;