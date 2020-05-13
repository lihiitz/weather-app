const express = require(`express`)
const app = express()
const api = require(`./server/routes/api`)
const bodyParser = require(`body-parser`)
const mongoose = require(`mongoose`)

mongoose.connect(`mongodb://localhost/weather-app`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(`/`, api)



const port = 3000
app.listen(port, function(){
    console.log(`running on port ${port}`);
    
})