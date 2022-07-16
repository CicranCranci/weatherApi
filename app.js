const express = require("express");
const https = require("https");
const app = express();
// pt a citi din html npm i body-parser
const bodyParser = require("body-parser");
// cod necesar pt a parsa din body
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    // for fetching the query from a page
    res.sendFile(__dirname + "/index.html");
 
});

app.post("/", function(req,res){
    // asa alegem ce ne trebuie din html
    
    const query = req.body.cityName;
    const apiKey = "7b21af6db73a3d6be92aeb45b4c91197";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
    console.log(response.statusCode);
     
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp1 = weatherData.main.temp;
        console.log(temp1);
        const weatherDescription = weatherData.weather[0].description;
        console.log(weatherDescription);
        const icon1 = weatherData.weather[0].icon;
        console.log(icon1);
        const imageUrl = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
        console.log(imageUrl);
        res.write("<h1>The temperature is " + temp1 + " degrees celsius in " + query + "</h1><br>");
        res.write("<h2>And we have "  + weatherDescription + "</h2>");
        res.write("<br><img src =" + imageUrl + ">");
        res.send();
        
    });
    
});
    
})





app.listen(3000, function(){
    console.log("Server is running on port 3000");
});