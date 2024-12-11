import styles from './App.module.scss';
import 'inter-ui/inter.css';
import ArticleList from '../components/article-list/ArticleList';
// import Header from '../components/header/Header';
import NoMatch from '../components/no-match/NoMatch';
import { Route, Routes } from 'react-router-dom';
import Article from '../components/article/Article';
import SignIn from '../components/sign-in/SignIn';
import SignUp from '../components/sign-up/SignUp';
import EditProfile from '../components/edit-profile/EditProfile';
import Header from '../components/Header/Header';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    console.log(localStorage.length);
    console.log(localStorage.key(0));
    console.log(localStorage.getItem(localStorage.key(0)));
    
    // localStorage.setItem('12345', 'value12345');
    // console.log(localStorage.length);
    // localStorage.clear();
    // console.log(localStorage.length);
  }, [])

  return (
    <div className={styles['wrapper']}>
      <Header />
      <main className={styles['main']}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slugValue" element={<Article />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
