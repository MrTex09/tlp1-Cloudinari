const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
port = 3000 || port.process.env.PORT;
require('dotenv').config()



require('ejs')
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.set("view engine", "ejs");


app.use(require('./src/routes/img.routes'));
app.listen(port, () => console.log('Server on port', port));
