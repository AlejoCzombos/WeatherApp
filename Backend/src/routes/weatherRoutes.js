const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');

router.get('/weather', weatherController.getWeather);
router.get('/weather/cities', weatherController.getCities);
router.post('/weather/cities', weatherController.addCity);
router.delete('/weather/cities', weatherController.deleteCity);

module.exports = router;