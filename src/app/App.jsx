import styles from './App.module.scss';
import 'inter-ui/inter.css';
import ArticleList from '../components/article-list/ArticleList';
import NoMatch from '../components/no-match/NoMatch';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/sign-in/SignIn';
import SignUp from '../components/sign-up/SignUp';
import EditProfile from '../components/edit-profile/EditProfile';
import Header from '../components/header/Header';
import ArticleForm from '../components/article-form/ArticleForm';
import Article from '../components/article/Article';

function App() {
  return (
    <div className={styles['wrapper']}>
      <Header />
      <main className={styles['main']}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slugValue" element={<Article />} />
          <Route path="new-article" element={<ArticleForm />} />
          <Route path="articles/:slugValue/edit" element={<ArticleForm />} />
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
