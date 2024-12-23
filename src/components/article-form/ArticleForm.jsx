/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ArticleForm.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createArticle, fetchArticle, updateArticle } from '../../utils/ArticleService';
import { setIsEdit } from '../../features/article/articleSlice';
import { Spin } from 'antd';

const ArticleForm = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, accountErrorMessage, token } = useSelector((state) => state.account);
  const { article, isEdit } = useSelector((state) => state.article);
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  let editableTags;

  if (currentUser?.username === article?.author?.username && isEdit) {
    editableTags = article?.tagList?.map((tag) => {
      return { name: tag };
    });
  }

  const handleTagList = () => {
    if (!isEdit) {
      return [{ name: '' }];
    }
    if (currentUser?.username === article?.author?.username && isEdit) {
      return editableTags;
    } else {
      return [{ name: '' }];
    }
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tagList: handleTagList(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in');
    }
  }, [isLoggedIn, navigate]);

  //
  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (location.pathname === `/articles/${slug}/edit` && currentUser?.username === article?.author?.username) {
      dispatch(setIsEdit(true));
    }
    if (location.pathname === `/new-article` && currentUser?.username === article?.author?.username) {
      dispatch(setIsEdit(false));
    }
  }, [dispatch, location.pathname, slug, isEdit]);

  useEffect(() => {
    if (isEdit && currentUser?.username !== article?.author?.username) {
      navigate('/articles');
    }
  }, [isEdit]);

  useEffect(() => {
    if (!isEdit) {
      reset();
      reset({ tagList: [{ name: '' }] });
    }
  }, [location.pathname, reset, isEdit]);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      tagList: data.tagList.map((tag) => tag.name),
      token,
      slug,
    };

    if (!isEdit) {
      dispatch(createArticle(newData));
      dispatch(setIsEdit(true));
      navigate('/');
    } else {
      dispatch(updateArticle(newData));
      dispatch(setIsEdit(false));
      navigate('/');
    }
  };

  if (isEdit && !article) {
    return <Spin size="large" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-form']}>
      {currentUser?.username === article?.author?.username && isEdit ? (
        <h3 className={styles['sign-form__title']}>Edit article</h3>
      ) : (
        <h3 className={styles['sign-form__title']}>Create new article</h3>
      )}

      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Title</span>
        {currentUser?.username === article?.author?.username && isEdit ? (
          <input
            {...register('title')}
            type="text"
            className={
              errors?.title
                ? styles['sign-form__label-input--error']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
            }
            placeholder="Title"
            defaultValue={article?.title}
          />
        ) : (
          <input
            {...register('title')}
            type="text"
            className={
              errors?.title
                ? styles['sign-form__label-input--error']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
            }
            placeholder="Title"
            defaultValue={''}
          />
        )}
        <span className={styles['sign-form__validation-error-text']}>{errors?.title?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Short description</span>
        {currentUser?.username === article?.author?.username && isEdit ? (
          <input
            {...register('description')}
            type="text"
            className={
              errors?.description
                ? styles['sign-form__label-input--error']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
            }
            placeholder="Description"
            defaultValue={article?.description}
          />
        ) : (
          <input
            {...register('description')}
            type="text"
            className={
              errors?.description
                ? styles['sign-form__label-input--error']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
            }
            placeholder="Description"
            defaultValue={''}
          />
        )}
        <span className={styles['sign-form__validation-error-text']}>{errors?.description?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Text</span>
        {currentUser?.username === article?.author?.username && isEdit ? (
          <textarea
            {...register('body')}
            type="text"
            className={
              errors?.body
                ? styles['sign-form__label-input--error-textarea']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form-text']].join(' ')
            }
            placeholder="Text"
            defaultValue={article?.body}
          />
        ) : (
          <textarea
            {...register('body')}
            type="text"
            className={
              errors?.body
                ? styles['sign-form__label-input--error-textarea']
                : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form-text']].join(' ')
            }
            placeholder="Text"
            defaultValue={''}
          />
        )}
        <span className={styles['sign-form__validation-error-text']}>{errors?.body?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Tags</span>
        <ul className={styles['article-form__tags-list']}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={styles['article-form__tag']}>
                <input
                  {...register(`tagList.${index}.name`)}
                  type="text"
                  className={
                    errors?.tagList
                      ? [
                          styles['sign-form__label-input--error'],
                          styles['sign-form__label-input--tag-list-error'],
                        ].join(' ')
                      : styles['sign-form__label-input']
                  }
                  placeholder="Tag"
                />
                {fields.length > 1 ? (
                  <button
                    type="button"
                    className={styles['article-form__delete-tag-button']}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                ) : null}
                {index === fields.length - 1 ? (
                  <button
                    type="button"
                    className={styles['article-form__add-tag-button']}
                    onClick={() => append({ name: '' })}
                  >
                    Add tag
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
        <span className={styles['sign-form__validation-error-text']}>{errors?.tagList?.message}</span>
      </label>
      {accountErrorMessage === 'createAccount error' ? (
        <span className={styles['sign-form__validation-error-text']}>
          Username or email is already taken. Try others
        </span>
      ) : null}
      <button
        type="submit"
        className={[styles['sign-form__button'], styles['sign-form__button--article-form']].join(' ')}
        disabled={!isValid}
      >
        Send
      </button>
    </form>
  );
};

export default ArticleForm;
