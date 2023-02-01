const express = require('express');
const https = require('https');


const app = express();
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");

})
app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "25fb5bb64deab9a92dc03184bbb3aca0"
    url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
    https.get(url, (response)=>{ 
        response.on("data", (data)=>{
            const infoObject = JSON.parse(data);
            const description = infoObject.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + infoObject.weather[0].icon + "@2x.png";
            res.write("<h1>");
            res.write(`Weather Description in ${query} is ${description} </h1>`);
            res.write("<img src='" + icon + "'/>");
            res.send();

        })
    })
})




app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})