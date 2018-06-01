
module.exports={
	writer:function (res, ret) {
		console.log(ret);
		if(typeof ret === 'undefined') {
			res.json({
				code:'1',
				msg: '失败'
			});
		} else {
			res.json(ret);
		}
	}
}