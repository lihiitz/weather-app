const render = new Render()
const data = new Data()

const myExecutorFunc = function(resolutionFunc, rejectionFunc){
    navigator.geolocation.getCurrentPosition(async function(pos){
        let res = await data.getCityByCoords(pos)
        resolutionFunc(res)
    })
}

const currentLocation = async function(){ //load current location
    const cityPromise = await new Promise(myExecutorFunc)
    render.renderData(cityPromise)
}
const favorites = async function(){
    const cities = await data.getDataFromDB()
    render.renderData(cities)
}
const handleSearch = async function(city){
    const cities = await data.getCityData(city) 
    render.renderData(cities)
}

$(`#search`).on(`click`, function(){   
    let city = $(`input`).val()
    handleSearch(city)
})
$(`#container`).on(`click`, `.plus`, async function(){    
    const cityName = $(this).closest(`.item`).data().id    
    const cities = await data.saveCity(cityName)
    render.renderData(cities)
})
$(`#container`).on(`click`, `.minus`, async function(){
    const cityName = $(this).closest(`.item`).data().id
    const cities = await data.removeCity(cityName)
    render.renderData(cities)
})
$(`#container`).on(`click`, `.refresh`, async function(){
    const cityName = $(this).closest(`.item`).data().id
    const cities = await data.updateCity(cityName)
    render.renderData(cities)
})

currentLocation() 
