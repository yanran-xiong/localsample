const express = require('express');
const request = require('request');
const config = require('./config.json')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.json());


const getRecipieCatagoryList = () => (new Promise((resolve, reject) => {
    request(config.url.recipie,(error, response, body) => {
        if (!error && (response && response.statusCode === 200) ) {

            const recipieCatagoryList = body ? JSON.parse(body) : [];
            const recipielarge = recipieCatagoryList['result']['large']
            resolve(recipielarge);
            console.log(Object.keys(recipielarge).length);
            console.log(recipielarge[0]['categoryName'])
        } else {
            if (error) {
                reject(error);
            }
            else {
                const errorMessage = response
                    ? `Unexpected error code (${response.statusCode}) returned by the Recipie list dependency`
                    : 'Failed to receive any response from the Recipie list dependency';

                reject(new Error(errorMessage));
            }
        }
    });
}));



const getRecipieCatagoryRanking = () => (new Promise((resolve, reject) => {
     foodRecipieUrl = config.url.foodRecipie + "33"
    request(foodRecipieUrl,(error, response, body) => {
        if (!error && (response && response.statusCode === 200) ) {
            
            const recipieCatagoryRanking  = body ? JSON.parse(body) : [];
            const recipieCatagoryRankingResult = recipieCatagoryRanking['result'];
            resolve(recipieCatagoryRankingResult);
            console.log(recipieCatagoryRankingResult[0]['recipeTitle']);
        } else {
            if (error) {
                reject(error);
            }
            else {
                const errorMessage = response
                    ? `Unexpected error code (${response.statusCode}) returned by the Food Recipie list dependency`
                    : 'Failed to receive any response from the Recipie list dependency';

                reject(new Error(errorMessage));
            }
        }
    });
}));

const getItem = () => (new Promise((resolve, reject) => {
    keyword = "玉ねぎ"
    
    itemSearchUrl = config.url.itemSearch + keyword
    console.log(itemSearchUrl)
   request(encodeURI(itemSearchUrl),(error, response, body) => {
       if (!error && (response && response.statusCode === 200) ) {
           
           const itemList  = body ? JSON.parse(body) : [];
           const itemListItems = itemList['Items'];
           resolve(itemListItems);
           console.log(itemList['hits']);
           console.log(itemListItems[0]['Item']['itemName']);
       } else {
           if (error) {
               reject(error);
           }
           else {
               const errorMessage = response
                   ? `Unexpected error code (${response.statusCode}) returned by the Food Recipie list dependency`
                   : 'Failed to receive any response from the Recipie list dependency';

               reject(new Error(errorMessage));
           }
       }
   });
}));





module.exports = {
    getRecipieCatagoryList,
    getRecipieCatagoryRanking,
    getItem,
}

// test
//getRecipieCatagoryList().then((value) =>{
//    console.log(value[0]['categoryName']);
//});
