var request = require('request');
var jsonWrite = require('../common/writerJson.js')
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./loginsql.js');
//使用连接池
var pool  = mysql.createPool($util.extend({}, $conf.mysql));


module.exports = {
	getToken:function(req, res, next){
		var reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
		var code = req.body.code;
		// 	"appid": "wx3169069333bfc3a1",
		//  "secret": "2a53cd3f6e932557bd04a21f0bc818b2",

	    request.get(
	        {   
	            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx3169069333bfc3a1&secret=2a53cd3f6e932557bd04a21f0bc818b2&code='+code+'&grant_type=authorization_code',
	        },
	        function(error, response, body){
	            if(response.statusCode == 200){
	                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
	                //console.log(JSON.parse(body));
	                var data = JSON.parse(body);
	                var access_token = data.access_token;
	                var openid = data.openid;
	                request.get(
	                    {
	                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
	                    },
	                    function(error, response, body){
	                        if(response.statusCode == 200){
	                            
	                            pool.getConnection(function(err, connection) {
	                            	// 第四步：根据获取的用户信息进行对应操作
	                            	var userinfo = JSON.parse(body);
	                            	connection.query($sql.querybyopenid,[userinfo.openid],function(err,result){
	                            		var datas = result[0];
	                            		console.log(datas);
	                            		if(datas){
	                            			res.json({
	                            				code: 200,
	                            				msg:"用户已存在"
	                            			});
	                            			connection.release();
	                            		}else{
	                            			connection.query($sql.userinsert, [userinfo.city,userinfo.country,userinfo.headimgurl,userinfo.language,userinfo.nickname,userinfo.openid,userinfo.province,userinfo.sex],function(err, result){
				                            	if(result){
				                            		res.json(userinfo);
				                            	}
				                            	connection.release();
				                            })
	                            		}
	                            	})
	                            	
	                            });
	                        }else{
	                            console.log(response.statusCode);
	                        }
	                    }
	                );
	            }else{
	                console.log(response.statusCode);
	            }
	        }
	    );
	}
}