import React from 'react';
import './Components/RelatedProductStyles.css';
import InteractiveStarRating from './Components/InteractiveStarRating.jsx';
import StaticStarRating from './Components/StaticStarRating.jsx';
import XIconButton from './Components/XIconButton.jsx';
import RelatedProductCard from './Components/RelatedProductCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

class RPP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomInfo: []
    }
    //this.XIconButtonClickHandler = this.XIconButtonClickHandler.bind(this);
  }


//  XIconButtonClickHandler (event) {
//   console.log("X Icon Button was clicked.")
//  }

  render () {
    return (
      <div className="RPP">
        <RelatedProductCard />
      </div>
    );
  };
};

export default RPP;