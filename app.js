const PORT = 8000;

const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');

const app = express();

const Cards = require('./models/cards');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// WEBPACK CONFIGURATION
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

// ROUTES
// app.get('/', (req, res) => {
//   res.send('its working!');
// })

app.get('/flashcards', (req, res) => {
  Cards.getAll((err, cards) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(cards);
  })
})

app.get('/flashcard/random', (req, res) => {
  Cards.getRand(req.query, (err, card) => {
    if(err) return res.status(400).send(err);
    res.send(card);
  })
})

app.get('/flashcard/:id', (req, res) => {
  Cards.getById(req.params.id, (err, card) => {
    if(err) return res.status(400).send(err);
    res.send(card);
  })
})

app.get('/answer/:id/:answer', (req, res) => {
  Cards.checkAnswer(req.params.id, req.params.answer, (err, response) => {
    if(err) return res.status(400).send(err);
    res.send(response);
  })
})

app.post('/flashcard', (req, res) => {
  Cards.create(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send("card added");
  })
})

app.delete('/flashcard/:id', (req, res) => {
  Cards.remove(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send('card deleted');
  })
})

app.put('/flashcard/:id', (req, res) => {
  Cards.edit(req.params.id, req.body, err => {
    if(err) return res.status(400).send(err);
    res.send('card updated');
  })
})

app.use("*", function(request, response) {
	//send the index.html
    response.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, err => {
  console.log(err || `Express listening on ${PORT}`);
})
