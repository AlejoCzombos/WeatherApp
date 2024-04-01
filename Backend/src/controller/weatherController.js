const weatherService = require('../service/weatherService');

exports.getWeather = async (req, res) => {
    return await weatherService.getWeather(req, res);
}

exports.addCity = async (req, res) => {
    return await weatherService.addCity(req, res);
}

exports.getCities = async (req, res) => {
    return await weatherService.getCities(res);
}

exports.deleteCity = async (req, res) => {
    return await weatherService.deleteCity(req, res);
}

exports.refreshData = async (req, res) => {
    return await weatherService.refreshData(req, res);
}