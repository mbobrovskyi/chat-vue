import {EMAIL_REGEXP, NAME_REGEXP, PASSWORD_REGEXP} from "@/infrastructure/regexp";

export default {
  required: (val?: any): string | true  => {
    if (val === undefined || val === null || val === "") {
      return "This field is required";
    }
    return true;
  },

  length: (length: number): (val?: any) => string | true => {
    return (val: any): string | true => {
      if (val?.length !== length) {
        return `Length should be ${length} symbols`;
      }
      return true;
    }
  },

  minLength: (length: number): (val?: any) => string | true => {
    return (val: any): string | true => {
      if (val?.length < length) {
        return `Minimum length is ${length} symbols`;
      }
      return true;
    }
  },

  maxLength: (length: number): (val?: any) => string | true => {
    return (val: any): string | true => {
      if (val?.length > length) {
        return `Maximum length is ${length} symbols`;
      }
      return true;
    }
  },

  email: (email: string): string | true => {
    if (!email.toLowerCase().match(EMAIL_REGEXP)) {
      return "Wrong email format";
    }
    return true;
  },

  password(password: string): string | true {
    if (!password.match(PASSWORD_REGEXP)) {
      return "Password must be minimum 8 characters and contain a combination of uppercase and lowercase letters (A-Z or a-z), at least 1 number (0-9) and one special character (-.,@$!%+*^=()|\\`~/{}[]:_<>#?&)";
    }
    return true;
  },

  comparePasswords(pw1: string, pw2: string): string | true {
    if (pw1 !== pw2) {
      return "Passwords don't match";
    }
    return true;
  },

  name(name: string): string | true {
    if (!name.match(NAME_REGEXP)) {
      return "Wrong name format";
    }
    return true;
  }
}