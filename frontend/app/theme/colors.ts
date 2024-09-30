/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: '#9C27B0',
  white: '#FFFFFF',
  black: '#000000',
  disabledPrimary: '#C27ACE',
  activeBackground: '#FEFBFF',
  disabledBlack: '#CBCBCB',
  gray: '#7B7B7B',
  company: '#E92227',
  success: '#007E33',
  warning: '#FF8800',
  appBackground: '#FFFFFF',
  error: '#ff3333',
  still: '#1E46F6',
  moving: '#65D737',
  chatBg: '#E8E0D5',
  lightGray: '#494949',
};
export default colors;