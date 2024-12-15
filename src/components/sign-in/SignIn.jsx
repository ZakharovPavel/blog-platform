import { yupResolver } from '@hookform/resolvers/yup';
import styles from './SignIn.module.scss';
import { schema } from './schema';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../utils/AccountService';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountErrorMessage } = useSelector((state) => state.account);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    dispatch(loginAccount(data));
    navigate('/');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-form']}>
      <h3 className={styles['sign-form__title']}>Sign In</h3>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Email address</span>
        <input
          {...register('email')}
          type="email"
          className={errors?.email ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
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
      {accountErrorMessage === 'loginAccount error' ? (
        <span className={styles['sign-form__validation-error-text']}>Email or password is invalid. Try others</span>
      ) : null}
      <button type="submit" className={styles['sign-form__button']} disabled={!isValid}>
        Login
      </button>
      <span className={styles['sign-form__transfer-text']}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={styles['sign-form__transfer-link']}>
          Sign Up
        </Link>
        .
      </span>
    </form>
  );
};

export default SignIn;