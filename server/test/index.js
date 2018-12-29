const mysql = require('mysql')
const express = require('express')
const FileStreamRotator = require('file-stream-rotator')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const crypto = require('crypto')
const WebSocket = require('nodejs-websocket')

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

var ws = require('nodejs-websocket')
var PORT = 5003

var server = ws.createServer(function(conn){
    conn.on("text",function(str){
    	connection.query('select * from user',function(err,result){
			if(err){
				res.send(err)
				return false
			}else{
				conn.sendText(JSON.stringify(result))
			}
		})
    })
    conn.on("close",function(code,reason){
        
    })
    conn.on("error",function(err){
        console.log(err)
    })
}).listen(PORT)
 
console.log('websocket server listening on port ' + PORT)
