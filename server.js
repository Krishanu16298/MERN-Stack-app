var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var items = require('./routes/api/items');

var app = express();

app.use(bodyParser.json());

var db = require('./config/keys').mongoURI;

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log("err: something went wrong"));

app.use('/api/items', items);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

var port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));