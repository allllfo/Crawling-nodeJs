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

    $('tr').slice(1,trTag.length-1).map((i,e)=> {
        const date = $(el).find('td:nth-child(1)')?.text()?.trim(); //css에서 몇번쨰 자식인지에 따라서, 적용할 수 있는 것이 다름. (2n)이라고 하면 두번째마다 속성 적용 가능/ 2n+1 하면 홀수행마다 적용
        const close = $(el).find('td:nth-child(2)')?.text()?.trim();
        const ratio = $(el).find('td:nth-child(3)')?.text()?.trim();
        const open = $(el).find('td:nth-child(4)')?.text()?.trim();
        const high = $(el).find('td:nth-child(5)')?.text()?.trim();
        const low = $(el).find('td:nth-child(6)')?.text()?.trim();
        const volume = $(el).find('td:nth-child(6)')?.text()?.trim();
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
            open: tdTag[3].text(),
            high:tdTag[4].text(),
            low:tdTag[5].text(),
            volum:tdTag[6].text(),
        }
        
    }).get();

    const result = data.filter((elem, idx)=>{ //완성 안됨
        if(elem.date){
            return true
        }
    })
}