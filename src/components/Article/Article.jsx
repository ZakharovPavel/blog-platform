import styles from './Article.module.scss';
import { Avatar, Spin, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../utils/ArticleService';
import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';

const Article = () => {
  const { Text } = Typography;

  const dispatch = useDispatch();
  const { slugValue } = useParams();
  const { isLoggedIn } = useSelector((state) => state.account);
  const { article, status } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchArticle(slugValue));
  }, [dispatch]);

  // if (!article) {
  //   return <Spin size="large" />;
  // }

  if (!article || status === 'loading') {
    return <Spin size="large" />;
  }

  return (
    <article className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['article-header__left-side']}>
          <div className={styles['article-header__title-container']}>
            <span className={styles['article-header__title']}>{article.title}</span>
            <div className={styles['like-container']}>
              <input
                className={styles['custom-checkbox']}
                id={`${article.slug}`}
                type="checkbox"
                name="allFilter"
                // checked={filters.allFilter}
                // onChange={handleAllChange}
                disabled={!isLoggedIn}
              />
              <label htmlFor={`${article.slug}`} className={styles['like-counter']}>
                {article.favoritesCount}
              </label>
            </div>
          </div>
          <div className={styles['article-header__tags-container']}>
            {article.tagList && article.tagList.map((tag, index) => <Tag key={`${article.slug}_${index}`}>{tag}</Tag>)}
          </div>
        </div>
        <div className={styles['article-header__right-side']}>
          <div className={styles['article-header__author-info-container']}>
            <span className={styles['article-header__author-name']}>{article.author.username}</span>
            <Text type="secondary">{article.createdAt && format(new Date(article.createdAt), 'MMMM d, y')}</Text>
          </div>
          <Avatar size={46} src={`${article.author.image}`} />
        </div>
      </div>
      <Text className={styles['article-description']} type="secondary">
        {article.description}
      </Text>
      <Markdown className={styles['article-body']}>{article.body}</Markdown>
    </article>
  );
};

export default Article;
