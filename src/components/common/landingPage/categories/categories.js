/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTags, getArticlesByCategory } from '../../../../redux/actions/landingPageActions';
import Cards from '../card/cards';
import './categories.scss';

const Category = (props) => {
  const [tagsIndex, setTagsIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchArticles = async (allTags) => {
    await props.getArticlesByCategory(allTags, tagsIndex);
    setTagsIndex(tagsIndex + 10);
    setIsFetching(false);
  };

  // fetch tags and call the fetchArticle function on Mount
  useEffect(() => {
    const fetchTags = async () => {
      const res = await props.getTags();
      fetchArticles(res);
    };

    fetchTags();
  }, []);

  // sets isfetching to true once user scrolls to the bottom
  function handleScroll() {
    // eslint-disable-next-line max-len
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // call fetchArticles once isFetching is true
  useEffect(() => {
    if (isFetching) {
      fetchArticles(props.tags);
    }
  }, [isFetching]);

  const { article: { articles } } = props;

  return (
    <div>
      {
      articles.map((singleCategory) => {
        let categoryArticle;
        const cards = singleCategory.articles.allArticles.map((catAticle) => {
          categoryArticle = catAticle;
          return (
            <Cards key={catAticle.title} {...catAticle} />
          );
        });
        return (
          <div key={categoryArticle.tagsList[0]} className="category-container">
            <div className="top-div">
              <p>{categoryArticle.tagsList[0]}</p>
              <p id="related-articles-btn"><Link to="*">related articles <i className="material-icons">navigate_next</i></Link></p>
            </div>
            <div className="bottom-div">
              {cards}
            </div>
          </div>
        );
      })
    }
    </div>
  );
};

Category.propTypes = {
  getTags: PropTypes.func.isRequired,
  getArticlesByCategory: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  tags: state.article.tags,
  article: state.article,
});


export default connect(
  mapStateToProps,
  { getTags, getArticlesByCategory },
)(Category);
