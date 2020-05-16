const render = new Render()
const data = new Data()

// const loadPage = async function(){ //load all saved cities
//     const city = await navigator.geolocation.getCurrentPosition(data.getCityByCoords)
//     console.log(city);
// }

const loadPage = async function(){ //load all saved cities
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

loadPage() 
