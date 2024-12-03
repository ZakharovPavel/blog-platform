import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, generateKey, transformArticle } from '../../utils/PlatformService';
import styles from './ArticleList.module.scss';
import { Link } from 'react-router-dom';
import { Alert, Avatar, Pagination, Spin, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { setCurrentPage } from '../../features/article/articleSlice';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articlesData = useSelector((state) => state.article.articles);
  const articlesCount = useSelector((state) => state.article.articlesCount);
  const isLoggedIn = useSelector((state) => state.article.isLoggedIn);
  const fetchStatus = useSelector((state) => state.article.status);
  const currentPage = useSelector((state) => state.article.currentPage);

  const { Text } = Typography;

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const articles = articlesData.map((article) => {
    const newArticle = transformArticle(article, generateKey(article.slug));
    const { id } = newArticle;

    return (
      <li key={id} className={styles['article']}>
        <div className={styles['article-header']}>
          <div className={styles['article-header__left-side']}>
            <div className={styles['article-header__title-container']}>
              <Link className={styles['article-header__title']} to={`/articles/${newArticle.slug}`}>
                {newArticle.title}
              </Link>
              <div className={styles['like-container']}>
                <input
                  className={styles['custom-checkbox']}
                  id={`${id}`}
                  type="checkbox"
                  name="allFilter"
                  // checked={filters.allFilter}
                  // onChange={handleAllChange}
                  disabled={!isLoggedIn}
                />
                <label htmlFor={`${id}`} className={styles['like-counter']}>
                  {newArticle.favoritesCount}
                </label>
              </div>
            </div>
            {newArticle.tagList.map((tag, index) => (
              <Tag key={`${newArticle.slug}_${index}`}>{tag}</Tag>
            ))}
          </div>
          <div className={styles['article-header__right-side']}>
            <div className={styles['article-header__author-info-container']}>
              <span className={styles['article-header__author-name']}>{newArticle.authorUsername}</span>
              <Text type="secondary">
                {newArticle.createdAt && format(new Date(newArticle.createdAt), 'MMMM d, y')}
              </Text>
            </div>
            <Avatar size={46} src={`${newArticle.authorImage}`} />
          </div>
        </div>
        <div className={styles['article-description']}>{article.description}</div>
      </li>
    );
  });

  const spinner = fetchStatus === 'loading' ? <Spin size="large" /> : null;
  const errorMessage =
    fetchStatus === 'error' ? (
      <Alert className={styles['fetch-error-message']} message="Ошибка загрузки статей" type="error" />
    ) : null;

  const noData =
    articlesData.length === 0 && fetchStatus !== 'loading' && fetchStatus !== 'error' ? (
      <div className={styles['no-data-text']}>Статьи не найдены</div>
    ) : null;

  const content =
    articlesData.length !== 0 && fetchStatus !== 'loading' && fetchStatus !== 'error' ? (
      <>
        <ul className={styles['article-list']}>{articles}</ul>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={articlesCount}
          pageSize={20}
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
      {/* <ul className={styles['article-list']}>{articles}</ul>
      <Pagination defaultCurrent={1} total={articlesCount} pageSize={20} align="center" onChange={(page) => { dispatch(fetchArticles(page))}} /> */}
    </section>
  );
};

export default ArticleList;
