const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
  console.log("Post request recieved");

  const query = req.body.cityName
  const apiKey = "e4143af07de2ec4e06cbf0e21c765768"
  const unit = "metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const weatherDescription = weatherData.weather[0].description;
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.set("Content-Type", "text/html");

    res.write("The weather is currenty "+ weatherDescription+"\n");
    res.write("<h1>The temparature in "+query+" is "+temp+"degrees Celcius.</h1>"+"\n");
    res.write("<img src =" + imageURL +">");
    res.send();
    })
  })
})


app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
