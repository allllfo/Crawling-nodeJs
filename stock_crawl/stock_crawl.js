import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import crypto from 'crypto';
import fs from 'fs';
import Iconv from 'iconv-lite';


const baseUrl = "https://finance.naver.com/item/sise.nhn?code=005930";
// const baseUrl = "https://finance.naver.com/item/sise_day.naver?code=005930&page=1";

async function stockPriceList(){

    //한글 깨짐 현상 ECU-KR 수정법
    const resp = await axios.get(baseUrl, {
        responseType : 'arraybuffer',
    });
    console.log(baseUrl);
    const content = Iconv.decode(resp.data, "EUC-KR").toString();;
    const $ = cheerio.load(content);
    fs.writeFileSync('sample5.html', content);

    const dayURL = $('iframe[title="일별 시세"]').attr('src');
    
    let pageNum=1;

    for(let i=1; i<6; i++){
        const newURL = "https://finance.naver.com" + dayURL +"&page=" +i;
        console.log(newURL);

         //새로운 Url의 Html 가져오기
        const dayResp = await axios.get(newURL, {
            responseType : 'arraybuffer',
            headers : {
                "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        });
        const dayRespContent = Iconv.decode(dayResp.data, "EUC-KR").toString();
        // fs.writeFileSync('sample6.html', dayRespContent);
        const $dayStock = cheerio.load(dayRespContent);

        const dayStockList = $dayStock('tr[onmouseover]');

        const result= dayStockList.map(async (index, element)=>{
            const elem = $(element);
    
            return(
                {
                    day: elem.find('.tah.p10.gray03').text(),
                    stockPrice : elem.find('span.tah.p11').text()
                }
            )
    
        }).get();

        console.log(result);

    }



}
stockPriceList();

/**
     try{
        console.log("he");
        const {data} = await axios({
            baseUrl,
            method:"GET",
            responseType:"arraybuffer"
        })
        console.log("hello");
        const contents = Iconv.decode(data, "EUC-KR").toString();
        console.log('Decoded Contents:', contents);

    } catch(error){
        console.error('AxiosError:', error.message);
    }
 */

    /*
    
        // console.log(dayResp.data);
    // const $dayStock = cheerio.load(dayResp.data);
    //const dayStockDetail = $dayStock('.author-description').text()

    // const fetchNewURL = async (link) => {
    //     try{
    //         const dayStock = await makeRequest(link);
    //         // console.log(dayStock);
    //         return dayStock.data;
            
    //     } catch(error){
    //         console.error('AxiosError:', error.message);
    //     }
    // }
    */