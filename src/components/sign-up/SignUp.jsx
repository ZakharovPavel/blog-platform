import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../utils/AccountService';
import { useEffect } from 'react';
import { setIsAccountCreated } from '../../features/account/accountSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const { accountErrorMessage, isAccountCreated } = useSelector((state) => state.account);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    dispatch(createAccount(data));
  };

  useEffect(() => {
    dispatch(setIsAccountCreated(false));

    return () => dispatch(setIsAccountCreated(false));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-form']}>
      <h3 className={styles['sign-form__title']}>Create new account</h3>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Username</span>
        <input
          {...register('username')}
          type="text"
          className={
            errors?.username || accountErrorMessage === 'createAccount error'
              ? styles['sign-form__label-input--error']
              : styles['sign-form__label-input']
          }
          placeholder="Username"
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.username?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Email address</span>
        <input
          {...register('email')}
          type="email"
          className={
            errors?.email || accountErrorMessage === 'createAccount error'
              ? styles['sign-form__label-input--error']
              : styles['sign-form__label-input']
          }
          placeholder="Email address"
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.email?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Password</span>
        <input
          {...register('password')}
          type="password"
          className={errors?.password ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
          placeholder="Password"
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.password?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Repeat Password</span>
        <input
          {...register('repeatPassword')}
          type="password"
          className={
            errors?.repeatPassword ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']
          }
          placeholder="Password"
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.repeatPassword?.message}</span>
      </label>
      <label className={styles['form-agreement']}>
        <input {...register('terms')} className={styles['sign-form__agreement-checkbox']} type="checkbox" />
        <span className={styles['form-agreement__text']}>I agree to the processing of my personal information</span>
        <div className={styles['sign-form__validation-error-text']}>{errors?.terms?.message}</div>
      </label>
      {accountErrorMessage === 'createAccount error' ? (
        <span className={styles['sign-form__validation-error-text']}>
          Username or email is already taken. Try others
        </span>
      ) : null}
      {isAccountCreated ? (
        <span className={styles['sign-form__successfull-text']}>Account was successfully created</span>
      ) : null}
      <button type="submit" className={styles['sign-form__button']} disabled={!isValid}>
        Create
      </button>
      <span className={styles['sign-form__transfer-text']}>
        Already have an account?{' '}
        <Link to="/sign-in" className={styles['sign-form__transfer-link']}>
          Sign In
        </Link>
        .
      </span>
    </form>
  );
};

export default SignUp;
