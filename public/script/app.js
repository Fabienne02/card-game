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

    players.removeChild(players.firstChild)
    Object.values(connectedUsers).forEach( username => {
        console.log('user', username);
        players.appendChild(Object.assign(document.createElement('p'), {textContent: username}))
    })
 })


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


const images = document.getElementById('cards')
const card1 = document.createElement('img')
const card2 = document.createElement('img')
images.appendChild(card1)
images.appendChild(card2)
// Maak img voor cards aan 

pickCard.onclick = function pickCards() {
    socket.emit('userClicked')
    //   geklikt naar socket communiceren
}

const scores = {
    0: 0,
    1: 0
}

socket.on('cardsPicked', cards => {
    console.log(cards);
    if (cards.image1 !== undefined) {
        scores[0] = cards.valueImage1;
        card1.src = cards.image1;
    }

    if (cards.image2 !== undefined) {
        scores[1] = cards.valueImage2;
        card2.src = cards.image2;
    }

    console.log(scores);

    // define src van de aangemaakte card imgs
})

buttonMin.onlick = function removePoints() {
    socket.emit('userClicked')
}

socket.on('cardsPicked', cards => {
       //card1.src = cards.image1;
    //    card2.src = cards.image2;
    //    console.log(valueImage1)

    // define src van de aangemaakte card imgs
})
