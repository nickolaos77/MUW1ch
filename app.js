var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/', function(req, res, next) {
    res.render('fruitPicker');
});

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    console.log("Successfully connected to MongoDB.");

    app.post('/', function(req, res){

        db.collection('movies').insertOne({title:req.body.mTitle, year:req.body.mYear,imdb:req.body.imdbLink}).then(function(){
         db.collection('movies').find().toArray(function(err,docs){res.send(docs)});    
        
        })

    });
    
    
    
    app.post('/s', function(req, res){

        db.collection('movies').insertOne({title:req.body.mTitle, year:req.body.mYear,imdb:req.body.imdbLink}).then(function(){
         db.collection('movies').find().toArray(function(err,docs){res.send(docs)});    
        
        })

    });
    
    

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});