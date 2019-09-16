import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { ArticleComponent } from './Article';

const initialState = {
  singleArticle: {
    article: [],
    articles: {},
    articleStat: {},
    loading: false,
    error: {},
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const articleBody = { time: 1567744869596, blocks: [{ type: 'header', data: { text: 'Hey Panini', level: 3 } }, { type: 'paragraph', data: { text: '<i>This could be a</i>&nbsp;<i><b>quoted text</b></i>' } }, { type: 'paragraph', data: { text: 'This is a sample article for the test to render' } }, { type: 'paragraph', data: { text: 'Mic check' } }, { type: 'list', data: { style: 'unordered', items: ['Unordered 1', 'Order'] } }], version: '2.15.0' };
const article = {
  isPaid: false,
  ratings: 5,
  id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
  title: 'The Curious Case of Benjamin Buttons',
  slug: 'getting-started-with-nodejs-&-express-1564498223366-74536',
  body: JSON.stringify(articleBody),
  tagsList: [
    'technology',
    'NodeJS',
    'Express',
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
};

const articleWithoutTags = {
  isPaid: false,
  ratings: 5,
  id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
  title: 'The Curious Case of Benjamin Buttons',
  slug: 'getting-started-with-nodejs-&-express-1564498223366-74536',
  body: JSON.stringify(articleBody),
  tagsList: [],
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
};

describe('Article component', () => {
  describe('View article component', () => {
    window.scrollTo = () => {};
    it('should render a loading message when the article is loading', () => {
      const props = {
        singleArticle: {
          error: {

          },
        },
        loading: true,
        error: {},
        getArticleBySlug: jest.fn(),
        match: {
          params: { slug: article.slug },
        },
      };

      const component = mount(
        <Provider store={store}>
          <Router>
            <ArticleComponent {...props} />
          </Router>
        </Provider>,
      );
      expect(component.find('center').length).toEqual(1);
      expect(component.find('Loader').length).toEqual(1);
    });
  });

  it('should render an error message when the article is not found', () => {
    const props = {
      singleArticle: {
        error: {
        },
      },
      loading: false,
      error: {
        article: 'Article does not exist',
      },
      getArticleBySlug: jest.fn(),
      match: {
        params: { slug: 'some-slug' },
      },
    };

    const component = mount(
      <Provider store={store}>
        <Router>
          <ArticleComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(component.find('.article__notfound').length).toEqual(1);
    expect(component.find('h1').length).toEqual(1);
  });

  it('should render an article successfully', () => {
    const props = {
      singleArticle: article,
      loading: false,
      error: {},
      getArticleBySlug: jest.fn(),
      match: {
        params: { slug: 'some-slug' },
      },
      articleStat: {
        like: 0,
        rate: 5,
      },
    };
    let component;
    act(() => {
      component = mount(
        <Provider store={store}>
          <Router>
            <ArticleComponent {...props} />
          </Router>
        </Provider>,
      );
    });
    expect(component.find('.article_title__row').length).toEqual(1);
    expect(component.find('.article__author__details').length).toEqual(1);
    expect(component.find('.article__description').length).toEqual(1);
  });

  it('should render an article without tags and a body successfully with a message', () => {
    const props = {
      signleArticle: articleWithoutTags,
      loading: false,
      error: {},
      getArticleBySlug: jest.fn(),
      match: {
        params: { slug: 'some-slug' },
      },
      articleStat: {
        like: 0,
        rate: 5,
      },
    };
    let component;
    act(() => {
      component = mount(
        <Provider store={store}>
          <Router>
            <ArticleComponent store={store} {...props} rate={4} />
          </Router>
        </Provider>,
      );
    });
    expect(component.find('.article_title__row').length).toEqual(1);
    expect(component.find('.article__author__details').length).toEqual(1);
    expect(component.find('.article__description').length).toEqual(1);
    expect(component.find('.article__no__tags').length).toEqual(1);
    expect(component.find('.article__no__comments').length).toEqual(1);
  });

  it('should render related articles', () => {
    const props = {
      signleArticle: articleWithoutTags,
      loading: false,
      error: {},
      getArticleBySlug: jest.fn(),
      match: {
        params: { slug: 'some-slug' },
      },
      relatedArticles: [article],
      articleStat: {
        like: null,
        rate: null,
        followedAuthor: false,
      },
    };

    const component = mount(
      <Provider store={store}>
        <Router>
          <ArticleComponent {...props} />
        </Router>
      </Provider>,
    );

    const relatedArticleContainer = component.find('.related__article__container');
    const articleTitle = relatedArticleContainer.find('#article-title');
    expect(articleTitle.html()).toEqual('<p id="article-title">The Curious Case of Benjamin Buttons</p>');
  });
  it('should render related articles', () => {
    const props = {
      signleArticle: articleWithoutTags,
      loading: false,
      error: {},
      getArticleBySlug: jest.fn(),
      match: {
        params: { slug: 'some-slug' },
      },
      relatedArticles: [article],
      articleStat: {
        like: 0,
        rate: 5,
      },
    };
    const component = mount(
      <Provider store={store}>
        <Router>
          <ArticleComponent {...props} />
        </Router>
      </Provider>,
    );
    const relatedArticleContainer = component.find('.related__article__container');
    const articleTitle = relatedArticleContainer.find('#article-title');
    expect(articleTitle.html()).toEqual('<p id="article-title">The Curious Case of Benjamin Buttons</p>');
  });
});
