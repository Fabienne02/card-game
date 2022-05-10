const express = require("express");
const app = express();
const { cache } = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const { createReadStream } = require("fs");
const { Socket } = require("socket.io");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3003;

// ARRAY AND OBJECT FOR connectedUsers, OBJECT TO CONNECT TO SOCKETID 
let users = [];
let connectedUsers = {}


app.set("view engine", "ejs");
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));


// RENDERING ON THE RIGHT HASH ROUTE 
app.get('/', async function (req, res) {
    res.render('index', {
      })
  })

  app.get('/player2-won', async function (req, res) {
    res.render('player2', {
      })
  })

  app.get('/player1-won', async function (req, res) {
    res.render('player1', {
      })
  })

  app.get('/tie', async function (req, res) {
    res.render('tie', {
      })
  })
 

  // GET CARDS OUT OF API AND RETRUN THE USEFULL VALUES 
  const pickTwoCard = async (socketId) => {
    const userIndex = users.indexOf(socketId)
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,3S,4S,5S,6S,7S,8S,9S,0S,2D,3D,4D,5D,6D,7D,8D,9D,0D,2C,3C,4C,5C,6C,7C,8C,9C,0C,2H,3H,4H,5H,6H,7H,8H,9H,0H')
    const deck = await response.json()

    const draw = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
    const card = await draw.json()

    console.log(users)
    console.log(userIndex)

    if (userIndex === 0) {
      return  {
        image1: card.cards[0].image,
        valueImage1: card.cards[0].value
      }
    }

    if (userIndex === 1) {
      return  {
        image2: card.cards[0].image,
        valueImage2: card.cards[0].value
      }
    }
  }

// ON CONNECTION -> TRIGGER DRAW CARD (cardsPicked) IN APP.JS & PUSH SOCKET ID IN OBJECT AND ARRAY
  io.on('connection', (socket) => {
    console.log('a user connected')
    users.push(socket.id);
    connectedUsers[socket.id]=''


    socket.on('userClicked', () => {
        cards = pickTwoCard(socket.id).then((data) => {
            io.emit('cardsPicked', data)

        });
    })

    // ONDISCONNECT DELETE CONNECTED USER EN USERS 
    socket.on('disconnect', () => {
      console.log('user disconnected' + socket.id)

      delete connectedUsers[socket.id]

      users = users.filter(user => user !== socket.id )
    })
    

    // SET NAME AND USERNAME PUSHED TO APP.JS 
    socket.on('set-name', (user)=>{
      connectedUsers[socket.id]=user
      console.log(user);
      io.emit('usernames', connectedUsers)
    })

    socket.on('usernames', (user) => {
      io.emit('usernames', user)
    })
    
  })

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
