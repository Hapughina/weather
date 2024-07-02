import axios from "axios";

const _weatherUrl = 'https://sdaapi.glabazna.eu/weather'

export const fetchWeathers = async () => {
    const {data} = await axios.get(_weatherUrl);
    return data.data
};

export const deleteWeatherItem = async (id) => {
    await axios.delete(_weatherUrl + '/' + id);
};

export const addWeatherItem = async (weatherData) => {
    await axios.post(_weatherUrl, weatherData);
};

export const editWeatherItem = async (changedWeatherData) => {
    await axios.put(_weatherUrl, changedWeatherData);
};

