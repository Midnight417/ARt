const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const helmet = require("helmet");

const main = async() => {
    //dotenv.config();

    const app = express();

    // Express middlewares
    app.use(cors());
    app.use(bodyParser.json({ limit: '15mb' }));
    app.use(helmet());

    // API routes
    require('./routes')(app);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server is up and running on localhost:${PORT}`));
}

main().catch(err => console.log(err));
