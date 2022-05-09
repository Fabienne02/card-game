const express = require("express");
const app = express();
const { cache } = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const { createReadStream } = require("fs");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3003;

let users = [];
let connectedUsers = {}


app.set("view engine", "ejs");
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));



app.get('/', async function (req, res) {
    res.render('index', {
      })
  })

 

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

  io.on('connection', (socket) => {
    console.log('a user connected')
    users.push(socket.id);
    connectedUsers[socket.id]=''


    socket.on('userClicked', () => {
        cards = pickTwoCard(socket.id).then((data) => {
            io.emit('cardsPicked', data)

        });
    })

    socket.on('disconnect', () => {
      console.log('user disconnected' + socket.id)

      delete connectedUsers[socket.id]

      users = users.filter(user => user !== socket.id )
    })

    // io.on('user-disconnect', (username) => {
    //   console.log(`disconnecting ${username}`)
    // })
    
    socket.on('set-name', (user)=>{
      connectedUsers[socket.id]=user
      console.log(user);
      console.log(user + "deze is voor p")
      io.emit('usernames', connectedUsers)
      //io.emit('user-connect', user)
    })

    socket.on('usernames', (user) => {
      console.log(user + "deze is voor p")
      io.emit('usernames', user)
    })
    
  })

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
