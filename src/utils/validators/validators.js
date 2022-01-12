export const required = value => {
  if (value) return undefined;
  return "Обязательное поле для ввода";
}




export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return "Максимальное количество символов - " + maxLength;
  return undefined;
}
