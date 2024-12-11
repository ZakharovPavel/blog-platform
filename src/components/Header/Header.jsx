import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Skeleton } from 'antd';
import { handleLogOut, setCurrentUser, setUserToken } from '../../features/account/accountSlice';
import { useEffect } from 'react';
import { getUser } from '../../utils/AccountService';
// import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(setUserToken());

    if (isLoggedIn) {
      dispatch(getUser());

      console.log('get user from header');
    }

    // console.log(isLoggedIn, currentUser);
    // console.log(localStorage.length);
    // console.log(token);
  }, [dispatch, isLoggedIn]);

  // useEffect(() => {
  //   console.log(currentUser);
  //   dispatch(getUser());
  //   // if (currentUser) {
  //   //   dispatch(getUser());
  //   // }
  //   // if (isLoggedIn) {
  //   //   dispatch(getUser());

  //   //   console.log('get user from header');
  //   // }
  // }, [dispatch]);

  const onToggleLogOut = () => {
    dispatch(handleLogOut());
    navigate('/');
    console.log('logout');
    console.log(localStorage.length);
  };

  // if (!currentUser) {
  //   return <Spin size="large" />;
  // }

  const rightSide = isLoggedIn ? (
    <div className={styles['header__right-side']}>
      <button
        className={[styles['sign-button'], styles['sign-button--create-article']].join(' ')}
        onClick={() => navigate('sign-up')}
      >
        Create article
      </button>
      {currentUser ? (
        <button
          className={[styles['sign-button'], styles['header__profile-preview-button']].join(' ')}
          onClick={() => navigate('profile')}
        >
          {/* <span className={styles['header__profile-name']}>John Doe</span> */}
          <span className={styles['header__profile-name']}>{currentUser.username}</span>
          <Avatar
            size={46}
            // src={`https://preview.redd.it/which-surprised-pikachu-is-best-v0-wuwo7ywz4w4b1.png?width=778&format=png&auto=webp&s=819dd4f638abda73d130cab46a2515302f525eab`}
            src={`${currentUser.image}`}
          />
        </button>
      ) : (
        <Skeleton avatar active />
      )}
      <button
        className={[styles['sign-button'], styles['sign-button--log-out']].join(' ')}
        // onClick={() => dispatch(handleLogOut())}
        onClick={() => onToggleLogOut()}
      >
        Log Out
      </button>
    </div>
  ) : (
    <div className={styles['header__right-side']}>
      <button className={styles['sign-button']} onClick={() => navigate('sign-in')}>
        Sign In
      </button>
      <button
        className={[styles['sign-button'], styles['sign-button--sign-up']].join(' ')}
        onClick={() => navigate('sign-up')}
      >
        Sign Up
      </button>
    </div>
  );

  return (
    // <header className={styles['header']}>
    <header className={styles['header']}>
      <div className={styles['header__left-side']}>
        <NavLink className={styles['header__home-link']} to="/">
          Realworld Blog
        </NavLink>
      </div>
      {rightSide}
      {/* <div className={styles['header__right-side']}>
        <button className={styles['sign-button']} onClick={() => navigate('sign-in')}>
          Sign In
        </button>
        <button
          className={[styles['sign-button'], styles['sign-button--sign-up']].join(' ')}
          onClick={() => navigate('sign-up')}
        >
          Sign Up
        </button>
      </div> */}
    </header>
  );
};

export default Header;
