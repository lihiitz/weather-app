class Data {
    constructor() {
        this.cityData = []

    }
    validInput(input){
        input = input.replace(/\s+/g, '-')
        let res = input.charAt(0).toUpperCase() + input.slice(1)
        return res
    }
    async getDataFromDB() {
        const data = await $.get(`/cities`)
        this.cityData = data
        return this.cityData
    }
    async getCityData(city) { //get one city from API, add it to cityData array and return the array
        const data = await $.get(`/city/${city}`)
        const index = this.cityData.findIndex(item => item.name === city)
        if (index !== -1) {//city is in array
            const id = this.cityData[index]["_id"]
            if (id){
                data["_id"] = id
            }
            this.cityData.splice(index, 1)
        }
        this.cityData.push(data)
        return this.cityData
    }
    async saveCity(cityName) {
        const obj = this.cityData.find(item => item.name === cityName)
        const newObj = await $.post(`/city`, obj)
        this.cityData.splice(this.cityData.findIndex(item => item.name === cityName), 1)
        this.cityData.push(newObj)
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