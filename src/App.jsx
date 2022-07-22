import React, {useState} from "react";
import {createGlobalStyle} from 'styled-components';
import StyleSelector from './Overview/components/StyleSelector.jsx';
import ReviewsApp from "./Reviews/ReviewsApp.jsx";
import RPP from "./Related Products/RPP.jsx";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Roboto', sans-serif;
}
`

function App (props) {
  const [productId, setProductId] = useState(66645);
  const CardClickHandler = (newId) => {
    setProductId(newId)
  }
    return (
      <div>
        <GlobalStyle />
        <StyleSelector product_id={productId}/>
        <RPP product_id={productId} CardClickHandler={CardClickHandler}/>
        <ReviewsApp product_id={productId}/>
      </div>
    );
}

export default App;
