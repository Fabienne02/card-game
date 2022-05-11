# Card game - Real time 👻
<img src="https://github.com/Fabienne02/card-game/blob/main/assets/front.jpg" width=530 >

[Live demo](https://card-game-real-time.herokuapp.com/)

# Introduction
Deze applicatie is een real time card game met max 2 players. Hierbij trekt elke speler een kaart
en wint de speler met de hoogste kaart. 

## Table of contents
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Concept](#concept)
  - [About](#about)
  - [Sockets](#sockets)
  - [Deck of Cards API](#deck-of-cards-api)
  - [Gecodeerd met](#gecodeerd-met)
  - [Features](#features)
  - [Wishlist](#wishlist)
  - [Installing](#installing)
  - [Data life Cycle](#data-life-cycle)
  - [Desired Data Life Cycle](#desired-data-life-cycle)
  - [Sources](#sources)
  - [Author](#author)
  - [License](#license)

## Concept 
Mijn concept is gebaseerd op de [card API](https://deckofcardsapi.com/) en een design an [Koen de Graaf](https://dribbble.com/shots/10954673-Shadow-creatures)
Hierbij ben ik begonnen met een desgin in XD:

<img src="https://github.com/Fabienne02/card-game/blob/main/assets/xd.png" width=530 >
<br>
Het idee is dat je begint met 50 punten, deze kan elke speler inleggen. Er word voor beide partijen een random kaart getrokken en hierbij wint de speler met de hoogste kaart. De punten gaan naar de winnende speler. Het spel is over wanneer iemand geen punten meer heeft. Deze loop met punten heb ik niet voor elkaar gekregen. Om de loop toch compleet te krijgen word er na de value berekening een nieuwe pagina geladen die een play again button heeft zodat de hoofdpagina opnieuw geladen word.
Dit is slechts een oplossing om de loop in het prototype te manipuleren.

## About
**Card game is een gok spel met gebruik van online munten zonder echte waarde**

Card game maakt gebruik van een api: https://deckofcardsapi.com/
Card game maakt gebruik van Socket.io: https://socket.io/

Lees de code comments voor meer informatie.<br>
Card game maakt gebruik van socket.io om multiplayer real time web mogelijk te maken<br>
Hierbij stuur je informatie door van front naar de back aan de hand van socket events<br>

## Sockets
Socket.IO is een bibliotheek die low-latency, bidirectionele en op gebeurtenissen gebaseerde communicatie tussen een client en een server mogelijk maakt.<br>
Het is bovenop het WebSocket-protocol gebouwd en biedt extra garanties, zoals terugval op HTTP long-polling of automatisch opnieuw verbinden.<br><br>

Hierbij gebruik je code op de client zoals:
```
socket.on('usernames', (connectedUsers) => {
    console.log(connectedUsers)
    socket.emit('user-disconnect', username);
    })
```
<br>
En op de server gebruik lines om de gestuurde data te verwerken zoals socket.on en io.on

```
io.on('connection', (socket) => {
    console.log('a user connected')
    })
```

```
socket.on('userClicked', () => {
            io.emit('connection', <data>)
        })
```

## Deck of Cards API
De Deck of Cards API geschreven door Chase Roberts is een API die bestaat uit een dek kaarten, hun values, images, suits en code.
De API werk zoals in de [documentatie](http://deckofcardsapi.com/) beschreven met API HTTPS links. 
<br>
1. Eerst shuffle je het deck: http://deckofcardsapi.com/
2. Vervolgens trek card-game een kaart per socket: http://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1
<br>
Voor het fetchen van de API links gebruik ik [Node.fetch](https://www.npmjs.com/package/node-fetch)<br>
Deze instaleer je door:
```
npm install node-fetch@2
```

## Gecodeerd met
Quotes is gecodeerd in EJS (node), Javascript en Socket.io <br>
Client & server side rendering.

## Features
<ul>
  <li>Vul in jouw custom username</li>
  <li>Leg coins in</li>
  <li>Trek de hoogste kaart!</li>
</ul>

## Wishlist
<ul>
  <li>Cache om username op te slaan bij replay</li>
  <li>Punten door communiceren aan sockets</li>
  <li>Cache om punten bij te houden</li>
  <li>Score board</li>
</ul>

## Installing
1. Clone deze repository naar jouw lokale folder
```
git clone https://github.com/Fabienne02/card-game.git
```
2. Open de folder in jouw code applicatie [Zoals VSCODE](https://code.visualstudio.com/Download)
4. Install all packages
```
npm install || npm i
```
5. Start de applicatie met de volgende command
```
npm install || npm start
```
6. Open de de localhost:3003 in je browser

## Data life cycle 
Mijn huidige data life cycle tussen de Client, Socket, Server en API

<img src="https://github.com/Fabienne02/card-game/blob/main/assets/data%20life%20cycle.png">
<br>

## Desired data life cycle 
Helaas ben ik niet aan alles toegkomen daarbij heb ik mijn desired data life cycle

<img src="https://github.com/Fabienne02/card-game/blob/main/assets/data-cycle-2.jpg">

## Sources
- [Code hulp bron](https://developer.mozilla.org/en-US/)
- [API](https://deckofcardsapi.com/)
- [Stackoverflow](https://stackoverflow.com/)
- [Socket.io](https://socket.io/)
- [fetch in node](https://www.npmjs.com/package/node-fetch)


## Author
De maker van deze WPA is: [*Fabienne van den Steen*](https://github.com/Fabienne02)

## License 
[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)]()
