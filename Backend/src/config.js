const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    URL_HOST,
    OPEN_WEATHER_API_KEY, 
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;

module.exports = {
    port: PORT,
    urlHost: URL_HOST,
    openWeatherApiKey: OPEN_WEATHER_API_KEY,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
  },
}