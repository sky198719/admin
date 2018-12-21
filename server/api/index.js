const mysql = require('mysql')
const express = require('express')
const FileStreamRotator = require('file-stream-rotator')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const crypto = require('crypto')

const app = express()

const logDirectory = path.join(__dirname,'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessLogStream = FileStreamRotator.getStream({
  date_format:'YYYYMMDD',
  filename:path.join(logDirectory,'%DATE%.log'),
  frequency:'daily',
  verbose:false
})
morgan.format('logInit',':remote-addr :method :url :status :response-time ms --- :res[content-length] :date[web]')
app.use(morgan('logInit',{stream:accessLogStream}))

app.use(BodyParser.urlencoded({extended:false}))
app.use(CookieParser())

const connection = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'skycat8719',
	database:'test',
	multipleStatements:true
})

function initToken(req,res,callback){
	if(!req.cookies.token){
		res.send(JSON.stringify({code:1,message:'用户未登录'}))
		return false
	}else{
		connection.query('select * from user',function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				let counter = 0
				let currentUsername = ''
				let currentRealname = ''
				for(let i = 0 ; i < results1.length ; i ++){
					if(req.cookies.token == results1[i].token){
						counter ++
						currentRealname = results1[i].realname
						currentUsername = results1[i].username
					}
				}
				if(counter != 0){
					let tokenTime = String(req.cookies.token).substring(0,6) + String(req.cookies.token).substring(String(req.cookies.token).length - 7,String(req.cookies.token).length)
					if(parseInt(new Date().getTime()) - parseInt(tokenTime) > 24*60*60*1000){
						res.send(JSON.stringify({code:3,message:'token已过期'}))
						return false
					}else{
						callback()
					}
				}else{
					res.send(JSON.stringify({code:2,message:'无效的token'}))
					return false
				}
			}
		})
	}
}

app.get('/api/userList',function(req,res){
	if(req.query.id){
		connection.query('select * from user where id = ?',req.query.id,function(err,results){
			if(err){
				res.send(err)
				return false
			}else{
				res.send(JSON.stringify({code:0,message:'查询成功',data:results}))
			}
		})
	}else{
		connection.query('select * from user',function(err,results){
			if(err){
				res.send(err)
				return false
			}else{
				res.send(JSON.stringify({code:0,message:'查询成功',data:results}))
			}
		})
	}
})

app.post('/api/updatePassword',function(req,res){
	initToken(req,res,function(){
		if(!req.body.password){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：密码'}))
			return false
		}else if(!req.body.id){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：id'}))
			return false
		}else{
			connection.query('select id from user',function(err1,results1){
				if(err1){
					res.send(err1)
					return false
				}else{
					let counter = 0
					for(let i = 0 ; i < results1.length ; i ++){
						if(results1[i].id == req.body.id){
							counter ++
						}
					}
					if(counter != 0){
						connection.query('update user set password = ? where id = ?',[req.body.password,req.body.id],function(err2,results2){
							if(err2){
								res.send(err2)
								return false
							}else{
								res.send(JSON.stringify({code:0,message:'修改成功'}))
							}
						})
					}else{
						res.send(JSON.stringify({code:2,message:'用户id不存在'}))
						return false
					}
				}
			})
		}
	})
})

app.post('/api/deleteUser',function(req,res){
	initToken(req,res,function(){
		if(!req.body.username){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：用户名'}))
			return false
		}else{
			connection.query('select username from user',function(err1,results1){
				if(err1){
					res.send(err1)
					return false
				}else{
					let counter = 0
					for(let i = 0 ; i < results1.length ; i ++){
						if(results1[i].username == req.body.username){
							counter ++
						}
					}
					if(counter != 0){
						connection.query('delete from user where username = ?',req.body.username,function(err2,results2){
							if(err2){
								res.send(err2)
								return false
							}else{
								res.send(JSON.stringify({code:0,message:'删除成功'}))
							}
						})
					}else{
						res.send(JSON.stringify({code:2,message:'用户名不存在'}))
						return false
					}
				}
			})
		}
	})
})

app.post('/api/insertUser',function(req,res){
	initToken(req,res,function(){
		if(!req.body.username){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：用户名'}))
			return false
		}else if(!req.body.password){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：密码'}))
			return false
		}else if(!req.body.realname){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：真实姓名'}))
			return false
		}else{
			connection.query('select username from user',function(err1,results1){
				if(err1){
					res.send(err1)
					return false
				}else{
					let counter = 0
					for(let i = 0 ; i < results1.length ; i ++){
						if(results1[i].username == req.body.username){
							counter ++
						}
					}
					if(counter == 0){
						connection.query('insert into user (username,password,realname) values(?,?,?)',[req.body.username,req.body.password,req.body.realname],function(err2,results2){
							if(err2){
								res.send(err2)
								return false
							}else{
								res.send(JSON.stringify({code:0,message:'新增成功'}))
							}
						})
					}else{
						res.send(JSON.stringify({code:2,message:'用户名已存在'}))
						return false
					}
				}
			})
		}
	})
})

app.post('/api/login',function(req,res){
	if(!req.body.username){
		res.send(JSON.stringify({code:1,message:'缺少必要参数：用户名'}))
		return false
	}else if(!req.body.password){
		res.send(JSON.stringify({code:1,message:'缺少必要参数：密码'}))
		return false
	}else{
		connection.query('select * from user where username = ?',req.body.username,function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				if(results1.length == 0){
					res.send(JSON.stringify({code:2,message:'用户名或者密码错误'}))
					return false
				}else{
					if(req.body.username == results1[0].username && req.body.password == results1[0].password){
						connection.query('select * from tokenKey',function(err2,results2){
							let token = String(new Date().getTime()).substring(0,6) + crypto.createHash('md5').update(String(req.body.username) + String(results2[0].key) + String(new Date().getTime())).digest('hex') + String(new Date().getTime()).substring(6,13)
							connection.query('update user set token = ? where username = ?',[token,req.body.username],function(err3,results3){
								if(err3){
									res.send(err3)
									return false
								}else{
									res.cookie('token',token,{maxAge:60*60*1000})
									res.send(JSON.stringify({code:0,message:'登录成功'}))
								}
							})
						})
					}else{
						res.send(JSON.stringify({code:2,message:'用户名或者密码错误'}))
						return false
					}
				}
			}
		})
	}
})

app.post('/api/checkToken',function(req,res){
	if(!req.body.token){
		res.send(JSON.stringify({code:1,message:'缺少必要参数：token'}))
		return false
	}else{
		connection.query('select * from user',function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				let counter = 0
				let currentUsername = ''
				let currentRealname = ''
				for(let i = 0 ; i < results1.length ; i ++){
					if(req.body.token == results1[i].token){
						counter ++
						currentRealname = results1[i].realname
						currentUsername = results1[i].username
					}
				}
				if(counter != 0){
					let tokenTime = String(req.body.token).substring(0,6) + String(req.body.token).substring(String(req.body.token).length - 7,String(req.body.token).length)
					if(parseInt(new Date().getTime()) - parseInt(tokenTime) > 24*60*60*1000){
						res.send(JSON.stringify({code:3,message:'token已过期'}))
						return false
					}else{
						res.send(JSON.stringify({code:0,message:'token验证通过',data:{username:currentUsername,realname:currentRealname}}))
					}
				}else{
					res.send(JSON.stringify({code:2,message:'无效的token'}))
					return false
				}
			}
		})
	}
})

app.listen(3000,function(){
	console.log('Server running at 3000 port');
})