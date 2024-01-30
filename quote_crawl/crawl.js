import axios from 'axios';
import * as cheerio from 'cheerio';

async function fetchPage(){ // promise객체 async
    const url = "https://quotes.toscrape.com/";
    
    try{
    const response = await axios.get(url); // 비동기니까 await써주기
    console.log(response.data);
    return response.data;

    } catch(err){
        console.error(err);
    }
}

const db = await fetchPage();
const $ = cheerio.load(db);



const infos= $('.quote').map((index,element)=>{

    const tagArr = $(element).find('.tags .tag').map((id, el)=>{
        return($(el).text())
    }).get();

    const tmpUrl = "https://quotes.toscrape.com" + $(element).find('a').prop('href');
    console.log(tmpUrl);
    const detailDB = axios.get(tmpUrl).data;
    console.log(detailDB);
    //const some = cheerio.load(detailDB);
    //const details = some(' .author-details').text();
    //console.log(details);
    

    return (
        {
            quote: $(element).find(' .text').text(),
            author:$(element).find(' .author').text(),
            authorUrl:$(element).find('a').prop('href'),
            tag: tagArr
        })

    }).get();

console.log(infos);

//.find(' .tags .tag').text()
