var good={
	//增
	goodinsert:'INSERT INTO `goods` (`name`,`desc`,`price`,`sum`) VALUES(?,?,?,?)',
	//删
	gooddelete: 'delete from goods where id=?',
	//改
	goodupdate:'UPDATE `goods` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    goodAll: 'select * from goods',
    goodById: 'select * from goods where id=?'
}

module.exports=good;