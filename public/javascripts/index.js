const axios = require('axios');
import GoodTimes from './game';

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

    const canvas = document.getElementById('good-times');
    new GoodTimes(canvas);
    console.log('webpack is working!')
    
})

document.addEventListener("keydown", (e) => {
    // debugger
    const canvas = document.getElementById('good-times');
    if ( e.key === "Enter" ) {
        new GoodTimes(canvas);
    }
});
