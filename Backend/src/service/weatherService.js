const weatherData = require('../data/weatherData');
const config = require('../config');
const axios = require('axios');

exports.getWeather = async (req, res) => {
    try{
        const cities = await weatherData.getCities();
        const weatherDataReturn = [];

        for(const city of cities){
            const weather = await getWeatherForCity(city);
            weatherDataReturn.push(weather);
        }

        return res.status(200).send(weatherDataReturn);
    }catch(error){
        console.error('Error getting weather: ', error);
        throw new Error('Error getting weather');
    }
}

const getWeatherForCity = async (city) => {
    try{
        const apiKey = config.openWeatherApiKey;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        const celciusTemp = (response.data.main.temp - 32) * 5/9;
        const dataResponse = {
            city: response.data.name,
            temperature: celciusTemp.toFixed(2),
            weather: {
                name: response.data.weather[0].main,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon
            }
        }
        return dataResponse;
    }catch (error){
        console.error('Error getting weather: ', error);
        throw new Error('Error getting weather');
    }
}

exports.getCities = async (res) => {
    try{
        const cities = await weatherData.getCities();
        return res.status(200).send(cities);
    }catch (error){
        console.error('Error getting cities: ', error);
        return res.status(400).send('Error getting cities');
    }
}

exports.addCity = async (req, res) => {
    try{
        const cityName = req.body.city;

        if(cityName === undefined || cityName === ''){ 
            return res.status(400).send('City name is required');
        }
        
        const addedCity = await weatherData.addCity(cityName);
        return res.status(201).send(addedCity);
    }catch (error){
        console.error('Error adding city: ', error);
        return res.status(400).send('Error adding city');
    }
}

exports.deleteCity = async (req, res) => {
    try{
        const cityName = req.body.city;

        if(cityName === undefined || cityName === ''){ 
            return res.status(400).send('City name is required');
        }

        await weatherData.deleteCity(cityName);
        res.status(204).send('City deleted successfully');
    }catch(error){
        console.error('Error deleting city: ', error);
        return res.status(500).send('Error deleting city');
    }
}