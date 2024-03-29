const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const weatherRouter = require('./routes/weatherRoutes');

const corsOptions = {
    origin: config.frontendUrl,
    optionsSuccessStatus: 200
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', weatherRouter);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.urlHost}`);
});