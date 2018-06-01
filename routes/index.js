var express = require('express');
var router = express.Router();
//关联主程序
var goodlist = require('../base.good/goodlist.js');
var login = require('../base.login/login.js')
var wxpay = require('../base.wxpay/wxpay.js')
var wechatPay = require('../base.wxpay/wechatPay.js')
/* GET home page. */
//进入主页面信息
router.post('/', function(req, res, next) {
  res.render('index', { title: '小k博客 (htmlk.cn)'});
});

//增
router.post('/goodAdd',function(req,res,next){

	goodlist.goodadd(req,res,next);
});

//删
router.post('/goodDel',function(req,res,next){
	goodlist.gooddelete(req,res,next);
});
//改
router.post('/goodUpdate',function(req,res,next){
	goodlist.goodupdate(req,res,next);
});
//查
router.post('/goodAll',function(req,res,next){

	goodlist.goodAll(req,res,next);
});
router.post('/goodById',function(req,res,next){
	goodlist.goodById(req,res,next);
});
router.post('/getToken',function(req,res,next){
	login.getToken(req,res,next);
});

router.post('/wxPay',function(req,res,next){
	wxpay.pay(req,res,next);
});

router.post('/order', function(req, res, next){  
    var attach = "1276687601";  
    var body = "测试支付";  
    var mch_id = "1499166342"; ／／商户ID  
    var openid = "omRD40fUVdvkOlSv2jNzSjSusoOk";   
    var bookingNo = Date.now().toString();
    var total_fee = 10;  
    var notify_url = "http://taxicustomer.nbzhidun.com/test.html"; //通知地址  
    var spbill_create_ip = req.body.ip
    wechatPay.order(attach, body, mch_id, openid, bookingNo, total_fee, notify_url,spbill_create_ip).then(function(data){  
    	console.log(data);
        res.json(data);  
    });  
}); 
module.exports = router;
