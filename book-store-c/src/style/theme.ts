export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third' | 
                        'border' | 'text';

// 타이틀, 버튼 사이즈 타입
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal" | "like" ;
export type LayoutWidth = "large" | "medium" | "small";
export type MediaQuery = "mobile" | "tablet" | "desktop";

// 테마도 타입으로 관리
export interface Theme {
    name: ThemeName;
    // color: {
    //     // primary: string;
    //     // background: string;
    //     // 여러 컬러 추가될 때 대비 타입 추가 방법
    //     [key in ColorKey]: string;
    // };
    color: Record<ColorKey, string>;
    heading: {
        [key in HeadingSize] : {
            fontSize: string;
            fontWeight: number;
        }
    };
    button: {
        [key in ButtonSize] : {
            fontSize: string;
            padding: string;
        }
    };
    buttonScheme: {
        [key in ButtonScheme]: {
            color: string;
            backgroundColor: string;
        };
    };
    borderRadius: {
        default: string;
    };
    layout : {
        width: {
            [key in LayoutWidth]: string;
        }
    };
    mediaQuery: {
        [key in MediaQuery]: string;
    }
}

export const light: Theme = {
    name: 'light',
    color: {
        primary: '#ff5800',
        background: 'lightgray',
        secondary: '#5f5f5f',
        third: 'green',
        border: 'gray',
        text: 'black',
    },
    heading: {
        large: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        medium: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        small: {
            fontSize: '1rem',
            fontWeight: 700,
        },
    },
    button: {
        large: {
            fontSize: '1.5rem',
            padding: '1rem 2rem',
        },
        medium: {
            fontSize: '1rem',
            padding: '0.5rem 1rem',
        },
        small: {
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
        },
    },
    buttonScheme: {
        primary: {
            color: 'white',
            backgroundColor: 'midnightblue',
        },
        normal: {
            color: 'black',
            backgroundColor: 'lightgray',
        },
        like: {
            color: 'white',
            backgroundColor: 'coral',
        }
    },
    borderRadius: {
        default: '4px',
    },
    layout: {
        width: {
            large: '1020px',
            medium: '760px',
            small: '320px',
        }
    },
    mediaQuery: {
        mobile: '(max-width: 768px)',    // 768px 이하에서 동작
        tablet: '(max-width: 1024px)',    // 1024ps 이하에서 동작
        desktop: '(min-width: 1025px)',    // 1025px 이상에서 동작
    }
};

export const dark: Theme = {
    ...light,       // 중복 작성 막기 위해 얕은 복사 후 오버라이딩
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
        secondary: 'darkblue',
        third: 'darkgreen',
        border: 'gray',
        text: 'black',
    }
};

// 테마 내보내기
export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case 'light':
            return light;
        case 'dark':
            return dark;
        default:
            return light;
    }
};