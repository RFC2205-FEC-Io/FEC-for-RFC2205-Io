require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const cors = require("cors");
const API_KEY = process.env.REACT_APP_API_KEY;

console.log('API_KEY: ', API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));


axios.defaults.headers.common['Authorization'] = API_KEY;


app.get("/reviews", (req, res) => {
  console.log('req.query: ', req.query);
  const product_id = req.query.product_id;
  const count = req.query.count;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/?product_id=${product_id}&count=${count}`)
  .then(response => {
    // console.log('data: ', data);
    res.json(response.data);
  })
  .catch(err => {console.log('Error: ', err)})
})

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});


// console.log('header:', header);
/* == OVERVIEW == */
app.get('/overview', (req, res) => {
  // console.log('req.query:', req.query);
  const page = req.query.page;
  const count = req.query.count;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/??page=${page}&count=${count}`)
    .then((response) => {
      console.log('GET sent, products retreived!:', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      throw err;
    });
})

app.get('/styles', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/66642/styles')
    .then((response) => {
      console.log('GET sent, Styles retreived!:', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      throw err;
    });
})

module.exports = {API_KEY};
//----------------API Requests for Related Products---------------//

/* Handler for related product IDs requests*/
app.get('/:product_id/related', (req, res) => {
  console.log('Incoming request: ', req);
  getRelatedProductIds()
  .then (function (idArray) {
    console.log('Related product id numbers acquired!')
    return res.json(idArray)
  })
  .catch (function (err) {
    console.log('Uh-oh! API request error: ' + err);
    return res.sendStatus(500);
  })
})

/*Request function for related product IDs requests*/
getRelatedProductIds = (productID) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/'${productID}'/related`)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
};

