const express = require(`express`)
const router = express.Router()
const axios = require(`axios`)
const City = require(`../model/City`)

const APIKey = "adff5ce17061cd99b676972798efc372"
//http://api.openweathermap.org/data/2.5/weather?q=Paris&units=Metric&appid=adff5ce17061cd99b676972798efc372
//api.openweathermap.org/data/2.5/weather?lat=48.85&lon=2.35&appid=adff5ce17061cd99b676972798efc372
const createCityObj = function(data){
    let final = {
        name: data.data.name.replace(/\s+/g, '-'),
        temperature: data.data.main.temp,
        condition: data.data.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`,
    }
    return final
}
router.get(`/city/:lat/:lon`, async function(req, res){
    const lat = req.params.lat
    const lon = req.params.lon
    let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${APIKey}`)
    let cityObj = createCityObj(data)
    res.send(cityObj)
})
router.get(`/city/:cityName`, async function(req, res){
    const city = req.params.cityName
    let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${APIKey}`)
    let cityObj = createCityObj(data)
    res.send(cityObj)
})
//get city from API & update DB with changed city
router.put(`/city/:cityName`, async function(req, res){
    const cityName = req.params.cityName
    let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${APIKey}`) 
    data = createCityObj(data)
    const dataFromDB = await City.findOneAndUpdate({name: cityName}, data, {new: true})
    if (dataFromDB){
        res.send(dataFromDB)
    }else{
        res.send(data)
    }
})
//return all cities that in DB
router.get(`/cities`, async function(req, res){ 
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