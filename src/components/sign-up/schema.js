import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Username needs to be at least 3 characters')
    .max(20, 'Username needs to be less than 20 characters')
    .required('Required field'),
  email: yup.string().trim().matches(emailRegex, 'Wrong email format').required('Required field'),
  password: yup
    .string()
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your password needs to be less than 40 characters')
    .required('Required field'),
  repeatPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your password needs to ba less than 40 characters')
    .required('Required field'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});
