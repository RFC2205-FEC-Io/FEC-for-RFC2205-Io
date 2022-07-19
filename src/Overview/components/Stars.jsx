import React, {useState} from 'react';
import axios from 'axios';

const Stars = ({reviews}) => {
  const [review, getReviews] =  useState([]);
  var numOfReviews = 0;

  const avgRating = () => {
    var ratingsArr = [];
    var sum = 0;
    var avg = 0;
    reviews.map((review) => {
      ratingsArr.push(review.rating);
      numOfReviews += 1;
    })
    ratingsArr.forEach((rating) => {
      sum += rating;
    })
    avg = sum / ratingsArr.length;
    return avg;
    console.log('avg:', avg);
  };
  var average = avgRating();

  const starRatings = (average) => {
    average *= 1000;

    if (average > 4875) {
      return (<img id='stars' src={_5star}/>);
    } else if (average >= 4625) {
      return (<img id='stars' src='/assets/stars/Star_Rating475.png'/>);
    } else if (average >= 4500) {
      return (<img id='stars' src='/assets/stars/Star_Rating450.png'/>);
    } else if (average >= 4225) {
      return (<img id='stars' src='/assets/stars/Star_Rating425.png'/>);
    } else if (average >= 4000) {
      return (<img id='stars' src='/assets/stars/Star_Rating400.png'/>);
    } else if (average >= 3725) {
      return (<img id='stars' src='/assets/stars/Star_Rating375.png'/>);
    }  else if (average >= 3500) {
      return (<img id='stars' src='/assets/stars/Star_Rating350.png'/>);
    } else if (average >= 3225) {
      return (<img id='stars' src='/assets/stars/Star_Rating325.png'/>);
    } else if (average >= 3000) {
      return (<img id='stars' src='/assets/stars/Star_Rating300.png'/>);
    } else if (average >= 2275) {
      return (<img id='stars' src='/assets/stars/Star_Rating275.png'/>);
    } else if (average >= 2500) {
      return (<img id='stars' src='/assets/stars/Star_Rating250.png'/>);
    } else if (average >= 2250) {
      return (<img id='stars' src='/assets/stars/Star_Rating225.png'/>);
    } else if (average >= 2000) {
      return (<img id='stars' src='/assets/stars/Star_Rating200.png'/>);
    } else if (average >= 1750) {
      return (<img id='stars' src='/assets/stars/Star_Rating175.png'/>);
    } else if (average >= 1500) {
      return (<img id='stars' src='/assets/stars/Star_Rating150.png'/>);
    } else if (average >= 1250) {
      return (<img id='stars' src='/assets/stars/Star_Rating125.png'/>);
    } else if (average >= 1000) {
      return (<img id='stars' src='/assets/stars/Star_Rating100.png'/>);
    } else if (average >= 750) {
      return (<img id='stars' src='/assets/stars/Star_Rating075.png'/>);
    } else if (average >= 500) {
      return (<img id='stars' src='/assets/stars/Star_Rating050.png'/>);
    } else if (average >= 230) {
      return (<img id='stars' src='/assets/stars/Star_Rating025.png'/>);
    } else {
      return (<img id='stars' src='/assets/stars/Star_Rating000.png'/>);
    }
  }

  return (
    <div>
      {starRatings(average)}
      Read All {numOfReviews} reviews
    </div>
  );

}

export default Stars;