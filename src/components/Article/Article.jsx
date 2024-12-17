import styles from './Article.module.scss';
import { Avatar, Popconfirm, Spin, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteArticle, favoriteArticle, fetchArticle, unfavoriteArticle } from '../../utils/ArticleService';
import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { setIsEdit } from '../../features/article/articleSlice';

const Article = () => {
  const { Text } = Typography;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slugValue } = useParams();
  const { isLoggedIn, currentUser, token } = useSelector((state) => state.account);
  const { article, status } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchArticle(slugValue));
  }, [dispatch, slugValue]);

  if (status === 'error') {
    return <h2>Page not found</h2>;
  }

  if (!article || status === 'loading') {
    return <Spin size="large" />;
  }

  const handleDelete = () => {
    const data = {
      slugValue,
      token,
    };

    dispatch(deleteArticle(data));
    navigate(`/`);
  };

  const handleEdit = () => {
    dispatch(fetchArticle(slugValue));
    dispatch(setIsEdit(true));
    navigate(`/articles/${slugValue}/edit`);
  };

  const handleFavorite = () => {
    const data = {
      slug: slugValue,
      token,
    };

    dispatch(favoriteArticle(data));
  };

  const handleUnfavorite = () => {
    const data = {
      slug: slugValue,
      token,
    };

    dispatch(unfavoriteArticle(data));
  };

  return (
    <article className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['article-header__left-side']}>
          <div className={styles['article-header__title-container']}>
            <span className={styles['article-header__title']}>{article.title}</span>
            <div className={styles['like-container']}>
              <button
                type="button"
                onClick={article.favorited ? handleUnfavorite : handleFavorite}
                className={
                  article.favorited && isLoggedIn
                    ? styles['article-header__like-button-favorite']
                    : styles['article-header__like-button-unfavorite']
                }
                disabled={!isLoggedIn}
              >
                {article.favoritesCount}
              </button>
            </div>
          </div>
          <div className={styles['article-header__tags-container']}>
            {article.tagList &&
              article.tagList.map((tag, index) => {
                if (tag === '') {
                  return;
                }
                return <Tag key={`${article.slug}_${index}`}>{tag}</Tag>;
              })}
          </div>
          <Text className={styles['article-description']} type="secondary">
            {article.description}
          </Text>
        </div>
        <div className={styles['article-header__right-side']}>
          <div className={styles['article-header__author-info']}>
            <div className={styles['article-header__author-info-container']}>
              <span className={styles['article-header__author-name']}>{article.author.username}</span>
              <Text type="secondary">{article.createdAt && format(new Date(article.createdAt), 'MMMM d, y')}</Text>
            </div>
            <Avatar size={46} src={`${article.author.image}`} />
          </div>

          {isLoggedIn && currentUser.username === article.author.username ? (
            <div className={styles['article-header__control-buttons-container']}>
              <Popconfirm
                title="Delete the article"
                description="Are you sure to delete this article?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                placement="rightTop"
              >
                <button type="button" className={styles['article-header__delete-button']}>
                  Delete
                </button>
              </Popconfirm>
              <button type="button" className={styles['article-header__edit-button']} onClick={handleEdit}>
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Markdown className={styles['article-body']}>{article.body}</Markdown>
    </article>
  );
};

export default Article;
