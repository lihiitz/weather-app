const express = require(`express`)
const router = express.Router()
const axios = require(`axios`)
const City = require(`../model/City`)

const APIKey = "adff5ce17061cd99b676972798efc372"

router.get(`/city/:cityName`, async function(req, res){
    const city = req.params.cityName
    let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${APIKey}`)
    let final = {
        name: city,
        temperature: data.data.main.temp,
        condition: data.data.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`,
    }
    res.send(final)
})
router.get(`/cities`, async function(req, res){ //return all cities that in DB
    let cities = await City.find({})
    res.send(cities)
})
router.post(`/city`, async function(req, res){
    const city = req.body
    const newCity = new City({
        name: city.name,
        temperature: city.temperature,
        condition: city.condition,
        conditionPic: city.conditionPic,
    })
    await newCity.save()
    res.send(newCity)
})
router.delete(`/city/:cityName`, async function(req, res){
    const city = req.params.cityName
    let deletedCity = await City.findOneAndDelete({name: city})
    res.send(deletedCity)
})

module.exports = router