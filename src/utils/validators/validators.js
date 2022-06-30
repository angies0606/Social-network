const required = 'Обязательное поле для ввода';
const maxTextLength = 25;
const maxPasswordLength = 35;

const lengthValidator = (valueLength, maxLength) => {
  if (valueLength > maxLength) return 'Введите не больше ' + maxLength + ' символов';
  return;
};

const emailValidator = (email) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return 'Неправильно введен email';
  return;
}

export const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = required;
  } else {
    errors.email = emailValidator(values.email);
  }
  if (!values.nickname) {
    errors.nickname = required;
  } else {
    errors.nickname = lengthValidator(values.nickname.length, maxTextLength);
  }
  if (!values.password) {
    errors.password = required;
  } else {
    errors.password = lengthValidator(values.password.length, maxPasswordLength);
  }
  if (!values.login) {
    errors.login = required;
  } else {
    errors.login = lengthValidator(values.login.length, maxTextLength);
  }

  return errors;
}

export const commentTextValidator = (value) => {
  return value?.length <= 750 && value?.length > 0;
}

export const postTextValidator = (value) => {
  return value?.length <= 750 && value?.length > 0;
};

export const postValidator = (isTextValid, textValue, isImageInPost) => {
  switch (true) {
    case isTextValid && !isImageInPost:
      return true;
    case isImageInPost && isTextValid: 
      return true;
    case isImageInPost && !textValue: 
      return true;
    case isImageInPost && textValue <= 750:
      return false;
    default: return false;
  }
}