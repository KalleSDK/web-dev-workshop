const express = require("express")

const app = express()

app.get('/', function(request, response){
  response.send('hello world')
})

app.listen(5000, function(){
  console.log('server is running at port 5000')
})