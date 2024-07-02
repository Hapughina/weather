import axios from "axios";

const _weatherKey = '3420629f3bb455cf112dabc0ed29efe2'
const units = 'metric'
const _weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'

export const fetchCityWeathers = async (city) => {
    const {data} = await axios.get(_weatherApiUrl, {
        params: {
            q: city,
            appid: _weatherKey,
            units: units
        }
    });
    return data
};


