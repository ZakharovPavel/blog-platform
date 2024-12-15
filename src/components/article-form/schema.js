import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Required field'),
  description: yup
    .string()
    .trim()
    .required('Required field'),
  body: yup
    .string()
    .trim()
    .required('Required field'),
  // tagList: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string().required('Tag is required'),
  //   })
  // ),
})