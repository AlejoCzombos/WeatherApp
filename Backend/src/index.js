const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const weatherRouter = require('./routes/weatherRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', weatherRouter);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.urlHost}`);
});