import axios from 'axios';
import * as cheerio from 'cheerio';

import fs from 'fs';

const baseUrl = "https://quotes.toscrape.com/";

async function fetchQuote(){
    const resp = await axios.get(baseUrl);
    const $ = cheerio.load(resp.data);

    const quoteTags=$(' .quote');

    const result = quoteTags.map(async (idx,el)=>{//그 안에 await쓰ㄱ기 위해 async로 바꿈
        const elem = $(el);

        const tags = elem.find(' .tag');
        const tagsObj = tags.map((idx, el)=> {
            const tagTag = $(el);
            return {
                tag: tagTag.text(),
                url: tagTag.prop('href')
            } //출력하면, [obj]로 나오는데 나중에 파일로 뽑으면 나온대
        }).get();

        const authorUrl = elem.find('a').prop('href');
        const url = baseUrl + authorUrl;
        const authorResp = await axios.get(url);
        const $author = cheerio.load(authorResp.data);
        const authorDetail = $author('.author-description').text()


        return {
            qutoe : elem.find('.text').text(),
            author : elem.find('.author').text(),
            authorUrl : authorUrl,
            tag: tagsObj,
            authorDetail: authorDetail
        }
    }).get();

    const final = await Promise.all(result);
    console.log(result);
    fs.writeFileSync('./crawl_ex.json', JSON.stringify(result));
}
fetchQuote();

/*
왜 비동기 함수 쓰는가?
안쓰게 되면, 반드시 then으로 받아줘야 한다.

axios.get(baseUrl).then((resp)=>{
    const $ = cheerio.load(resp.data);
})

나중에 디테일 페이지 들어갈걸 생각했을때 또다시 then이 들어가는게 싫어서 async, await를 사용함
*/


/*
a 태그의 하이퍼레퍼런스를 갖고 왔으니까
request를 해당 url로 보내야한다. 따라서 다시 접속을 해야함
그럼 response가 오면 똑같이 하면 된다.
*/

/**
 1. 하나의 오브젝트를 바복돌면서, 해당하는 Url에 접속해서 데이터 가져오는 방법
 2. 이 데이터들을 parsing할때, 만들면서 만드는 방법 
 그니까 하나는 url들 전부 가져오고 하나씩 도는거고 
 하나씩 qutoe들어갈때마다 거기 관련된 url 들어갔다가 그다음 qutoe들어가고 하는 법
 약간 bfs, dfs느낌
 경험적으로는 한번 다 긁어온 다음에 하는게 낫다. => 중간에 내 예상과 다른 요청이 들어오는 경우 데이터가 날아갈 이유가 있으므로
 */