const express = require('express');
const rq = require('request-promise');
const Slack = require('slack-node');
const app = express();
const port = 4000;

app.get('/', function(req, res){
    
    // 슬랙 채널
    const webhookUri = "https://hooks.slack.com/services/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";
    const slack = new Slack();
    slack.setWebhook(webhookUri);

    let options = {
        method: 'GET',
        // 오늘의 운세 링크
        uri: 'https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=f&birth=20021022&solarCal=solar&time=',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
        },
        form: ''
        };

rq(options)
    .then(function(body){
      
      let code = body.replace('window.__jindo2_callback._fortune_my_0(','').replace(');','').replace(/\s([A-z]+)\s?:/g,'"$1":').replace('\n','');      
            
      const jsonData = JSON.parse(code);
      
      const LuckyName = jsonData.result.day.content[0].keyword.replace(/<([^>]+)>/g, "");
      let SendSlack = `*${LuckyName}*`;
        
      let num = 1;
      for (const content in jsonData.result.day.content) {
        if(num == 4) break;
        SendSlack += `
*${jsonData.result.day.content[num].name}*
${jsonData.result.day.content[num].desc}
        `;
        num++;
      }
      
      res.send(jsonData.result.day.content[0].desc);
            
      console.log('-------------------총운-------------------');
      console.log(jsonData.result.day.content[0].keyword);
      console.log();
      console.log(jsonData.result.day.content[0].desc);
      console.log('--------------------------------------');

      slack.webhook({
        channel: "2019_도제학생방", //슬랙 채널 이름
        username: "써니의 운세",  // 슬랙봇 이름
        icon_emoji: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqXX85E3HssrkWI83XT1uPQ8ds0_9AAkzgvJ5o3gf242o9HghOSA',
        text: SendSlack
      }, function(err, response){
          console.log("--------------------------------");
          console.log(response);
      });
    
    });
});


app.listen(port, function(){
  console.log('오늘의 운세 로딩 중...');
})