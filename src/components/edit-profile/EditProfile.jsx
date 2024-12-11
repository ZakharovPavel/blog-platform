import { useForm } from 'react-hook-form';
import styles from './EditProfile.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../utils/AccountService';
import { Spin } from 'antd';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, token, accountErrorMessage } = useSelector((state) => state.account);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    // defaultValues: {
    //   username: currentUser.username,
    //   email: currentUser.email,
    //   password: currentUser.password,
    //   avatar: currentUser.image,
    // }
    // defaultValues: async () => getUser().user,
  });

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
    
    const profileData = {...data, token};
    dispatch(editProfile(profileData));
    reset();
  };

  if (!currentUser) {
    return <Spin size="large" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-form']}>
      <h3 className={styles['sign-form__title']}>Edit Profile</h3>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Username</span>
        <input
          {...register('username')}
          type="text"
          className={errors?.username ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.username?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Email address</span>
        <input
          {...register('email')}
          type="email"
          className={errors?.email ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
          placeholder="Email address"
          defaultValue={currentUser.email}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.email?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>New Password</span>
        <input
          {...register('password')}
          type="password"
          className={errors?.password ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
          placeholder="New Password"
          defaultValue={currentUser.password}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.password?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>{'Avatar Image (url)'}</span>
        <input
          {...register('avatar')}
          type="text"
          className={errors?.avatar ? styles['sign-form__label-input--error'] : styles['sign-form__label-input']}
          placeholder="Avatar Image"
          defaultValue={currentUser.image}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.avatar?.message}</span>
      </label>
      {accountErrorMessage === 'editProfile error' ? (
        <span className={styles['sign-form__validation-error-text']}>Error while editing profile. Try later</span>
      ) : null}
      <button type="submit" className={styles['sign-form__button']} disabled={!isValid}>
        Save
      </button>
    </form>
  );
};

export default EditProfile;
