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
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
    },
    form: ''
  };

  rq(options)
    .then(function(body){
      const code = cheerio.load(body);

      // let LunchMenu = ;
      const all = code('<div.meal_content col-md-7> <div.meal_table> <tbody> <tr> <td>');
      const keywords = cheerio.load(all.html());
      const $ = keywords('span.title');

      res.send(all);

      return rq(options);
    
    })
    .then(function(result){
      console.log(result);
    });
});


app.listen(port, function(){
  console.log('급식 불러오는 중...');
})