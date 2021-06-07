const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan())

app.get('/', function(req, res){
  res.send('server is working fine!')
})

app.get('/users', function(req, res){
  fs.readFile('./users.json', function(err, data){
    var result = JSON.parse(data)
    return res.send(result)
  })
})


app.post('/register', function(req, res){
  console.log(req.body)
  fs.readFile('./users.json', function(err, data){
    var result = JSON.parse(data) // string to JSON
    result.push({ "name": req.body.name })

    var json = JSON.stringify(result) // JSON to string
    console.log(json)
    fs.writeFile('./users.json', json, function(err){
      return res.send('User created!')
    })
  })
})

app.delete('/deleteuser', function(req, res){
  console.log(req.body)
  fs.readFile('./users.json', function(err, data){
    var result = JSON.parse(data) // string to JSON
    
    var filteredResult = result.filter(function(user){
      return user.name !== req.body.name
    })

    var json = JSON.stringify(filteredResult) // JSON to string
    console.log(json)
    fs.writeFile('./users.json', json, function(err){
      if(err){
        console.log(err)
        return res.send('Error when deleting')
      }

      return res.send('User deleted!')
    })
  })
})


app.listen(42069, function(){
  console.log('server is running at PORT: 42069')
})
