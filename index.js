//importing express js library
const express = require('express');
const path = require('path')
//importing TODO model
const Todo=require('./model/model.js');
//instantiating app as express
const dotenv=require('dotenv');

dotenv.config();


const app = express();
const mongoose = require('mongoose');

let dbUrl =process.env.DB_URL; 

mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected successfully");

    }).catch((err) => {
        console.log(`Error in database connection:: ${err}`);
    });
//declare port
const port = process.env.PORT || 300;
//create a server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


///get request to post todo
app.get('/post-todo', (req,resp)=>{
    let todo=new Todo({
        title:"Trip to Finland",
        description:"Trip to Finland on 30th Jan 2022",
        status:true
    })
    //save todo
    todo.save().then(()=>{
        console.log("Todo created successfully");
        resp.redirect('/fetch');
    }).catch(()=>{
        console.log("Error in creating a todo");
    });
});


//get request to fetch todo
app.get('/fetch', (req,resp)=>{
    Todo.find().then((todos)=>{
        console.log(todos);
        resp.send(todos);
    }).catch((err)=>{
        console.log(`Error fetching todo ::\t${err}`);
    });
});

app.get('/public', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//create a route
app.get('/', (req, resp) => {
    resp.send("Welcome to my first node app");
});

app.get('/home', (req, resp) => {
    resp.send("This is my home page");
});

app.post('/', function (req, resp) {
    resp.send('Get a POST request')
});
app.delete('/delete', function (req, resp) {
    resp.send('Deleted successfully!');
});
app.patch('/patch', function (req, resp) {
    resp.send('Updated successfully!');
});




