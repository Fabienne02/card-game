let socket = io()
const buttonMin = document.getElementById("min")
const buttonPlus = document.getElementById("plus")
const plpoints = document.getElementById("plpoints")
const pointsAvailable = document.getElementById("pointsAiv")
const coins = document.getElementById("coinsImg")
const pickCard = document.getElementById("pickCard")
const players = document.getElementById("players")
const username = prompt("What is your username") || `user${new Date().getTime()}`

socket.emit('set-name', username)

socket.on('disconnect', () => {
    socket.emit('user-disconnect', username);
})

socket.on('usernames', (connectedUsers) => {
    console.log(connectedUsers)

    // IF THERE IS ONE USERNAME, YOU CANNOT PICK A CARD
    var size = Object.keys(connectedUsers).length;
    console.log(Object.keys(connectedUsers).length)

    if (size == 1) {
        document.getElementById('pickCard').style.opacity = "0";
      } else {
        document.getElementById('pickCard').style.opacity = "100";
      }

    // MANIPULATED THE ORDER OF USERNAMES
    if(players.children.length > 0) {
        players.removeChild(players.firstChild)
        players.removeChild(players.firstChild)
    }
    Object.values(connectedUsers).forEach( username => {
        console.log('user', username);
        players.appendChild(Object.assign(document.createElement('p'), {textContent: username}))
    })
 })


// PLAIN JS TO ADD COINS - NOT SOCKET YET 
buttonPlus.onclick = function morePoints () {
    if ( parseInt(pointsAvailable.textContent) > 0) {
    plpoints.textContent = parseInt(plpoints.textContent) + 1
    pointsAvailable.textContent -= 1;
}   else {
    limitAnim();
}
}

buttonMin.onclick = function lessPoints () {
    if (parseInt(plpoints.textContent) > 0 ) {
    plpoints.textContent -= 1;
    pointsAvailable.textContent = parseInt(pointsAvailable.textContent) + 1
    } else {
        limitAnim();
    }
}

function limitAnim() {
    if (coins.classList.contains('shake-horizontal')) {
        return
     } 
     else {
      coins.classList.add("shake-horizontal");
      coins.addEventListener('animationend', e => {
        e.target.classList.remove('shake-horizontal');
      });
    }
  }
// client side buttons


// MAKE IMG FOR CARDS 
const images = document.getElementById('cards')
const card1 = document.createElement('img')
const card2 = document.createElement('img')
images.appendChild(card1)
images.appendChild(card2) 

pickCard.onclick = function pickCards() {
    socket.emit('userClicked')
    //   CLICKED COMMUNICATED TO SOCKET
}

// 0-1 TO ACCES THE SCORES ( VALUES OF THE CARD)
const scores = {
    0: 0,
    1: 0
}

// IN ARRAY TO LISTEN WHEN TWO CARDS HAVE BEEN DRAWN 
let cardImages = [];

// DRAW A CARD AND SEND TROUGH USED DATA 
socket.on('cardsPicked', cards => {
    console.log(cards);
    if (cards.image1 !== undefined) {
        scores[0] = cards.valueImage1;
        card1.src = cards.image1;
        cardImages.push(card1)
        console.log(cardImages)
    }

    if (cards.image2 !== undefined) {
        scores[1] = cards.valueImage2;
        card2.src = cards.image2;
        cardImages.push(card2)
        console.log(cardImages)
    }
 // define src  of the card imgs

//  CHECK THE VALUES/ SCORES TO HASH THE RIGHT ROUTE IN INDEX.JS
    console.log(scores);
    if ( cardImages.length === 2 && scores[0] > scores[1]) {
        setTimeout(function() {
            console.log("player 1 won")
        window.location.href= "player1-won"
          }, 3000);
}
    if ( cardImages.length === 2 && scores[1] > scores[0]) {
        setTimeout(function() {
            console.log("player 2 won")
        window.location.href= "player2-won"
          }, 3000);
}
    if (cardImages.length === 2 && scores[1] == scores[0]) {
        setTimeout(function() {
            console.log("Tie")
        window.location.href= "tie"
          }, 3000);
    }
})

buttonMin.onlick = function removePoints() {
    socket.emit('userClicked')
}