const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

const port = process.env.port || 5000;

mongoose.connect('mongodb+srv://admin:1CF7MMpzETgYht18@cluster0.bzeyr.mongodb.net/candidate_scrores?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}, () => {
    console.log('connected')
})

app.use(express.json());

// api endpoints or routes 
app.use('/api/candidate' , routes );


//listner
app.listen(port, () => {
    console.log("Server up and running")
});




// 1CF7MMpzETgYht18