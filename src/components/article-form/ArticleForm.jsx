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
  const { slugValue } = useParams();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tagList:
        isEdit && currentUser?.username === article?.author.username
          ? article?.tagList.map((tag) => ({ name: tag }))
          : [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  //
  useEffect(() => {
    if (slugValue) {
      dispatch(fetchArticle(slugValue));
    }
  }, [dispatch, slugValue]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in');
    }
    if (isEdit && currentUser?.username !== article?.author?.username) {
      navigate('/articles');
    }
  }, [isLoggedIn, navigate, isEdit]);

  useEffect(() => {
    if (location.pathname === `/articles/${slugValue}/edit` && currentUser?.username === article?.author?.username) {
      dispatch(setIsEdit(true));
    }
  }, [dispatch, location.pathname, slugValue, isEdit]);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      tagList: data.tagList.map((tag) => tag.name),
      token,
      slugValue,
    };

    if (!isEdit) {
      dispatch(createArticle(newData));
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
        <input
          {...register('title')}
          type="text"
          className={
            errors?.title
              ? styles['sign-form__label-input--error']
              : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
          }
          placeholder="Title"
          defaultValue={isEdit ? article?.title : null}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.title?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Short description</span>
        <input
          {...register('description')}
          type="text"
          className={
            errors?.description
              ? styles['sign-form__label-input--error']
              : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form']].join(' ')
          }
          placeholder="Description"
          defaultValue={isEdit ? article?.description : null}
        />
        <span className={styles['sign-form__validation-error-text']}>{errors?.description?.message}</span>
      </label>
      <label className={styles['sign-form__label']}>
        <span className={styles['sign-form__label-text']}>Text</span>
        <textarea
          {...register('body')}
          type="text"
          className={
            errors?.body
              ? styles['sign-form__label-input--error-textarea']
              : [styles['sign-form__label-input'], styles['sign-form__label-input--article-form-text']].join(' ')
          }
          defaultValue={isEdit ? article?.body : null}
          placeholder="Text"
        />
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
