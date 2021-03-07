const axios = require('axios');
import GoodTimes from './public/javascripts/game';

let canvas = '';

document.addEventListener('DOMContentLoaded', () => {

    // let isbn = '0201558025';
    // axios.get(`/books/${isbn}`)
    // .then((response) => {
    //     console.log(response); 
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    // let query = "grace hopper";
    // axios.get(`/search?string=${query}`)
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    canvas = document.getElementById('good-times');
    new GoodTimes(canvas);
    
})

document.addEventListener("keydown", (e) => {
    // canvas = document.getElementById('good-times');
    if ( e.key === "r" ) {
        new GoodTimes(canvas);
    }
});
