const express = require('express');
const rq = require('request-promise');
const app = express();
const port = 3030;
const serveStatic = require('serve-static');
const router = express.Router();

app.use(serveStatic('views'));

app.get('/', function(req, res){
    console.log('------------페이지 접속--------------');
    res.end();
});

app.get('/login', function(req, res){
    console.log('------------로그인 접속--------------');
    // res.send(<h1>로그인</h1>);
    res.redirect('/views/login.html');
});



app.listen(port, function(){
    console.log('express 실행 중...');
    res.end();
  })