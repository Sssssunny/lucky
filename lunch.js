const express = require('express');
const rq = require('request-promise');
const cheerio = require('cheerio');
const app = express();
const port = 2000;

app.get('/', function(req, res){
  
  let options = {
    method: 'GET',
    uri: 'http://www.samil.hs.kr/main.php?menugrp=030300&master=meal2&act=list',
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
    },
    body: {
      menugrp:'030300',
      master:'meal2',
      act:'list',
      SearchYear:'2019',
      SearchMonth:'05',
      SearchDay:'20'
    },
    json: false
  };

  rq(options)
    .then(function(body){
      const code = cheerio.load(body);

      // let LunchMenu = ;
      const all = code('<div.meal_content col-md-7> <div.meal_table> <tbody> <tr> <td>');
      const keywords = cheerio.load(all.html());
      const $ = keywords('span.title');

      res.send(code);

      console.log('-----------------body-----------------');
      console.log('code');
      console.log('----------------------------------');

      // 슬렉 푸시용 파라미터
      // options = {
      //   method: 'post',
      //   uri: 'https://hooks.slack.com/services/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',
      //   body: {
      //     text: '전송할 값'
      //   },
      //   json: true
      // };

      return rq(options);
    
    })
    .then(function(result){
      console.log(result);
    });
});


app.listen(port, function(){
  console.log('급식 불러오는 중...');
})