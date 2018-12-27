const mysql = require('mysql')
const express = require('express')
const FileStreamRotator = require('file-stream-rotator')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const crypto = require('crypto')
const multiparty = require('multiparty')

const app = express()

const logDirectory = path.join(__dirname,'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const fileDirectory = path.join('E:/myProject/admin','static')
fs.existsSync(fileDirectory) || fs.mkdirSync(fileDirectory)
const imgDirectory = path.join('E:/myProject/admin/static/','images')
fs.existsSync(imgDirectory) || fs.mkdirSync(imgDirectory)
const sculptureDirectory = path.join('E:/myProject/admin/static/images/','sculpture')
fs.existsSync(sculptureDirectory) || fs.mkdirSync(sculptureDirectory)
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

function initToken(req,res,params,callback){
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
				let currentUsertype = ''
				let currentUserid = ''
				let currentUsertoken = ''
				for(let i = 0 ; i < results1.length ; i ++){
					if(req.cookies.token == results1[i].token){
						counter ++
						currentRealname = results1[i].realname
						currentUsername = results1[i].username
						currentUsertype = results1[i].usertype
						currentUserid = results1[i].id
						currentUsertoken = results1[i].token
					}
				}
				if(counter != 0){
					let tokenTime = String(req.cookies.token).substring(0,6) + String(req.cookies.token).substring(String(req.cookies.token).length - 7,String(req.cookies.token).length)
					if(parseInt(new Date().getTime()) - parseInt(tokenTime) > 24*60*60*1000){
						res.send(JSON.stringify({code:3,message:'token已过期'}))
						return false
					}else{
						params.usertype = currentUsertype
						params.id = currentUserid
						params.token = currentUsertoken
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

app.post('/api/upload/uploadImg',function(req,res,params){
	initToken(req,res,params,function(){
		const idDirectory = path.join('E:/myProject/admin/static/images/sculpture/',String(params.id))
		fs.existsSync(idDirectory) || fs.mkdirSync(idDirectory)
		let form = new multiparty.Form()
		form.uploadDir = 'E:/myProject/admin/static/images/sculpture/' + String(params.id)
		form.maxFilesSize = 1024 * 1024 * 100
		form.parse(req,function(err1,fields,files){
			if(err1){
				res.send(err1)
				return false
			}else{
				if(params.token.substring(params.token.indexOf('f') + 1,params.token.indexOf('d')) == params.id){
					if(files.file == undefined){
						res.send(JSON.stringify({code:1,message:'请上传文件'}))
						return false
					}else{
						connection.query('update user set img = ? where id = ?',['/static/images/sculpture/' + params.id + '/' + files.file[0].path.substring(files.file[0].path.lastIndexOf('\\') + 1,files.file[0].path.length),params.id],function(err2,results2){
							if(err2){
								res.send(err2)
								return false
							}else{
								res.send(JSON.stringify({code:0,message:'上传成功'}))
							}
						})
					}
				}else{
					res.send(JSON.stringify({code:3,message:'非当前登录用户'}))
					return false
				}
			}
			
	    })
	})
})

app.listen(3003,function(){
	console.log('Server running at 3003 port');
})