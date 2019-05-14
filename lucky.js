const express = require('express');
const rq = require('request-promise');
const cheerio = require('cheerio');
const app = express();
const port = 4000;

app.get('/', function(req, res){
  
  let options = {
    method: 'GET',
    uri: 'https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=f&birth=20021022&solarCal=solar&time=',
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
    },
    form: ''
  };

  rq(options)
    .then(function(body){

      const retData = body.replace('window.__jindo2_callback._forturn_my_0(', '').replace(');','',);
      const jsonData = JSON.parse(retData);


      console.log('------------------------------------');
      console.log(jsonData.result.day.content[1].desc);
      console.log('------------------------------------');


      res.send(body);
      return;

      // 슬렉 푸시용 파라미터
      options = {
        method: 'post',
        uri: 'https://hooks.slack.com/services/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',
        body: {
          text: '```'+'슬랙'+'```'
        },
        json: true
      };

      return rq(options);
    
    })
    .then(function(result){
      console.log(result);
    });
});


app.listen(port, function(){
  console.log('EXPRESS 서버 실행중....');
})