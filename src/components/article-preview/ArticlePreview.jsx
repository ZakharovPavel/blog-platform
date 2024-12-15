/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import styles from './ArticlePreview.module.scss';
import { Link } from 'react-router-dom';
import { Avatar, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { favoriteArticle, unfavoriteArticle } from '../../utils/ArticleService';

const ArticlePreview = ({ newArticle }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.account);
  const { slug } = newArticle;
  
  const { Text } = Typography;

  const handleFavorite = () => {
    dispatch(favoriteArticle({ token, slug }));
  }

  const handleUnfavorite = () => {
    dispatch(unfavoriteArticle({ token, slug }));
  }

  return (
    <li className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['article-header__left-side']}>
          <div className={styles['article-header__title-container']}>
            <Link className={styles['article-header__title']} to={`/articles/${newArticle.slug}`}>
              {newArticle.title}
            </Link>
            <div className={styles['like-container']}>
              <input
                className={styles['custom-checkbox']}
                id={`${newArticle.slug}`}
                type="checkbox"
                name="favorite"
                checked={newArticle.favorited}
                onChange={newArticle.favorited ? handleUnfavorite : handleFavorite}
                disabled={!isLoggedIn}
              />
              <label htmlFor={`${newArticle.slug}`} className={styles['like-counter']}>
                {newArticle.favoritesCount}
              </label>
            </div>
          </div>
          {newArticle.tagList &&
            newArticle.tagList.map((tag, index) => <Tag key={`${newArticle.slug}_${index}`}>{tag}</Tag>)}
        </div>
        <div className={styles['article-header__right-side']}>
          <div className={styles['article-header__author-info-container']}>
            <span className={styles['article-header__author-name']}>{newArticle.author.username}</span>
            <Text type="secondary">{newArticle.createdAt && format(new Date(newArticle.createdAt), 'MMMM d, y')}</Text>
          </div>
          <Avatar size={46} src={`${newArticle.author.image}`} />
        </div>
      </div>
      <div className={styles['article-description']}>{newArticle.description}</div>
    </li>
  );
};

export default ArticlePreview;
