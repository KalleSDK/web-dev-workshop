const express = require('express')
const mysql = require('mysql2')

const app = express()

const connection = mysql.createConnection({
  user: "root",
  password: "sra12345",
  database: "tutorial"
})



app.use(express.json())

app.get('/', function(req, res){
  res.send('server is running fine!')
})

app.get('/users', function(req, res){
  connection.query('select * from users', function(err, result){
    return res.send(result)
  })
})

function generateId(){
  return ((Math.random() * 100) + 1)
}

app.post('/register', function(req, res){
  connection.query('insert into users values(?, ?)', [generateId(), req.body.name],function(err, result){
    if(err){
      console.log(err)
    }
    return res.send(result)
  }) 
})

app.post('/deleteuser', function(req, res){
    connection.query('delete from users where id = ?', [req.body.id],function(err, result){
      if(err){
        console.log(err)
      }
      return res.send(result)
    }) 
})

app.listen(5000, function(){
  console.log('server is up and running')
})