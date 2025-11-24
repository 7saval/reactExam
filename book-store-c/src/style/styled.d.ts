import 'styled-components';
import type { Theme } from './theme'; // Theme 파일 경로 맞춰서 수정해야 함

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
