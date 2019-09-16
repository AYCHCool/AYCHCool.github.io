
import API_SERVICE from '@Utils/API';
import isEmpty from '@Utils/isEmpty';
import authenticationErrorAlert from '@Utils/authenticationErrorAlert';
import {
  GET_ARTICLES,
  GET_ARTICLE_ERROR,
  GET_SINGLE_ARTICLE,
  ARTICLE_LOADING,
  CLEAR_ARTICLE_ERROR,
  CREATE_COMMENT,
  GET_ARTICLE_STAT,
  SET_ARTICLE_RATE,
} from './types/articleType';

const articles = [];

export const articleLoading = () => ({
  type: ARTICLE_LOADING,
  payload: {
    loading: true,
  },
});

export const getSingleArticle = article => ({
  type: GET_SINGLE_ARTICLE,
  payload: {
    loading: false,
    article,
  },
});

export const createArticleComment = comment => ({
  type: CREATE_COMMENT,
  payload: {
    loading: false,
    comment,
  },
});

export const articleError = error => ({
  type: GET_ARTICLE_ERROR,
  payload: {
    loading: false,
    error,
  },
});

export const clearArticleError = () => ({
  type: CLEAR_ARTICLE_ERROR,
  payload: {
    error: {},
  },
});

export const articleStat = payload => ({
  type: GET_ARTICLE_STAT,
  payload,
});

export const setRate = payload => ({
  type: SET_ARTICLE_RATE,
  payload,
});

export const getArticleBySlug = (slug, userId) => async (dispatch) => {
  dispatch(clearArticleError());
  dispatch(articleLoading());
  try {
    const fetchedArticle = await API_SERVICE.get(`/articles/${slug}`);
    const { tagsList } = fetchedArticle.data.article;
    if (!isEmpty(tagsList)) {
      const randomTag = tagsList[Math.floor(Math.random() * tagsList.length)];
      const relatedArticles = await API_SERVICE.get(`/search?keyword=${randomTag}`);
      fetchedArticle.data.article.relatedArticles = relatedArticles.data.matches.tags;
    }
    dispatch(getSingleArticle(fetchedArticle.data.article));
    if (userId) {
      const articleId = fetchedArticle.data.article.id;
      const authorId = fetchedArticle.data.article.author.id;
      const data = {
        userId,
        articleId,
        authorId,
      };
      const res = await API_SERVICE.post('/articles/getcurrentarticlestat', data);
      dispatch(articleStat(res.data.articleStat.articleStat));
      return res.data.articleStat;
    }
    return true;
  } catch (error) {
    return dispatch(articleError(error.response.data.errors));
  }
};

export const createArticleOnComment = (slug, comment) => async (dispatch) => {
  try {
    const postComment = await API_SERVICE.post(`/articles/${slug}/comments`, comment);
    dispatch(createArticleComment(postComment.data.comment));
  } catch (error) {
    dispatch(articleError(error.response.data.errors));
  }
};

export const getArticles = () => ({
  type: GET_ARTICLES,
  payload: { articles, loading: false },
});

export const rateArticle = (rate, slug) => async (dispatch) => {
  try {
    await API_SERVICE.post(`/articles/${slug}/ratings`, rate);
    await API_SERVICE.get(`/articles/${slug}/ratings`);
    const fetchedArticle = await API_SERVICE.get(`/articles/${slug}`);
    dispatch(setRate(fetchedArticle.data.article.ratings));
    return true;
  } catch (error) {
    authenticationErrorAlert(error.response.data.errors.message);
    return 'false';
  }
};
