var login = {
	userinsert:'INSERT INTO `user` (`city`,`country`,`headimgurl`,`language`,`nickname`,`openid`,`province`,`sex`) VALUES(?,?,?,?,?,?,?,?)',
	querybyopenid:'select id from user where openid=?'
}
module.exports = login; 