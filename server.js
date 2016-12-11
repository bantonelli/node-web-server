const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();



/*******************************
    SET UP VIEW ENGINE  
*/ 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/*******************************
    SET UP MIDDLEWARE 
*/ 
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    // Log info and time of request.
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// Maintenance middleware 
app.use((req, res, next) => {
    res.render('maintenance');
});

app.use(express.static(__dirname + "/public"));

/*******************************
    SET UP HANDLEBARS HELPERS 
*/  
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


/*******************************
    APP SERVER LOGIC  
*/  
app.get('/', function(req, res) {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: "Brandon",
    //     likes: [
    //         "Basketball",
    //         "Entrepreneurship",
    //         "Web development"
    //     ]
    // });
    res.render('home', {
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'Home Page'
    });   
});

app.get('/about', function(req, res) {
    // res.send("About Page");
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage: "Error handling request"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});