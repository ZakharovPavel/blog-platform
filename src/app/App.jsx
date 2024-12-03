import styles from './App.module.scss';
import 'inter-ui/inter.css';
import ArticleList from '../components/ArticleList/ArticleList';
import Header from '../components/Header/Header';
import NoMatch from '../components/NoMatch/NoMatch';
import { Route, Routes } from 'react-router-dom';
import Article from '../components/Article/Article';

function App() {
  return (
    <div className={styles['wrapper']}>
      <Header />
      <main className={styles['main']}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />}></Route>
          <Route path="/articles/:slugValue" element={<Article />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
