const weatherData = require('../data/weatherData');
const config = require('../config');
const axios = require('axios');
const weatherDescription = require('../utils/weather');

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
        weatherDataReturn.sort((a, b) => a.city.localeCompare(b.city));
        return res.status(200).send(weatherDataReturn);
    }catch(error){
        console.error('Error getting weather: ', error);
        throw new Error('Error getting weather');
    }
}

exports.getWeatherForCity = async (city) => {
    try{
        const apiKey = config.openWeatherApiKey;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        
        const sunrise = new Date(response.data.sys.sunrise * 1000).getHours();
        const sunset = new Date(response.data.sys.sunset * 1000).getHours();
        
        const dataResponse = {
            city: response.data.name,
            currentWeather: {
                status: response.data.weather[0].icon,
                description: weatherDescription.weatherDescriptions[response.data.weather[0].id],
                temperature: {
                    current: Math.round(response.data.main.temp),
                    feels_like: Math.round(response.data.main.feels_like),
                    min: Math.round(response.data.main.temp_min),
                    max: Math.round(response.data.main.temp_max)
                },
                sunrise: sunrise,
                sunset: sunset,
                wind: {
                    speed: response.data.wind.speed * 3.6,
                    deg: response.data.wind.deg
                },
                extras: {
                    humidity: response.data.main.humidity
                },
            },
            coord: response.data.coord
        }
        return dataResponse;
    }catch (error){
        console.error('Error getting weather: ', error);
        return res.status(400).send('Error getting weather');
    }
}

exports.getForecastWeatherForCity = async (req, res) => {
    try{
        const cityName = req.params.city;
        const apiKey = config.openWeatherApiKey;
        const cityData = await weatherData.getCityByName(cityName);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&units=metric&appid=${apiKey}`);

        const hourlyList = response.data.list.slice(0,8);
        const dailyList = response.data.list.filter((item) => item.dt_txt.includes('12:00:00'));

        const hourlyData = hourlyList.map((item) => {
            return {
                time: item.dt_txt.substring(11,16),
                temperature: Math.round(item.main.temp),
                status: item.weather[0].icon
            }
        }
        );
        const dailyData = dailyList.map((item) => {
            const date = new Date(item.dt_txt);
            return {
                date: item.dt_txt.substring(0,10),
                day: date.toLocaleDateString('es-ES', {weekday: 'long'}),
                temperature: {
                    min: Math.round(item.main.temp_min),
                    max: Math.round(item.main.temp_max),
                    feels_like: Math.round(item.main.feels_like)
                },
                extras: {
                    humidity: item.main.humidity,
                    precipitation: item.pop
                },
                status: item.weather[0].icon
            }
        });

        const forecastData = {
            city: response.data.city.name,
            currentWeather: cityData.currentWeather,
            hourly : hourlyData,
            daily : dailyData
        }

        return res.status(200).send(forecastData);
    }catch (error){
        console.error('Error getting weather: ', error);
        return res.status(400).send('Error getting weather');
    }
}

exports.getCities = async (res) => {
    try{
        const cities = await weatherData.getCities();
        cities.sort();
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