import axios from 'axios';
import * as cheerio from cheerio;

async function fetchNaverStock(code){

    const baseURl ="https://finance.naver.com/item/sise.nhn?code=005930";

    const code = {
    'code': '005930'
    }

    const resp  = await axios.get(baseUrl, {
        params:params,
        headers: {
            'User-Agent' : 'Mozilla/5.0 ~~'// 얘도 헤더값에서 찾음
        }
    })
    const $ = cheerio.load(resp.data);

    // const sise = $('.type 2')[4]; 막상 찍어 보면, 3, 4번이 없음 => 내가 보이는 화면과 내가 요청했을때 가져오는 응답이 다르구나를 알수 있음
    // console.log($('.type 2'));
    // console.log(sise);

    $('tr').slice(1,).map((i,e)=> {
        tdTag = $(el).find('td');
        if(tdTag.length <7){
            return {
            date : '',
            close : '',
            ratio: '',
            open: '',
            high:'',
            low:'',
            volum:''
            }
        }
        return {
            date : tdTag[0].text(),
            close : tdTag[1].text(),
            ratio: tdTag[2].text(),
            open:tdTag[3].text(),
            high:tdTag[4].text(),
            low:tdTag[5].text(),
            volum:tdTag[6].text(),
        }
        
    }).get();
}