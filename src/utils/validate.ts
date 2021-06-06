type validateFunc = (a: string) => string | false;

const validate: {
  username: validateFunc;
  email: validateFunc;
  password: validateFunc;
} = {
  username: (value) => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
  email: (value: string): string | false => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
  password: (value: string): string | false => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
};

export default validate;
