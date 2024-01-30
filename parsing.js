//cheerio 사용법 익히기
import * as cheerio from 'cheerio';

const data =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">
        <div class="content">
            <ul class="profile">
                <li class="other">민수</li>
                <li class="me">
                    <a href="/profile/me">미래</a></li>
                <li class="other">수지</li>
            </ul>
        </div>
    </div>
</body>
</html>`

const $ = cheerio.load(data);
// console.log($.html());
//console.log($('a'));
// console.log($('#other'));

// console.log($('a').prop('href'));

const names= $('li').map((index,element)=>{
    return $(element).text();
}).get();
console.log(names);