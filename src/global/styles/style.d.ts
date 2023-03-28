import { ITheme, IFontTheme } from './theme.interface';
import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme, IFontTheme {}
  }
  