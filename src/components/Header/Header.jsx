import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    // <header className={styles['header']}>
    <header className={styles['header']}>
      <div className={styles['header__left-side']}>
        {/* <span className={styles['header__home-link']}>Realworld Blog</span> */}
        <NavLink className={styles['header__home-link']} to='/'>Realworld Blog</NavLink>
      </div>
      <div className={styles['header__right-side']}>
        <button className={styles['sign-button']}>Sign In</button>
        <button className={[styles['sign-button'], styles['sign-button--sign-up']].join(' ')}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
