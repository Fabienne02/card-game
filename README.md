# Card game - Real time 👻
<img src="https://github.com/Fabienne02/card-game/blob/main/assets/front.jpg" width=530 >

[Live demo](https://thawing-sands-88436.herokuapp.com/)

# Introduction
Deze applicatie is een real time card game met max 2 players. Hierbij trekt elke speler een kaart
en wint de speler met de hoogste kaart. 

## Table of contents
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Concept](#concept)
  - [About](#about)
  - [Gecodeerd met](#gecodeerd-met)
  - [Features](#features)
  - [Wishlist](#wishlist)
  - [Installing](#installing)
  - [Activity diagram](#activity-diagram)
  - [Presentation](#presentation)
  - [Sources](#sources)
  - [Author](#author)
  - [License](#license)

## Concept 
Mijn concept is gebaseerd op de [card API](https://deckofcardsapi.com/) en een design an [Koen de Graaf](https://dribbble.com/shots/10954673-Shadow-creatures)
Hierbij ben ik begonnen met een desgin in XD:

<img src="https://github.com/Fabienne02/card-game/blob/main/assets/xd.jpg" width=530 >

## About
**Card game is een gok spel met gebruik van online munten zonder echte waarde**

Card game maakt gebruik van een api: https://deckofcardsapi.com/
Card game maakt gebruik van Socket.io: https://socket.io/

Lees de code comments voor meer informatie.<br>
Card game maakt gebruik van socket.io om multiplayer real time web mogelijk te maken<br>
Hierbij stuur je informatie door van front naar de back aan de hand van socket events<br>

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

## Data life cycle ♻️

## Sources
- [Code hulp bron](https://developer.mozilla.org/en-US/)
- [API](https://deckofcardsapi.com/)
- [Stackoverflow](https://stackoverflow.com/)
- [Socket.io](https://socket.io/)


## Author
De maker van deze WPA is: [*Fabienne van den Steen*](https://github.com/Fabienne02)

## License 
[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)]()
