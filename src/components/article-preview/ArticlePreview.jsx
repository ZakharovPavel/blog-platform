/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import styles from './ArticlePreview.module.scss';
import { Link } from 'react-router-dom';
import { Avatar, Tag, Typography } from 'antd';
import { format } from 'date-fns';

const ArticlePreview = ({ newArticle }) => {
  // const dispatch = useDispatch();
  // const articlesData = useSelector((state) => state.article.articles);
  // const articlesCount = useSelector((state) => state.article.articlesCount);
  // const fetchStatus = useSelector((state) => state.article.status);
  // const currentPage = useSelector((state) => state.article.currentPage);
  // const { articles, articlesCount, status, currentPage } = useSelector((state) => state.article);
  const { isLoggedIn } = useSelector((state) => state.account);
  
  const { Text } = Typography;
  // console.log(newArticle);

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
                id={`${newArticle.id}`}
                type="checkbox"
                name="allFilter"
                // checked={filters.allFilter}
                // onChange={handleAllChange}
                disabled={!isLoggedIn}
              />
              <label htmlFor={`${newArticle.id}`} className={styles['like-counter']}>
                {newArticle.favoritesCount}
              </label>
            </div>
          </div>
          {/* {newArticle.tagList.map((tag, index) => (
              <Tag key={`${newArticle.slug}_${index}`}>{tag}</Tag>
            ))} */}
          {newArticle.tagList &&
            newArticle.tagList.map((tag, index) => <Tag key={`${newArticle.slug}_${index}`}>{tag}</Tag>)}
        </div>
        <div className={styles['article-header__right-side']}>
          <div className={styles['article-header__author-info-container']}>
            <span className={styles['article-header__author-name']}>{newArticle.authorUsername}</span>
            <Text type="secondary">{newArticle.createdAt && format(new Date(newArticle.createdAt), 'MMMM d, y')}</Text>
          </div>
          <Avatar size={46} src={`${newArticle.authorImage}`} />
        </div>
      </div>
      <div className={styles['article-description']}>{newArticle.description}</div>
    </li>
  );
};

export default ArticlePreview;
