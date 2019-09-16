import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { instance } from '@Utils/API';
import {
  GET_SINGLE_ARTICLE,
  ARTICLE_LOADING,
  GET_ARTICLE_ERROR,
  CLEAR_ARTICLE_ERROR,
  CREATE_COMMENT,
  GET_ARTICLE_STAT,
  SET_ARTICLE_RATE,
} from './types/articleType';
import { getArticleBySlug, createArticleOnComment, rateArticle } from './articleActions';

const mockStore = configureMockStore([thunk]);

const articleResponse = {
  isPaid: false,
  ratings: 5,
  id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
  title: 'The Curious Case of Benjamin Buttons',
  slug: 'getting-started-with-nodejs-&-express-1564498223366-74536',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor leo a diam sollicitudin tempor id eu. Dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Nunc sed blandit libero volutpat. In egestas erat imperdiet sed euismod. Neque convallis a cras semper auctor neque vitae tempus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Lacus vel facilisis volutpat est velit egestas dui id. Non nisi est sit amet facilisis magna. Pulvinar sapien et ligula ullamcorper malesuada. Ipsum consequat nisl vel pretium. Elit eget gravida cum sociis. Lacinia at quis risus sed vulputate odio ut. Laoreet non curabitur gravida arcu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Magna fringilla urna porttitor rhoncus dolor. Amet dictum sit amet justo donec enim diam vulputate ut. Sit amet est placerat in.',
  tagsList: [
    'tech', 'fashion',
  ],
  status: 'published',
  userId: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
  readTime: 3,
  createdAt: '2019-07-30T14:50:23.368Z',
  updatedAt: 'Unknown Type: date',
  author: {
    id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
    firstName: 'Darth',
    lastName: 'Vader',
    email: 'darthssvader@gmail.com',
    profile: {
      id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
      userId: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
      bio: 'I am just a guy who loves to code, bro',
      avatar: 'https://www.instagram.com/darth_vader/img.jpg',
      createdAt: '2019-07-30T14:00:23.458Z',
      updatedAt: 'Unknown Type: date',
    },
  },
  likes: 1,
  dislikes: 0,
  relatedArticles: [],
};
const relatedArticlesResponse = {
  matches: {
    tags: [
      {
        isPaid: false,
        ratings: 5,
        id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
        title: 'The Curious Case of Benjamin Buttons',
        slug: 'getting-started-with-nodejs-&-express-1564498223366-74536',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor leo a diam sollicitudin tempor id eu. Dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Nunc sed blandit libero volutpat. In egestas erat imperdiet sed euismod. Neque convallis a cras semper auctor neque vitae tempus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Lacus vel facilisis volutpat est velit egestas dui id. Non nisi est sit amet facilisis magna. Pulvinar sapien et ligula ullamcorper malesuada. Ipsum consequat nisl vel pretium. Elit eget gravida cum sociis. Lacinia at quis risus sed vulputate odio ut. Laoreet non curabitur gravida arcu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Magna fringilla urna porttitor rhoncus dolor. Amet dictum sit amet justo donec enim diam vulputate ut. Sit amet est placerat in.',
        tagsList: [
          'tech', 'fashion',
        ],
        status: 'published',
        userId: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
        readTime: 3,
        createdAt: '2019-07-30T14:50:23.368Z',
        updatedAt: 'Unknown Type: date',
        author: {
          id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
          firstName: 'Darth',
          lastName: 'Vader',
          email: 'darthssvader@gmail.com',
          profile: {
            id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
            userId: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
            bio: 'I am just a guy who loves to code, bro',
            avatar: 'https://www.instagram.com/darth_vader/img.jpg',
            createdAt: '2019-07-30T14:00:23.458Z',
            updatedAt: 'Unknown Type: date',
          },
        },
        likes: 1,
        dislikes: 0,
      },
    ],
  },
};

const commentResponse = {
  comment: {
    type: 'parent',
    likes: 0,
    containsHighlightedText: false,
    id: '3c61b14c-890f-4869-94df-18bd22e8b683',
    body: 'oshe badest',
    userId: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
    articleId: '7e47d8a3-72fa-4175-b0c7-0c0e7f7b7023',
    articleSlug: 'reprehenderit-aut-ullam',
    updatedAt: '2019-09-10T14:54:15.604Z',
    createdAt: '2019-09-10T14:54:15.604Z',
    highlightedText: null,
  },
};

jest.mock('axios');

describe('Get single article action', () => {
  const store = mockStore({
    singleArticle: {
      articles: [],
      article: {},
      articleStat: {},
      loading: false,
      error: {},
    },
  });

  beforeEach(() => {
    moxios.install(instance);
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should dispatch ARTICLE LOADING and GETTING SINGLE ARTICLE when getting an article by slug', async () => {
    const successfulRequest = {
      data: {
        article: articleResponse,
      },
    };

    const successfulRelatedArticlesRequest = {
      data: relatedArticlesResponse,
    };

    const expectedActions = [
      {
        type: CLEAR_ARTICLE_ERROR,
        payload: {
          error: {},
        },
      },
      {
        type: ARTICLE_LOADING,
        payload: { loading: true },
      },
      {
        type: GET_SINGLE_ARTICLE,
        payload: {
          loading: false,
          article: articleResponse,
        },
      },
    ];

    axios.get.mockResolvedValueOnce(successfulRequest);
    axios.get.mockResolvedValueOnce(successfulRelatedArticlesRequest);
    await store.dispatch(getArticleBySlug());
    const response = store.getActions();
    expect(response).toEqual(expectedActions);
  });

  it('should dispatch ARTICLE LOADING and GET_ARTICLE_ERROR for an errored request', async () => {
    const failedRequest = {
      response: {
        data: {
          errors: {
            article: 'Article not found',
          },
        },
      },
    };

    const expectedActions = [
      {
        type: CLEAR_ARTICLE_ERROR,
        payload: {
          error: {},
        },
      },
      {
        type: ARTICLE_LOADING,
        payload: {
          loading: true,
        },
      },
      {
        type: GET_ARTICLE_ERROR,
        payload: {
          loading: false,
          error: {
            article: 'Article not found',
          },
        },
      },
    ];

    axios.get.mockRejectedValue(failedRequest);
    await store.dispatch(getArticleBySlug());
    const response = store.getActions();
    expect(response).toEqual(expectedActions);
  });

  it('should dispatch LOADING and CREATE COMMENT', async () => {
    const successfulRequest = {
      data: {
        comment: commentResponse,
      },
    };

    const expectedActions = [
      {
        type: CREATE_COMMENT,
        payload: {
          loading: false,
          comment: commentResponse,
        },
      },
    ];

    await axios.post.mockResolvedValue(successfulRequest);
    await store.dispatch(createArticleOnComment());
    const response = store.getActions();
    expect(response).toEqual(expectedActions);
  });

  it('should dispatch an error when something went wrong with creating comments', async () => {
    const failedRequest = {
      response: {
        data: {
          errors: {
            message: 'Something went wrong, we are working on a fix',
          },
        },
      },
    };
    const expectedAction = [
      {
        type: GET_ARTICLE_ERROR,
        payload: {
          loading: false,
          error: {
            message: 'Something went wrong, we are working on a fix',
          },
        },
      },
    ];
    await axios.post.mockRejectedValue(failedRequest);
    await store.dispatch(createArticleOnComment());
    const response = store.getActions();
    expect(response).toEqual(expectedAction);
  });

  it('should dispatch ARTICLE STAT when getting an articleStat', async () => {
    const successfulRequest = {
      data: {
        article: articleResponse,
      },
    };

    const successfulRelatedArticlesRequest = {
      data: relatedArticlesResponse,
    };

    const expectedArticleStat = {
      like: null,
      rate: null,
      follwedAuthor: false,
      bookmarkedArticle: true,
    };
    const expectedActions = [
      {
        type: CLEAR_ARTICLE_ERROR,
        payload: {
          error: {},
        },
      },
      {
        type: ARTICLE_LOADING,
        payload: { loading: true },
      },
      {
        type: GET_SINGLE_ARTICLE,
        payload: {
          loading: false,
          article: articleResponse,
        },
      },
      {
        type: GET_ARTICLE_STAT,
        payload: expectedArticleStat,
      },
    ];
    const expectedResponse = {
      data: {
        articleStat: {
          articleStat: expectedArticleStat,
        },
      },
    };
    axios.get.mockResolvedValueOnce(successfulRequest);
    axios.get.mockResolvedValueOnce(successfulRelatedArticlesRequest);
    axios.post.mockResolvedValueOnce(expectedResponse);
    await store.dispatch(getArticleBySlug('getting-started-with-nodejs-&-express-1564498223366-74536', '10ba038e-48da-487b-96e8-8d3b99b6d18a'));
    const response = store.getActions();
    expect(response).toEqual(expectedActions);
  });

  it('should dispatch ARTICLE STAT when getting an articleStat', async () => {
    const successfulRatingRequest = {
      data: {
        article: {
          articleId: '692778f9-0ff9-4a5d-b979-85afb4a2c8a8',
          firstName: 'John',
          lastName: 'Done',
          message: 'Your rating has been added successfully',
          rate: 2,
        },
      },
    };
    const successfulGetRatingRequest = {
      data: {
        article: [],
      },
    };
    const successfulArticleRequest = {
      data: {
        article: articleResponse,
      },
    };
    const expectedActions = [
      {
        type: SET_ARTICLE_RATE,
        payload: 5,
      },
    ];
    axios.post.mockResolvedValueOnce(successfulRatingRequest);
    axios.get.mockResolvedValueOnce(successfulGetRatingRequest);
    axios.get.mockResolvedValueOnce(successfulArticleRequest);
    await store.dispatch(rateArticle(5, '3-bad-guys'));
    const response = store.getActions();
    expect(response).toEqual(expectedActions);
  });
});
