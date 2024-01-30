const axios = require('axios'); //=> 얘도 import

// import axios from 'axios'; //얘도 import

// axios({
//     method: 'get',
//     url: "https://www.naver.com/",
// }).then(response=>{
//     console.log(response)
// })

// const url= "https://www.naver.com/";
// axios.get(url, ).then(response=>{
//     console.log(response);
// })

async function fetchPage(){ // promise객체 async
    const url = "https://www.naver.com";
    
    try{
    const response = await axios.get(url); // 비동기니까 await써주기
    console.log(response.data);
    } catch(err){
        console.error(err);
    }
}
fetchPage();