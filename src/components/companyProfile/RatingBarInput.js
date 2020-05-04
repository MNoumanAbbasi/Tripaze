import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class RatingBarInput extends React.Component {
  constructor() {
    super();

    this.state = {
      hoverRating: 1,
      rating: 1,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.props.onChange(nextValue);
  }

  onStarHover(nextValue, prevValue, name) {
    this.setState({ hoverRating: nextValue });
  }

  onStarHoverOut(nextValue, prevValue, name) {
    this.setState({ hoverRating: this.state.rating });
  }

  render() {
    const { hoverRating } = this.state;

    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={hoverRating}
          className="ml-2 mb-4"
          renderStarIcon={(index, value) => {
            return (
              <span>
                {' '}
                <i className={'fa fa-star fa-2x'} />
              </span>
            );
          }}
          onStarClick={this.onStarClick.bind(this)}
          onStarHover={this.onStarHover.bind(this)}
          onStarHoverOut={this.onStarHoverOut.bind(this)}
        />
      </div>
    );
  }
}
export default RatingBarInput;
