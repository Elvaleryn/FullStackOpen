import axios from "axios"
const baseUrl = `http://api.apixu.com/v1/current.json?key=8b0b7389d44749cdad8201314192706&q=`

const getWeather = (capital) => {
    return axios.get(`${baseUrl}/${capital}`)
}

export default { getWeather }