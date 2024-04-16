const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const { name } = require('ejs');


//Set up body Parser Middleware
app.use(bodyParser.urlencoded({ extended:true}));

// Set EJS as the view engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "Public",'views'));
app.set('layout', './layouts/web.ejs'); // Specify layout file
// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'Public')));

// Define route to render index page
app.get('/', (req, res) => {
    res.render('index',{
        title : "Home"
    });
});

// Serve JavaScript file dynamically
app.get('/index.js', (req, res) => {
    // Instead of sending the actual JavaScript code,
    // you can send a minimized version or even obfuscated version.
    res.sendFile(path.join(__dirname, 'Public', 'index.js'));
});

app.get('/about', (req, res) => {
    res.render('about',{
        title : "about"
    });
});

app.get('/project', (req, res) => {
    res.render('Project',{
        title : "about"
    });
});

app.get('/services', (req, res) => {
    res.render('Service',{
        title : "Service"
    });
});
app.get('/portfolio', (req, res) => {
    res.render('about',{
        title : "services"
    });
});
app.get('/contact', (req, res) => {
    res.render('Contact',{
        title : "contact"
    });
});

app.post('/contac',(req,res)=>{
    const {name , email, message}=req.body;
    const  filePath = path.join(__dirname,'contact.txt');
    fs.appendFile(filePath, "Name :- " + name + '\n' + 
    "email :- " + email + '\n'+ "Message :- " + message + '\n', (err)=>{
        if(err){
            console.error(`error saving message:`,err);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log('Name:-'+ name+ '\n'+ 'Gmail :-'+ email+'\n'+'message'+message +'\n');

        console.log('Message Saved :',message);
        res.send(`<div>
        <h1>Thanks ${name}, We will Contact as soon as possible </h1>
        <h2>We get your message : ${message}</h2>
        <div>Go Back</div>
        <a href="/">go back to the home page</a>
        </div>`)
    })
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*
const express = require('express');
const path = require('path');

const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname,"Public", 'views'));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'Public')));

// Define routes
app.get('/', (req, res) => {
    res.render('layout', {
        title: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('layout', {
        title: 'About'
    });
});

// Add more routes as needed

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/