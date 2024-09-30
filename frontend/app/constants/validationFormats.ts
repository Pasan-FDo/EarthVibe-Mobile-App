export const caseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
export const onlyNumberRegex = /^[0-9]+/;
export const oneDigitRegex = /^(?=.*\d).+$/;
export const numberRegex = /^[0-9]*$/;
export const specialCharacterRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneNoRegex = /^[+(\s.\-/\d)]{5,30}$/;
export const nameRegex = /^[a-zA-Z]{1,10}$/;
export const nameWithSpace = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9]*$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;