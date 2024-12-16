/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, generateKey } from '../../utils/ArticleService';
import styles from './ArticleList.module.scss';
import { Alert, Pagination, Spin } from 'antd';
import { useEffect } from 'react';
import { setCurrentPage } from '../../features/article/articleSlice';
import ArticlePreview from '../article-preview/ArticlePreview';

const ArticleList = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount, status, currentPage } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch]);

  const articlesData = articles.map((article) => {
    const id = generateKey(article.slug);

    return <ArticlePreview key={id} newArticle={article} />;
  });

  const spinner = status === 'loading' ? <Spin size="large" /> : null;
  const errorMessage =
    status === 'error' ? (
      <Alert className={styles['fetch-error-message']} message="Ошибка загрузки статей" type="error" />
    ) : null;

  const noData =
    articles.length === 0 && status !== 'loading' && status !== 'error' ? (
      <div className={styles['no-data-text']}>Статьи не найдены</div>
    ) : null;

  const content =
    articles.length !== 0 && status !== 'loading' && status !== 'error' ? (
      <>
        <ul className={styles['article-list']}>{articlesData}</ul>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={articlesCount}
          pageSize={5}
          align="center"
          showSizeChanger={false}
          onChange={(page) => {
            dispatch(fetchArticles(page));
            dispatch(setCurrentPage(page));
          }}
        />
      </>
    ) : null;

  return (
    <section className={styles['article-list-container']}>
      {spinner}
      {errorMessage}
      {noData}
      {content}
    </section>
  );
};

export default ArticleList;
