class Data {
    constructor() {
        this.cityData = []

    }
    async getDataFromDB() {
        const data = await $.get(`/cities`)        
        this.cityData = data
        return this.cityData
    }
    async getCityByCoords(pos) {
        const crd = pos.coords
        const data = await $.get(`/city/${crd.latitude}/${crd.longitude}`)
        this.cityData = []
        this.cityData.push(data)
        return this.cityData
    }
    //get one city from API, add it to cityData array and return the array
    async getCityData(city) { 
        const data = await $.get(`/city/${city}`)
        const index = this.cityData.findIndex(item => item.name === data.name)
        if (index !== -1) {//city is in array
            const id = this.cityData[index]["_id"]
            if (id) {
                data["_id"] = id
            }
            this.cityData.splice(index, 1)
        }
        this.cityData.unshift(data)
        return this.cityData
    }
    async saveCity(cityName) {
        const obj = this.cityData.find(item => item.name === cityName)
        const newObj = await $.post(`/city`, obj)
        const index = this.cityData.findIndex(item => item.name === cityName)
        this.cityData.splice(index, 1)
        this.cityData.splice(index, 0, newObj)
        return this.cityData
    }
    async updateCity(cityName){
        const data = await $.ajax({
            url: `/city/${cityName}`,
            method: `PUT`,            
        })
        //remove old data and insert new data to local array
        const index = this.cityData.findIndex(item => item.name === data.name)
        this.cityData.splice(index, 1)
        this.cityData.splice(index,0,data)
        return this.cityData
    }
    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            method: `DELETE`,
            success: console.log(`obj removed`)
        })
        this.cityData.splice(this.cityData.findIndex(item => item.name === cityName), 1)
        return this.cityData
    }
}