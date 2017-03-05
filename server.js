const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        title: 'Maintenance',
        maintenanceMessage: 'In maintenance right now'
    });
});

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    console.log(log);
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Home Page',
        welcomeMessage: 'Welcome Home!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({ errorMessage: 'Unable to fulfil request.' });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});