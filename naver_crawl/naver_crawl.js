import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import crypto from 'crypto';

const baseUrl = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80";
const makeRequest = (url)=>{
        return axios({
          url,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
          httpsAgent: new https.Agent({
                      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
                    }),
        });
      }
// const allowLegacyRenegotiationforNodeJsOptions = {
//     httpsAgent: new https.Agent({
//       secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
//     }),
//     proxy: false,
//     //method: 'GET',
//   };

async function fetchNewsList(){

    const resp = await axios.get(baseUrl);
    const $ = cheerio.load(resp.data);
    const newsListTags=$('.news_area');
    //fs.writeFileSync('sample.html', resp.data)
    const fetchNewDetail = async (link) => {
        try{
            const detailResp = await makeRequest(link);//, allowLegacyRenegotiationforNodeJsOptions
            // console.log(detailResp);
            return detailResp.data
            

        } catch(error){
            console.error('AxiosError:', error.message);
        }
    }

    const result= newsListTags.map(async (index, element)=>{
        const elem = $(element);
        
        const detailUrl = elem.find('.news_contents a').prop('href');

        const detailResp = await fetchNewDetail(detailUrl);
        console.log(detailResp);
        // const $detail = cheerio.load(detailResp);
        // const newsDetail = $detail('.tit title_area').text()

        //console.log(test)

        return(
            {
                title: elem.find('.news_contents .news_tit').prop('title'),
                newspaper : elem.find('.info_group a').text(),
                description: elem.find('.dsc_wrap a').text(),
                img : elem.find('.dsc_thumb img').attr('data-lazysrc'),
                //description: newsDetail
            }
        )

    }).get();

    //console.log(result);
    // console.log("num:"+num);

}
fetchNewsList();

//const detailResp = await axios.get(detailUrl);

        // try{
        //     const detailResp = await axios.get(detailUrl, {
        //         httpsAgent: new https.Agent({
        //           secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        //         }),
        //       });
        //       const $detail = cheerio.load(detailResp.data);
        // }catch(error){
        //     console.error('AxiosError:', error.message);
        // }

        //const detailResp = await axios.get(detailUrl);

        //   async function makeRequest(url, data) {
//     return axios({
//       ...allowLegacyRenegotiationforNodeJsOptions,
//       url,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       method: 'GET',
//       data: { some: 'data' },
//     });
//   }