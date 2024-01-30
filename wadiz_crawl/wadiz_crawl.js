import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import crypto from 'crypto';
import fs from 'fs';
import Iconv from 'iconv-lite';

const baseUrl = "https://service.wadiz.kr/api/search/funding"

async function fundingList(){

    // const getResp = await axios.get(baseUrl);
    async function getFundingPage()
    {
    try{
    const resp = await axios.post(baseUrl, {startNum: 48, order: "recommend", limit: 48, categoryCode: "", endYn: ""}, {
        method : 'POST',
        headers : {
            "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            "Content-Type" : "application/json"
    }
    });
    return resp.data;
    }
    catch(error){
        console.log("error: "+ error.message);
    }
}
    const db = await getFundingPage();
    console.log(db.data.list[2].title);

    const result = db.data.list.map((el, id)=> {
        const title = el.title;
        return{
            title : el.title,
            message : el.coreMessage,
            openDate : el.whenOpen,
            photoUrl : el.photoUrl
        }
    })
    
    console.log(result);

}
fundingList();