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

app.get('/api/project/projectList',function(req,res){
	if(req.query.ownerid){
		connection.query('select * from project where ownerid = ?',req.query.ownerid,function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				connection.query('select * from user',function(err2,results2){
					let data = []
					for(let i = 0 ; i < results1.length ; i ++){
						let temprealname = ''
						for(let j = 0 ; j < results2.length ; j ++){
							if(results1[i].ownerid == results2[j].id){
								temprealname = results2[j].realname
							}
						}
						data.push({id:results1[i].id,projectname:results1[i].projectname,opentime:results1[i].opentime,limittime:results1[i].limittime,ownerid:results1[i].ownerid,point:results1[i].point,realname:temprealname})
					}
					res.send(JSON.stringify({code:0,message:'查询成功',data:data}))
				})
			}
		})
	}else{
		connection.query('select * from project',function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				connection.query('select * from user',function(err2,results2){
					let data = []
					for(let i = 0 ; i < results1.length ; i ++){
						let temprealname = ''
						for(let j = 0 ; j < results2.length ; j ++){
							if(results1[i].ownerid == results2[j].id){
								temprealname = results2[j].realname
							}
						}
						data.push({id:results1[i].id,projectname:results1[i].projectname,opentime:results1[i].opentime,limittime:results1[i].limittime,ownerid:results1[i].ownerid,point:results1[i].point,realname:temprealname})
					}
					res.send(JSON.stringify({code:0,message:'查询成功',data:data}))
				})
			}
		})
	}
})

app.post('/api/project/insertProject',function(req,res){
	initToken(req,res,function(){
		if(!req.body.projectname){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：项目名称'}))
			return false
		}else{
			connection.query('insert into project (projectname) values (?)',req.body.projectname,function(err1,results1){
				if(err1){
					res.send(err1)
					return false
				}else{
					res.send(JSON.stringify({code:0,message:'插入成功'}))
				}
			})
		}
	})
})

app.post('/api/project/deleteProject',function(req,res){
	initToken(req,res,function(){
		if(!req.body.id){
			res.send(JSON.stringify({code:1,message:'缺少必要参数：id'}))
			return false
		}else{
			connection.query('select id from project',function(err1,results1){
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
						connection.query('delete from project where id = ?',req.body.id,function(err2,results2){
							if(err2){
								res.send(err2)
								return false
							}else{
								res.send(JSON.stringify({code:0,message:'删除成功'}))
							}
						})
					}else{
						res.send(JSON.stringify({code:2,message:'项目不存在'}))
					}
				}
			})
		}
	})
})

app.post('/api/project/updateProject',function(req,res){
	if(!req.body.id){
		res.send(JSON.stringify({code:1,message:'缺少必要参数：项目id'}))
		return false
	}else if(!req.body.projectname){
		res.send(JSON.stringify({code:1,message:'缺少必要参数：项目名称'}))
		return false
	}else{
		connection.query('update project set projectname = ?,opentime = ?,limittime = ?,ownerid = ?,point = ? where id = ?',[req.body.projectname,req.body.opentime,req.body.limittime,req.body.ownerid,req.body.point,req.body.id],function(err1,results1){
			if(err1){
				res.send(err1)
				return false
			}else{
				res.send(JSON.stringify({code:0,message:'修改成功'}))
			}
		})
	}
})

app.listen(3002,function(){
	console.log('Server running at 3002 port');
})