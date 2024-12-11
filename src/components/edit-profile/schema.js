import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^(https?|ftp):\/\/(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/;

export const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    // .min(3, 'Username needs to be at least 3 characters')
    // .max(20, 'Username needs to be less than 20 characters')
    .required('Required field'),
  email: yup
    .string()
    .trim()
    .matches(emailRegex, 'Wrong email format')
    .required('Required field'),
  password: yup
    .string()
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your password needs to be less than 40 characters')
    .required('Required field'),
  avatar: yup
    .string()
    .trim()
    .matches(urlRegex, 'Wrong url format')
})