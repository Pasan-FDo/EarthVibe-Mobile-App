import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale } from 'react-native-size-matters';
import colors from './colors';
import fonts from './fonts';

const theme = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  flexBox: {
    flex: 1,
  },
  keyboardScreen: {
    flex: 1,
    marginBottom: 24,
  },
  NoKeyboardScreen: {
    flex: 1,
    marginBottom: 24,
  },
  activeBorderColor: {
    borderColor: colors.primary,
  },
  disabledBorderColor: {
    borderColor: colors.disabledBlack,
  },
  errorBorderColor: {
    borderColor: colors.error,
  },
  activeColor: {
    color: colors.primary,
  },
  disabledColor: {
    color: colors.disabledBlack,
  },
  errorColor: {
    color: colors.error,
  },
  activeShadowColor: {
    shadowColor: colors.primary,
  },
  disabledShadowColor: {
    shadowColor: colors.disabledBlack,
  },
  errorShadowColor: {
    shadowColor: colors.error,
  },
  textBox: {
    fontFamily: fonts.regular,
    padding: moderateScale(24),
    fontSize: RFValue(12),
    textAlign: 'center',
    color: colors.black,
  },
  textBoxTop: {
    fontFamily: fonts.regular,
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(24),
    fontSize: RFValue(12),
    textAlign: 'center',
    color: colors.black,
  },
  textBoxNoPaddings: {
    fontFamily: fonts.regular,
    margin: moderateScale(3),
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  defaultText: { fontFamily: fonts.regular },
});

export default theme;
