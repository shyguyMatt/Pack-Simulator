const pack = require('./packs/pack.json')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path')

const port = 1300;

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client/build')))

//routes

app.get('/test', async (req, res) => {
  try {
    res.send('this is a test')   
  } catch (err) {
    console.log(err)
    res.send(err)
  }

})

app.get('/open_pack', async (req, res) => {
  let cards = []

  try {
    pack.cards.forEach(card => {
      let num = Math.random() * (100 - 0) + 0
      num = Math.round((num + Number.EPSILON) * 100) / 100
      let value = 0
      for (let [key, cardvalue] of Object.entries(card)) {
        if (num <= cardvalue + value && num > value) {
          cards.push(pack.cardIDs[key-1][Math.floor(Math.random() * pack.cardIDs[key-1].length)])
        }
        value = value + cardvalue
      }
    }); 
    
    res.send(cards)    

  } catch (err) {
    console.log(err)
  }
})

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});