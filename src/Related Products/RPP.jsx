import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import _, { groupBy } from 'underscore';
import { Container, Navbar } from 'react-bootstrap';
import './Components/RelatedProductsCarouselComponent/RelatedProductStyles.css';
import RelatedProductsCarousel from './Components/RelatedProductsCarouselComponent/RelatedProductsCarousel.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComparisonModalWindow from './Components/ComparisonModalComponent/ComparisonModalWindow.jsx';


const RPP = (props) => {
    /*State*/
    const [index, setIndex] = useState(0);
    //const [relatedProductCardId, setRelatedProductCardId] = useState();
    const [relatedProductsInfoSummaries, setRelatedProductsInfoSummaries] = useState([]);
    const [relatedProductCardInfo, setRelatedProductCardInfo] = useState({});
    const [currentProductCardInfo, setCurrentProductCardInfo] = useState({});
    const [comparisonCardFeatures, setComparisonCardFeatures] = useState({});
    const [currentCardFeatures, setCurrentCardFeatures] = useState({});
    const [relatedCardFeatures, setRelatedCardFeatures] = useState({});
    const [show, setShow] = useState(false);


    /*Helper functions */
   useEffect(() => {
    const fetchData =  async () => {
      const data =  await getAllData();
      setRelatedProductsInfoSummaries(data);
    };
    fetchData();
   }, []);

   const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

    /*This is a function for mapping when the iteratee is asynchronous (like axios requests)*/
  const mapInBatches = (array, iteratee, batchSize) => {
    const batches = _.groupBy(array, (_v, i) => Math.floor(i/batchSize));
    return Object.values(batches).reduce(async (memo, batch) => [
      ...(await memo),
      ...(await Promise.all(batch.map(iteratee)))
    ], []);
  };


  const StarClickHandler = (CardId) => {
    const fetchCardInfo = async () => {
      const cardInfo = await getTwoComparisonCardsInfo (props.product_id, CardId);
      const currentCardFeatures = cardInfo[0].features;
      const relatedCardFeatures = cardInfo[1].features;

      const comparisonCardFeaturesArray = [];
      for (let i = 0; i < currentCardFeatures.length; i++) {
        if (comparisonCardFeaturesArray.indexOf(currentCardFeatures[i].feature) !== undefined) {
          comparisonCardFeaturesArray.push(currentCardFeatures[i].feature)
        }
      }
      for (let i = 0; i < relatedCardFeatures.length; i++) {
        if (comparisonCardFeaturesArray.indexOf(relatedCardFeatures[i].feature) !== undefined) {
          comparisonCardFeaturesArray.push(relatedCardFeatures[i].feature)
        }
      }


      const currentFeatures = {};
      for (let i = 0; i < currentCardFeatures.length; i++) {
        currentFeatures[currentCardFeatures[i].feature] = currentCardFeatures[i].value;
      }

      const relatedFeatures = {};
      for (let i = 0; i < relatedCardFeatures.length; i++) {
        relatedFeatures[relatedCardFeatures[i].feature] = relatedCardFeatures[i].value;
      }

      setCurrentProductCardInfo(cardInfo[0]);
      setRelatedProductCardInfo(cardInfo[1]);
      setComparisonCardFeatures(comparisonCardFeaturesArray);
      setCurrentCardFeatures(currentFeatures);
      setRelatedCardFeatures(relatedFeatures);
      setShow(true)
    }
    fetchCardInfo();
  }



  const WindowClickHandler = (event) => {
    console.log("Window close button was clicked.")
    setShow(false)
  }

  const getTwoComparisonCardsInfo = (idNumCurrent, idNumRelated) => {
    console.log('getClickedCardInfoTriggered with ' + idNumCurrent + ' as idNumCurrent and ' + idNumRelated + ' as idNumRelated')
    var currentCardInfo = {};
    var relatedCardInfo = {};
    relatedProductsInfoSummaries.map((product) => {
      console.log('product: ', product);
      if (product.id === idNumCurrent) {
        currentCardInfo = product;
      } else if (product.id === idNumRelated) {
        relatedCardInfo = product;
      }
    })
    var comparisonCards = [];
    comparisonCards.push(currentCardInfo);
    comparisonCards.push(relatedCardInfo);
    return comparisonCards;
    console.log('comparisonCards returning from getTwoComparisonCardsInfo: ', comparisonCards)
  };

 //XIconButtonClickHandler (event) {
  //console.log("X Icon Button was clicked.")

  //-------- Get requests -----------------//

  /* Get related products ids */
  const getAllData = () => {
    var infoSummary = [];
    return axios.get(`/related/?product_id=${props.product_id}`)
    .then(response => {
      const relatedIds = response.data;
      relatedIds.push(props.product_id);
      console.log('relatedIds: ', relatedIds);
      return relatedIds;
    })
    /* Get related products by their ids */
    .then(response => {
      const relatedProductArray = mapInBatches(response, async (id) => {
        return axios.get(`/products/?product_id=${id}`);
      }, 4)
      return relatedProductArray;
    })
    /* Add related products (array of objs) to state */
    .then(response => {
      const newArr = infoSummary;
      for (var i = 0; i < response.length; i++) {
        newArr.push(response[i].data);
      }
      infoSummary = newArr;
      return response.map(obj => obj.data.id);
    })
    /* Get related styles by their ids */
    .then(response => {
      const relatedStylesArray = mapInBatches(response, async (id) => {
        return axios.get(`/relatedStyles/?product_id=${id}`);
      }, 4)
      return relatedStylesArray;
    })
    /* Add related styles  to state */
    .then(response => {
      const newArr = infoSummary;
      for (var i = 0; i < response.length; i++) {
        newArr[i]['styles'] = response[i].data.results;
      }
      infoSummary = newArr;
      return response.map(obj => obj.data.product_id);
    })
     /* Get products' meta review info by their ids */
     .then(response => {
      const relatedMetaReviewsArray = mapInBatches(response, async (id) => {
        return axios.get(`/relatedMetaReviews/?product_id=${id}`);
      }, 4)
      return relatedMetaReviewsArray;
    })
    /*Average the ratings for each related item*/
    .then(response => {
      const productRatingsByIds = {};
      response.map(obj => productRatingsByIds[obj.data.product_id] = obj.data.ratings)
      return productRatingsByIds
    })
    /*Average the rating of each product id */
    .then(response => {
      const productAverageRatingById = {};
        for(var id in response) {
          const totalNumberOfRatings = 0;
          const totalSumOfRatings = 0;
          for (var rating in response[id]) {
            totalNumberOfRatings +=  Number(response[id][rating]);
            totalSumOfRatings += Number(response[id][rating]) * Number(rating);
          }
          const averageRating = totalSumOfRatings / totalNumberOfRatings;
          productAverageRatingById[id] = averageRating;
        }
      return productAverageRatingById;
    })
    /*Add product average rating by id to state*/
    .then(productAverageRatingById => {
      const newArr = infoSummary;
      for (var i = 0; i < newArr.length; i++) {
        newArr[i]['averageRating'] = productAverageRatingById[newArr[i].id]
        }
      //setAverageProductRatingById(response)
      infoSummary = newArr;
      return infoSummary;
    })
    .catch(err => {
      console.log('CLIENT SIDE getRelatedProductIds ERROR: ', err)
    })
  }

//---------------------- RENDER ------------------------------------------------------//


    return (
      <div className="RPP" style={{ display: "flex", flexDirection: "column" }}>
        <Container>
          <RelatedProductsCarousel
            relatedProductsInfoSummaries={relatedProductsInfoSummaries}
            StarClickHandler={StarClickHandler}
            CardClickHandler={props.CardClickHandler}
            index={index}
            onSelect={handleSelect}
            />
        </Container>
        <Container>
          <ComparisonModalWindow
          WindowClickHandler={WindowClickHandler}
          relatedProductCardInfo={relatedProductCardInfo}
          currentProductCardInfo={currentProductCardInfo}
          comparisonCardFeatures={comparisonCardFeatures}
          currentCardFeatures={currentCardFeatures}
          relatedCardFeatures={relatedCardFeatures}
          show={show} />
       </Container>
      </div>
    );
};

export default RPP;