const express = require("express"); 
const app = express() ; 
const https= require("https") ;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true})) ;

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
   
})
app.post("/",function(req,res){

   const lat= req.body.lat
const lon= req.body.lon
const apikey = "c24727345f4a63b57a5f2a67d1f0f177"
const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey ; 

 https.get(url, function(response){
console.log(response.statusCode)
response.on("data", function(data){
  const weatherdata =  JSON.parse(data) ; 
  const wdata = weatherdata.main.temp
  const name= weatherdata.name
  const desc = weatherdata.weather[0].description
  const img= weatherdata.weather[0].icon ;  // the icon code is mentioned in the json file
  const imgurl = "http://openweathermap.org/img/wn/"+ img +"@2x.png" // making image url using api call
  res.write("<p>The weather in " + name + " is currently "+ desc + " </p>")
  res.write("<h1>the temperature of "+ name+ " is "+ wdata + ".</h1>" )
  res.write("<img src="+imgurl+">")
 res.send()
})
})

})



app.listen(3000, function(){
    console.log("Server is running on port 3000..") ; 
})