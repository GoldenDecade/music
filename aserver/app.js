const express = require('express')
const apicache = require('apicache')
const path = require('path')

const app = express()
let cache = apicache.middleware

//跨域设置
app.all('*', (req, res, next)=> {
  if(req.path !== '/' && !req.path.includes('.')) {
    res.header('Access-Control-Allow-Credentials', true);
  //  这里获取origin 请求头  而不是用*
    res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*'); // http://10.112.80.39:8081
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    res.header('Content-Type', 'application/json;charset=utf-8');
  }
  next();
})

const onlyStatus200 = (req, res)=> res.statusCode === 200;
app.use(cache('2 minutes', onlyStatus200)); // 使用缓存  2分钟内同样接口返回200
app.use(express.static(path.resolve(__dirname, 'public')));// 静态文件

app.use((req, res, next) =>{
  const proxy = req.query.proxy;
  if (proxy) {
    req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`;
  }
  next();
})

//获取专辑内容
// app.use('/album', require('./router/album'));

//邮箱登录
// app.use('/login', require('./router/login'));

//获取用户歌单
app.use('/user/playlist', require('./router/user_playlist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
})
module.exports = app;
