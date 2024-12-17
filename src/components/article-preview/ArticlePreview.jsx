/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import styles from './ArticlePreview.module.scss';
import { Link } from 'react-router-dom';
import { Avatar, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { favoriteArticle, truncateText, unfavoriteArticle } from '../../utils/ArticleService';

const ArticlePreview = ({ newArticle }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.account);
  const { slug } = newArticle;

  const { Text } = Typography;

  const handleFavorite = () => {
    dispatch(favoriteArticle({ token, slug }));
  };

  const handleUnfavorite = () => {
    dispatch(unfavoriteArticle({ token, slug }));
  };

  return (
    <li className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['article-header__left-side']}>
          <div className={styles['article-header__title-container']}>
            <Link className={styles['article-header__title']} to={`/articles/${newArticle.slug}`}>
              {truncateText(newArticle.title, 50)}
            </Link>
            <button
              type="button"
              onClick={newArticle.favorited ? handleUnfavorite : handleFavorite}
              className={
                newArticle.favorited && isLoggedIn
                  ? styles['article-header__like-button-favorite']
                  : styles['article-header__like-button-unfavorite']
              }
              disabled={!isLoggedIn}
            >
              {newArticle.favoritesCount}
            </button>
          </div>
          {newArticle.tagList &&
            newArticle.tagList.map((tag, index) => {
              if (tag === '') {
                return;
              }
              return <Tag key={`${newArticle.slug}_${index}`}>{tag}</Tag>;
            })}
        </div>
        <div className={styles['article-header__right-side']}>
          <div className={styles['article-header__author-info-container']}>
            <span className={styles['article-header__author-name']}>{newArticle.author.username}</span>
            <Text type="secondary">{newArticle.createdAt && format(new Date(newArticle.createdAt), 'MMMM d, y')}</Text>
          </div>
          <Avatar size={46} src={`${newArticle.author.image}`} />
        </div>
      </div>
      <div className={styles['article-description']}>{truncateText(newArticle.description, 195)}</div>
    </li>
  );
};

export default ArticlePreview;
