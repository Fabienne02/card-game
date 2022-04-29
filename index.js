const express = require("express");
const app = express();
const { cache } = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const { createReadStream } = require("fs");
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const port = process.env.PORT || 3003;

app.set("view engine", "ejs");
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));


app.get('/', async function (req, res) {
    res.render('index', {
      })
  })

  const pickTwoCard = async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,3S,4S,5S,6S,7S,8S,9S,0S,2D,3D,4D,5D,6D,7D,8D,9D,0D,2C,3C,4C,5C,6C,7C,8C,9C,0C,2H,3H,4H,5H,6H,7H,8H,9H,0H')
    const deck = await response.json()

    const draw = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
    const card = await draw.json()

    return  {
        image1: card.cards[0].image,
        image2: card.cards[1].image,
        valueImage1: card.cards[0].value,
        // valueImage2: card.card[1].value
    }
  }

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('userClicked', () => {
        cards = pickTwoCard().then((data) => {
            io.emit('cardsPicked', data)

        });
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit('user-disconnected') 
      })
    
    //   socket.on('user-connect', (user)=>{
    //     io.emit('user-connect', user)
    //   })
    
  })

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
