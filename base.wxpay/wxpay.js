var request = require('request');
var queryString = require('querystring');
var crypto = require('crypto');
var xml2jsparseString = require('xml2js').parseString;


module.exports={
	pay:function(req, res, next){
		var appid = "wx3169069333bfc3a1";
		var mch_id = "1499166342";
		var nonce_str = Math.random().toString(32).substr(2,15);
		var sign_type = "MD5";
		var body = "recharge";
		var out_trade_no = Date.now().toString();
		// var out_trade_no = new Date().getTime();
		var total_fee = 88;
		var notify_url = "http://taxicustomer.nbzhidun.com/test.html";
		var trade_type = "JSAPI";
		var openid = "omRD40fUVdvkOlSv2jNzSjSusoOk";
		// var spbill_create_ip = req.header('x-forwarded-for') || req.connection.remoteAddress; 
		var spbill_create_ip = req.body.ip;
		

        var ret = {  
            appid: appid,  
            // attach: attach,  
            body: body,  
            mch_id: mch_id,  
            nonce_str: nonce_str,  
            notify_url: notify_url,  
            openid: openid,  
            out_trade_no: out_trade_no,  
            spbill_create_ip: spbill_create_ip,  
            total_fee: total_fee,  
            trade_type: trade_type  
        };  
        var string = this.raw(ret);  
        string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置  
        var crypto = require('crypto');  
        var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex');  
        sign =  sign.toUpperCase();

		var body2 = '<xml>'+
						'<appid>'+appid+'</appid>'+
						'<mch_id>'+mch_id+'</mch_id>'+
						'<nonce_str>'+nonce_str+'</nonce_str>'+
						'<sign_type>'+sign_type+'</sign_type>'+
						'<body>'+body+'</body>'+
						'<out_trade_no>'+out_trade_no+'</out_trade_no>'+
						'<total_fee>'+total_fee+'</total_fee>'+
						'<notify_url>'+notify_url+'</notify_url>'+
						'<trade_type>'+trade_type+'</trade_type>'+
						'<openid>'+openid+'</openid>'+
						'<spbill_create_ip>'+spbill_create_ip+'</spbill_create_ip>'+
						'<sign>'+sign+'</sign>'+
					'</xml>';
		var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';		
		console.log(JSON.stringify(sign));
		request.post(
			{
				url : url, 
				body:JSON.stringify(body3)
			},
			function(error, response, body){
				console.log(body);
			}

		)
	},
	raw: function(args) {  
        var keys = Object.keys(args);  
        keys = keys.sort()  
        var newArgs = {};  
        keys.forEach(function(key) {  
            newArgs[key] = args[key];  
        });  
        var string = '';  
        for (var k in newArgs) {  
            string += '&' + k + '=' + newArgs[k];  
        }  
        string = string.substr(1);  
        return string;  
    }
}