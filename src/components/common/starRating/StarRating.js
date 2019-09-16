import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { rateArticle } from '@Actions/articleActions';

const RateComponent = ({
  rateArticle: rateFunction,
  slug,
  rate,
  editable,
}) => {
  const [currentUserRate, setCurrentUserRate] = useState(0);
  useEffect(() => {
    const previousRate = (rate === undefined || rate === 'null') ? 0 : rate;
    setCurrentUserRate(previousRate);
  }, [rate]);

  /* istanbul ignore next-line */
  const updateCurrentUserRate = async (newValue) => {
    setCurrentUserRate(newValue);
    const sendRating = async () => {
      const isSuccessfull = await rateFunction({ rate: newValue }, slug);
      return isSuccessfull;
    };
    const isSuccessfull = await sendRating();
    // eslint-disable-next-line no-unused-vars
    const resetRating = isSuccessfull === 'false' ? setCurrentUserRate(0) : null;
  };
  return (
    <div className="star_rate_component">
      <StarRatingComponent
        name="articleRate"
        starCount={5}
        value={parseInt(currentUserRate, 10)}
        onStarClick={updateCurrentUserRate}
        starColor="#FFCC00"
        emptyStarColor="grey"
        editing={editable}
      />
    </div>
  );
};

RateComponent.propTypes = {
  rateArticle: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default connect(
  null,
  { rateArticle },
)(RateComponent);
