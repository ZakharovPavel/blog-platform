import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { handleLogOut, setCurrentUser, setUserToken } from '../../features/account/accountSlice';
import { useEffect } from 'react';
import { getUser } from '../../utils/AccountService';
import { setIsEdit } from '../../features/article/articleSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(setUserToken());

    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn]);

  const handleCreateArticle = () => {
    dispatch(setIsEdit(false));
  };

  const onToggleLogOut = () => {
    dispatch(handleLogOut());
    navigate('/');
  };

  const rightSide = isLoggedIn ? (
    <div className={styles['header__right-side']}>
      <Link
        className={[styles['sign-button'], styles['sign-button--create-article']].join(' ')}
        to="/new-article"
        onClick={handleCreateArticle}
      >
        Create article
      </Link>
      <Link className={[styles['sign-button'], styles['header__profile-preview-button']].join(' ')} to="/profile">
        <span className={styles['header__profile-name']}>{currentUser?.username}</span>
        <Avatar
          size={46}
          src={
            currentUser?.image
              ? currentUser?.image
              : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`
          }
        />
      </Link>
      <button
        className={[styles['sign-button'], styles['sign-button--log-out']].join(' ')}
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
    <header className={styles['header']}>
      <div className={styles['header__left-side']}>
        <NavLink className={styles['header__home-link']} to="/">
          Realworld Blog
        </NavLink>
      </div>
      {rightSide}
    </header>
  );
};

export default Header;
