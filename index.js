const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const routes = require('./routes/routes.js')
const session = require('express-session');

const app = express();
const port = 8080; 

// Config Public
app.use(
    express.static(path.join(__dirname , "public"))
);

// config session
app.use(session({
    secret:`453553764568648378643684`
}));

// config handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main', 
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// config bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use('/', routes);

app.listen(port, () => console.log('Server ON!'));