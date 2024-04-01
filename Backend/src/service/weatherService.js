const weatherData = require('../data/weatherData');
const config = require('../config');
const axios = require('axios');

exports.refreshData = async (req, res) => {
    try{
        await weatherData.refreshData();
        return res.status(200).send('Data refreshed successfully');
    }catch(error){
        console.error('Error refreshing data: ', error);
        return res.status(500).send('Error refreshing data');
    }
}

exports.getWeather = async (req, res) => {
    try{
        const weatherDataReturn = await weatherData.getWeather();
        return res.status(200).send(weatherDataReturn);
    }catch(error){
        console.error('Error getting weather: ', error);
        throw new Error('Error getting weather');
    }
}

exports.getWeatherForCity = async (city) => {
    try{
        const apiKey = config.openWeatherApiKey;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        const celsiusTemp = (response.data.main.temp - 32) * 5/9;
        const dataResponse = {
            city: response.data.name,
            currentWeather: {
                temperature: Math.round(celsiusTemp),
                status: response.data.weather[0].icon
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

        // Check if city already exists
        const cities = await weatherData.getCities();
        if(cities.includes(cityName)){
            return res.status(400).send('City already exists');
        }

        const data = await this.getWeatherForCity(cityName);
        
        await weatherData.addCity(data);
        return res.status(201).send('City added successfully');
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

        // Check if city exists
        const cities = await weatherData.getCities();
        if(!cities.includes(cityName)){
            return res.status(400).send('City does not exist');
        }

        await weatherData.deleteCity(cityName);
        res.status(204).send('City deleted successfully');
    }catch(error){
        console.error('Error deleting city: ', error);
        return res.status(500).send('Error deleting city');
    }
}