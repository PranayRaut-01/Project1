const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose= require('mongoose');
const app = express();

app.use(bodyParser.json());

///////////////// [ MONGO-DB CONNECTION ] /////////////////
mongoose.connect("mongodb+srv://zuberkhan034:Khan5544266@cluster0.ouo9x.mongodb.net/projectOne", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

///////////////// [ ROOT API ] /////////////////
app.use('/', route)

///////////////// [ SERVER CONNECTION ] /////////////////
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});