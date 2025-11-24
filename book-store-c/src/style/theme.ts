export type ThemeName = 'light' | 'dark';
type ColorKey = 'primary' | 'background' | 'secondary' | 'third';

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
}

export const light: Theme = {
    name: 'light',
    color: {
        primary: 'brown',
        background: 'lightgray',
        secondary: 'blue',
        third: 'green',
    },
};

export const dark: Theme = {
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
        secondary: 'darkblue',
        third: 'darkgreen',
    },
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